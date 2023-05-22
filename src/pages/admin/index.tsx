import { getList } from '@/redux/slice/AdminSlice'
import AdminTable from '@/src-client/components/Tables/AdminTable'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Admin = () => {
  const dispatch: Function = useDispatch()
  const [type, setType] = useState('usuarios')
  const companies = useSelector((state: any) => state.AdminSlice.companies)
  const users = useSelector((state: any) => state.AdminSlice.users)


  const changeType = () => {
    type === 'negocio' ?
      setType('usuarios')
      : setType('negocio')

    dispatch(getList(type))
  }

  return (
    <div className='w-100'>
      <div className='d-flex justify-content-center align-items-center' style={{ height: "10vh" }}>
        <button
          className='btn-general '
          onClick={() => changeType()}>
          <span className="text-light">{type === 'negocio' ? 'usuarios' : 'negocios'}</span>
        </button>
      </div>
      <AdminTable list={type === 'negocio' ? companies : users} type={type} />
    </div>
  )
}

export default Admin