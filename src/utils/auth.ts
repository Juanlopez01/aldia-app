import { User } from '@/models/user.model';
import conn  from '@/src-backend/db';
import { compare, hash } from 'bcrypt';
import { sendVerificationRequest } from './nodemailer';
import { sign } from 'jsonwebtoken';

interface CreateUserParams {
    name?: string;
    lastname?: string;
    email: string;
    password: string;
    image?: string;
  }
  
  export const createGoogleUser = async ({ name,lastname, email, password, image}:CreateUserParams)=> {
  await conn()
  try {
    const userExist = await User.findOne({ email }).exec();
  if (userExist) {
    const { hashedPassword, provider } = userExist
    if (provider !== 'google') return false
    return compare(password, hashedPassword)
  }
  
  const hashedPassword = await hash(password, 12);
  
  const newUser = new User({
    name,
    lastname,
    email,
    image,
    hashedPassword,
    emailVerified: true,
    provider: 'google',
  })
  
  const userSaved = await newUser.save()
  console.log(userSaved);
  return userSaved;
  
   }catch (error) {
  
     console.log(error)
   }
  }
  
  
  
  
  interface RegisterNewUser { name?:string, lastname?: string, email?: string, password?: string }
  
  export const registerNewUser = async ({ name, lastname, email, password }:RegisterNewUser)=>{
    if(!email || !password) return false;
    try {
      const userExist = await User.findOne({ email: email });
      if (userExist) throw new Error('Ya existe una cuenta con ese email')
      const hashedPassword = await hash(password, 12);
      
        const newUser = new User({
          name,
          lastname,
          email,
          hashedPassword,
          provider: 'email',
        })
        const userSaved = await newUser.save()
        const token = sign({ id: newUser._id}, process.env.NEXTAUTH_JWT_SECRET || '' )  
        const url = `${process.env.URL_BASE}/api/validate-email?token=${token}`
        await sendVerificationRequest({ email: email, url })
        return userSaved
  
    } catch (error) {
     console.log(error);
     return error
    }
  }
  
  interface loginEmail {
    email?: string;
    password?: string;
  }
  export const loginEmailUser = async ({email, password}:loginEmail)=>{
    await conn()
    if (!password) throw new Error('Password is required')
    if (!email) throw new Error('Email is required')
    const user = await User.findOne({ email })

    // // Si no existe
    if (!user) {
      throw new Error('Email is not registered')
    }

    // checkeo la password hasheada
    const isPasswordCorrect = await compare(password, user.hashedPassword)

    // Si es incorrecta
    if (!isPasswordCorrect) {
      throw new Error('Password is incorrect')
    }
    return user
  }
  

  export const validateSession = async (email:string| null|undefined)=>{
    await conn()
    const user = await User.findOne({ email })
    if(!user.emailVerified) throw new Error('Email is not verified')
return user
  }