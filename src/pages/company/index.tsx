import { getAllNames, getNames } from "@/redux/slice/CompanySlice";
import { Graphics } from "@/src-client/components/Graphics";
import EnterModal from "@/src-client/components/Modals/Company/EnterModal";
import ModalRegister from "@/src-client/components/Modals/Company/ModalRegister";
import { getCompany } from "@/src-client/utilities/getCompany";
import verifyUserCompany from "@/src-client/utilities/verifyCompany";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LayoutWithSideNav from "@/src-client/components/layouts/LayoutSideNav";
import { sendCompanyNotification } from "@/redux/slice/CompanySlice";
import Notifications from "@/src-client/components/Modals/Company/Notifications";

const Company = () => {
  const dispatch: Function = useDispatch()
  const { data: session } : any = useSession()
  const [company, setCompany] = useState('loadingCompany')
  const [companySelect, setCompanySelect] = useState('')
  const companyData = useSelector(
    (state: any) => state.CompanyReducer.selectedCompany
  )
  const companyNames = useSelector((state: any) => state.CompanyReducer.names)
  const companyAllNames = useSelector((state : any) => state.CompanyReducer.allNames)
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

  const handleSelect = (id: string) => {
    if (id !== companySelect) {
      getCompany(id, dispatch)
      setCompanySelect(id)
    }
  }


	return (
    <LayoutWithSideNav>
      <div className="container-graphics w-50 gap-2">
        <div className="min-h-screen">
          {company === 'loadingCompany' && companyData?.name !== '' && (
            <span className="loader"></span>
          )}
          {company === 'Not found' && companyData?.name === '' && (
            <>
              <h1>No hemos encontrado tu compañía</h1>
              <ModalRegister />
              <EnterModal data={companyAllNames}/>
            </>
          )}
          {companyNames && (
            <>
              <h1 className="w-100  text-center">Seleccionar compañía</h1>
              <div className="d-flex list-unstyled">
                <ul className="list-unstyled d-flex flex-row gap-4 w-100 overflow-scroll ">
                  {companyNames?.map((company: any) => {
                    return (
                      <li key={company.id} className="flex-row">
                        <button
                          className="btn-general"
                          onClick={() => handleSelect(company.id)}
                        >
                          <span className="text-light">{company.name}</span>
                        </button>
                      </li>
                    )
                  })}
                </ul>
              </div>
              <ModalRegister />
              <EnterModal data={companyAllNames}/>
            </>
          )}
          {companySelect && companyData && (
            <>
              <h2 className="mt-5">{companyData.name}</h2> 
              { session?.user && session.user._id === companyData.users[0] && 
              <>
              <Notifications data={companyData} dispatch={dispatch}/>
              </>}
              <Graphics
                type="negocio"
                incomes={companyData.incomes}
                expenses={companyData.expenses}
              />
            </>
          )}
        </div>
      </div>
    </LayoutWithSideNav>
  )
}

export default Company
