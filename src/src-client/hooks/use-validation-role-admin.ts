import { UserWithId } from "@/models/user.model"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { useState, useEffect } from "react"


export const useValidationRoleAdmin = () => {
    const router = useRouter()
    const [isAdmin, setIsAdmin] = useState(false)
    const { data: session, status } = useSession({ required: true })
    useEffect(() => {
      if (status !== 'authenticated') return
      const user = session.user as unknown as UserWithId
      if (user.role === 'admin') setIsAdmin(true)
      else router.push('/home')
    }, [session]) // eslint-disable-line
    return {
      status,
      isAdmin,
    }
  }