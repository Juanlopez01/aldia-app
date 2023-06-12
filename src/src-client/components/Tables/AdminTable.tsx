import { CompanType } from '@/models/company.model'
import { UserType } from '@/models/user.model'
import React, { useState } from 'react'
import AdminModal from './AdminModal'
import { useDispatch, useSelector } from 'react-redux'
import { getDetails, updateUserStatus } from '@/redux/slice/AdminSlice'
import Swal from 'sweetalert2'

interface List {
  list: CompanType[] | UserType[] | [],
  type: string
}

const AdminTable = () => {

  return (
    <>
      <section className="w-full">
        <header className="h-12 m-2 rounded shadow-md w-auto flex justify-center">
          <nav>
            
          </nav>
        </header>
      </section>
    </>
  )
}

export default AdminTable
