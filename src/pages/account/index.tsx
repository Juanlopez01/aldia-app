import { useSession } from 'next-auth/react'
import LogoUser from '../../../assets/UserDefault.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import UserImage from '@/src-client/components/account/UserImage'
import { useRouter } from 'next/router'
import { UserWithId } from '@/models/user.model'
import UserName from '@components/account/UserName'
import UserCurrency from '@components/account/UserCurrency'
import UserPlan from '@client/components/account/UserPlan'

const Account = () => {
  const { data: session, status } = useSession()
  const router = useRouter()

  if (status === 'loading') return null
  else if (status === 'unauthenticated') router.push('/')
  else {
    const {
      _id: userId,
      email,
      image,
      name,
      lastname,
      currency,
    } = session?.user as unknown as UserWithId
    return (
      <div className="min-h-[90vh] bg-light-green dark:bg-darkest-blue w-100 d-flex justify-content-center align-items-center">
        <aside className="bg-gray-100 dark:bg-violet-blue-profile shadow-md min-h-[60vh] w-10/12 md:w-8/12 lg:w-1/2 xl:w-1/3 2xl:w-3/12 mx-auto rounded-[10px]">
          {session && (
            <div className="w-full flex flex-col items-center pb-6">
              <div className="w-full flex flex-col items-center">
                <div
                  className="bg-[#d6d4e4] bg-profile absolute h-[100px] md:h-[150px] w-10/12 md:w-8/12 lg:w-1/2 xl:w-1/3 2xl:w-3/12 mx-auto
              rounded-t-[10px]"
                ></div>
                <UserImage
                  image={image.toString() ?? LogoUser.toString()}
                  userId={userId}
                />
              </div>

              {/* data */}
              <div className="w-3/5 md:w-7/10">
                {/* user */}
                <UserName
                  name={name.toString()}
                  userId={userId}
                  lastname={lastname.toString()}
                />

                {/* email */}
                <div className="">
                  <div
                    className="text-gray-900 dark:text-main-yellow flex items-center
                justify-between w-full"
                  >
                    <div className="flex items-center gap-1 text-md">
                      <FontAwesomeIcon icon={faEnvelope} />
                      <span className="ml-1">Email</span>
                    </div>
                  </div>
                  <p
                    className={`text-white mt-2 text-md bg-main-green dark:bg-violet-blue-profile outline-0 outline-white py-1 pl-1`}
                  >
                    {email}
                  </p>
                  <hr className="border-gray-900 dark:border-main-yellow border-2"></hr>
                </div>

                {/* plan actual */}
                <div className="">
                  <UserPlan />
                </div>

                <div>
                  <UserCurrency currency={currency} userId={userId} />
                </div>
              </div>
            </div>
          )}
        </aside>
      </div>
    )
  }
}

export default Account
