import axios from "axios"

export default async function verifyUserCompany (user: String){
    const email = user.split('@').join('%40')
    
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}api/company/verify?email=${email}`

    const res = await axios.get(url)
    return res.data.msg
}