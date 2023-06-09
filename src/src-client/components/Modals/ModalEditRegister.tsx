import capitalize from '@/utils/capitalize'
import Image from 'next/image'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import icoEditar from '../../../../assets/pencil-svgrepo-com.svg'
import FormRegister from './FormAddRegister'


import {
  updateCompanyExpense,
  updateCompanyIncome,
} from '@/redux/slice/CompanySlice'

import {
  updatePersonalExpense,
  updatePersonalIncome,
} from '@/redux/slice/PersonalSlice'
import {
  updateAdminCompanyExpense,
  updateAdminCompanyIncome,
  updateAdminUserExpense,
  updateAdminUserIncome,
} from '@/redux/slice/AdminSlice'
import Modal from '@components/generals/Modal'
import { traductDate } from '@/utils/traductDate'

interface PropsModal {
  props: {
    type: string
    description: String
    category: String
    value: number
    id: String
    table: String
    date: string;
    credit: string;
  }

}
const date = traductDate(new Date())
const initialStateForm = {
  type: '',
  description: '',
  category: '',
  value: 0,
  date: date,
  credit: 'Un pago',
};


export function ModalEdit({ props }: PropsModal) {
  const [form, setForm] = useState(initialStateForm)
  const [show, setShow] = useState(false)
  const dispatch: Function = useDispatch()

  const handleClose = () => {
    setShow(false)
  }
  const handleShow = () => {
    setForm({
      value: props.value,
      category: props.category.toString(),
      description: props.description.toString(),
      type: props.type.toString(),
      date: props.date,
      credit: props.credit
    });
    setShow(true);
  };

  const sendForm = () => {
    switch (props.table) {
      case 'ingresos':
        props.type.toString() === 'negocio'
          ? dispatch(updateCompanyIncome(form, props.id))
          : dispatch(updatePersonalIncome(form, props.id))
        setForm(initialStateForm)
        handleClose()
        break
      case 'gastos':
        props.type.toString() === 'negocio'
          ? dispatch(updateCompanyExpense(form, props.id))
          : dispatch(updatePersonalExpense(form, props.id))

        setForm(initialStateForm)
        handleClose()
        break
      case 'admin expenses':
        props.type.toString() === 'negocio'
          ? dispatch(updateAdminCompanyExpense(form, props.id))
          : dispatch(updateAdminUserExpense(form, props.id))
        setForm(initialStateForm)
        handleClose()
        break
      case 'admin incomes':
        props.type.toString() === 'negocio'
          ? dispatch(updateAdminCompanyIncome(form, props.id))
          : dispatch(updateAdminUserIncome(form, props.id))
        setForm(initialStateForm)
        handleClose()
        break
    }
  }

  return (
    <>
      <button
        onClick={handleShow}
        className="border-0 rounded-1 m-1 text-white "
      >
        <Image src={icoEditar} alt="Editar" width={30} height={30} />
      </button>
      <Modal
        title={`Editar Registro - ${capitalize(props.table)}`}
        showModal={show}
        closeModal={handleClose}
        footer={
          <div className="flex  flex-row justify-around">
            <button
              className="py-2 px-4 rounded bg-red-600 text-white w-fit "
              onClick={handleClose}
            >
              Cancelar
            </button>
            <button
              className="py-2 px-4 rounded bg-dark-blue text-white w-fit "
              onClick={sendForm}
            >
              Editar registro
            </button>
          </div>
        }
      >
        <FormRegister setForm={setForm} form={form} type={props.type} extraCategories={null} transactionType={props.table === 'ingresos' ? 'income' : 'expense'}/>
      </Modal>
    </>
  )
}
