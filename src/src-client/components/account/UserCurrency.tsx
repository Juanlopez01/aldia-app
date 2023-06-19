import { useAuth } from "@hooks/use-auth"
import { useToggle } from "@hooks/use-toggle"
import { Currency } from "@/types/auth.type"
import { currencyFlags } from "@/utils/diccionaries"
import { faDollarSign, faPencil } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { ObjectId } from "mongodb"
import Modal from "@components/generals/Modal"

interface UserCurrency {
    currency: Currency
    userId: ObjectId
}

const authConfig = {
    action: 'update',
    initialState:{},
    success: {
      title: 'Genial!',
      text: 'Haz cambiado tu moneda de preferecia',
      timer: 1000
    },
  }
export default function UserCurrency({ currency, userId}:UserCurrency) {
    const {toggle,toggleHandler}=useToggle(false)
    const {singInAction, isLoading}= useAuth({...authConfig})
    const handleClickCurrencies = (currency:string)=>{
        singInAction({
            ...authConfig,
            inputs:{},
            update:{
                id:userId,
                property:'currency',
                value: currency
            },
            onSuccess: toggleHandler
        })
    }

  return (
    <>
      <div
        className="text-gray-900 dark:text-main-yellow flex items-center
                justify-between w-full"
      >
        <div className="flex items-center gap-2 text-md">
          <FontAwesomeIcon icon={faDollarSign} />
          <span className="">Moneda de preferecia</span>
          <FontAwesomeIcon
            icon={faPencil}
            onClick={toggleHandler}
            className=" text-gray-900 dark:text-white cursor-pointer"
          />
        </div>
      </div>
      <p
        className={`text-white mt-2 text-md bg-main-green dark:bg-violet-blue-profile outline-0 outline-white py-1 pl-1 `}
      >
        <div className="relative">
          {toggle && (
            <div className="absolute bg-medium-blue p-2 rounded max-h-40 overflow-y-scroll ">
              <ul className="p-0 m-0">
                {Object.keys(currencyFlags).map((curr: string, i: number) => (
                  <li
                    key={i}
                    onClick={() => handleClickCurrencies(curr)}
                    className="cursor-pointer hover:bg-light-blue/50 rounded-sm py-1 px-2 "
                  >{`${curr} ${currencyFlags[curr]}`}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
        {`${currency} ${currencyFlags[currency]}`}
      </p>
      <hr className="border-gray-900 dark:border-main-yellow border-2"></hr>
    </>
  )
}
