import { PaymentType } from '@/models/payment.model'
import { UserWithId } from '@/models/user.model'
import { useToggle } from '@/src-client/hooks/use-toggle'
import { fetchPayment, requestAdminUsers } from '@/utils/request'
import Modal from '@components/generals/Modal'
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ObjectId } from 'mongodb'
import { isValidObjectId } from 'mongoose'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import UserAdminModal from '@components/Modals/UserAdminModal'

type Props = {
  user: UserWithId
  onSuccess: (user: UserWithId) => void
}

export default function AdminModal(props: Props) {
  const { toggle, toggleHandler } = useToggle(false)

  return (
    <>
      <button
        onClick={toggleHandler}
        className="flex h-full w-full justify-center items-center"
      >
        <FontAwesomeIcon icon={faCircleInfo} className="h-6 w-6 text-black" />
      </button>
      <Modal
        title={`Detalles de ${props.user.name}`}
        showModal={toggle}
        closeModal={toggleHandler}
      >
        <UserAdminModal {...props} />
        
      </Modal>
    </>
  )
}
