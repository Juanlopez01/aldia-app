import { ExpenseType } from '@/models/expense.model';
import { IncomeType } from '@/models/income.model';
import React from 'react'
import PhotoComponent from '../goals/PhotoComponent';
import { useDispatch } from 'react-redux';
import { updatePersonalExpense, updatePersonalIncome } from '@/redux/slice/PersonalSlice';
import Swal from 'sweetalert2';

interface Props {
    transaction: IncomeType | ExpenseType;
    type: string;
}

const TableCreditRow = ({transaction, type} : Props) => {
  const dispatch : Function = useDispatch()
  const cat= transaction?.category?.toString()
  const check = transaction.credit.split(' ')[2]
  const handleChange = (e : any) => {
    Swal.fire({
      title: 'Ha finalizado este crédito?',
      text: 'Una vez modificado, no podrá deshacer este cambio',
      icon: 'question',
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      if(result.isConfirmed) {
        if(type === 'incomes'){
          transaction._id &&
          dispatch(updatePersonalIncome({...transaction, credit: e.target.checked ? `${transaction.credit} checked` : `${transaction.credit} nochecked` }, transaction._id))
        } else {
          transaction._id &&
          dispatch(updatePersonalExpense({...transaction, credit: e.target.checked ? `${transaction.credit} checked` : `${transaction.credit} nochecked` }, transaction._id))
        }
      }
    })
  }
  return (
    <>
        <tr key={transaction._id?.toString()} className='border-[1px] border-gray-300 border-b-black bg-gray-100 hover:bg-gray-200 duration-200'>
            <td className='mob:px-2 md:px-8 py-3 text-sm md:text-md flex items-center gap-x-3'>
					    <div className='hidden sm:flex'>
                <PhotoComponent category={cat!=="Mercadería" ? transaction?.category?.toString() : "Mercaderia"} width={30} height={30} />
              </div>
              <span>{transaction.category}</span>
            </td>
            <td className='mob:px-2 md:px-8 py-3 text-sm md:text-md'>{transaction.description ? transaction.description : "No hay descripción"}</td>
            <td className='mob:px-2 md:px-8 py-3 text-sm md:text-md'>{transaction.credit}</td>
            <td className='mob:px-2 md:px-8 py-3 text-sm md:text-md'>${transaction.value}</td>
            <td className='mob:px-2 md:px-8 py-3 text-sm md:text-md'><input type='checkbox' className='bg-transparent ' name='checkbox' checked={check === 'checked' ? true : false} onChange={handleChange}/></td>
        </tr>
    </>
  )
}

export default TableCreditRow