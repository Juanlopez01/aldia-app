import { User } from '@/models/user.model';
import conn  from '@/src-backend/db';
import { compare, hash } from 'bcrypt';
import { sendMailToChangePassword, sendVerificationRequest } from './nodemailer';
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
      if (userExist) throw new Error('EMAIL_EXISTS')
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
        const url = `${process.env.URL_BASE}api/validate-email?token=${token}`
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
    if (!password) throw new Error('PASS_REQUIRED')
    if (!email) throw new Error('EMAIL_REQUIRED')
    const user = await User.findOne({ email })

    // // Si no existe
    if (!user) {
      throw new Error('EMAIL_NOT_REGISTERED')
    }

    // checkeo la password hasheada
    const isPasswordCorrect = await compare(password, user.hashedPassword)

    // Si es incorrecta
    if (!isPasswordCorrect) {
      throw new Error('PASS_INVALID')
    }
    return user
  }
  

  export const validateSession = async (email:string| null|undefined)=>{
    await conn()
    const user = await User.findOne({ email })
    if(!user.emailVerified) throw new Error('EMAIL_NOT_VERIFIED')
return user
  }


export const forgotPassword = async (email?: string)=> {
  await conn()
  if (!email) throw new Error('EMAIL_REQUIRED')
  const user = await User.findOne({ email })
  if (!user) throw new Error('EMAIL_NOT_REGISTERED')
  const token = sign({ id: user._id}, process.env.NEXTAUTH_JWT_SECRET || '' )  
  const url = `${process.env.URL_BASE}/auth/recover-account?token=${token}`
  await sendMailToChangePassword({ email, url })
return true
}
