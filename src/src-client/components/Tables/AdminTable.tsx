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

  return <></>
}

export default AdminTable
