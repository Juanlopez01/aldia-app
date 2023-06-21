import { getNames } from '@/redux/slice/CompanySlice'
import { Graphics } from '@/src-client/components/Graphics'
import EnterModal from '@/src-client/components/Modals/Company/EnterModal'
import ModalRegister from '@/src-client/components/Modals/Company/ModalRegister'
import { getCompany } from '@/src-client/utilities/getCompany'
import verifyUserCompany from '@/src-client/utilities/verifyCompany'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import LayoutWithSideNav from '@/src-client/components/layouts/LayoutSideNav'
import Notifications from '@/src-client/components/Modals/Company/Notifications'
import { useValidatePlan } from '@/src-client/hooks/use-validate-plan'
import { useAppSelector } from '@/src-client/hooks/use-redux'
import { UserWithMongooseId } from '@/models/user.model'

const Company = () => {
  const dispatch: Function = useDispatch()
  const { session } = useValidatePlan()
  const [company, setCompany] = useState('loadingCompany')
  const [companySelect, setCompanySelect] = useState('')
  const companyData = useAppSelector(
    (state) => state.CompanyReducer.selectedCompany
  )
  const user = (session?.user as unknown as UserWithMongooseId) || {}
  const companyNames = useSelector((state: any) => state.CompanyReducer.names)
  const companyAllNames = useSelector(
    (state: any) => state.CompanyReducer.allNames
  )
  const email = session?.user?.email
  //verifico si el usuario esta asociado a companias y si es asi, las traigo
  const verification = async () => {
    if (email) {
      const res = await verifyUserCompany(email)
      if (company !== res) setCompany(res)
    }
  }
  //Si aun no tengo companias cargadas en el estado
  if (company === 'loadingCompany' || companyNames?.length === 0) {
    if (company === 'loadingCompany') verification()
    if (company !== 'loadingCompany' && company !== 'Not found')
      dispatch(getNames(company))
  }

  const handleSelect = (e: any) => {
    const id = e.target.value
    if (id !== companySelect) {
      getCompany(id, dispatch)
      setCompanySelect(id)
    }
  }
  const id = user._id

  return (
    <LayoutWithSideNav>
      <div
        className="text-center bg-light-green dark:bg-violet-blue-profile pt-10 py-8 w-full overflow-hidden min-h-[80vh] flex flex-col
    	md:items-center pl-4"
      >
        <div className="container-graphics">
          <div className="min-h-screen">
            {company === 'loadingCompany' && companyData?.name !== '' && (
              <span className="loader"></span>
            )}
            {company === 'Not found' && companyData?.name === '' && (
              <>
                <ModalRegister />
                <EnterModal data={companyAllNames} />
              </>
            )}
            {companyNames && (
              <div className="">
                <div className="input-group">
                  <label className="input-group-text">Compañía</label>
                  <select
                    className="!w-1/5 form-control"
                    onClick={(e) => handleSelect(e)}
                  >
                    {companyNames?.map((company: any) => {
                      return (
                        <option
                          key={company.id}
                          value={company.id}
                          className="flex-row"
                        >
                          <span className="text-light">{company.name}</span>
                        </option>
                      )
                    })}
                  </select>
                </div>
                <ModalRegister />
                <EnterModal data={companyAllNames} />
              </div>
            )}
            {companySelect && companyData && (
              <>
                <h2 className="mt-2">{companyData.name}</h2>
                {session?.user && user._id === companyData.users[0] && (
                  <>
                    <Notifications data={companyData} dispatch={dispatch} />
                  </>
                )}
                <Graphics
                  type="negocio"
                  incomes={companyData.incomes as []}
                  expenses={companyData.expenses as []}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </LayoutWithSideNav>
  )
}

export default Company
