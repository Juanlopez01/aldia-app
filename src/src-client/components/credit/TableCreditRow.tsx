import { ExpenseType } from '@/models/expense.model';
import { IncomeType } from '@/models/income.model';
import React from 'react'
import PhotoComponent from '../goals/PhotoComponent';
import { useDispatch } from 'react-redux';
import { updatePersonalExpense, updatePersonalIncome } from '@/redux/slice/PersonalSlice';
import Swal from 'sweetalert2';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/router';
import { updateCompanyExpense, updateCompanyIncome } from '@/redux/slice/CompanySlice';

interface Props {
    transaction: IncomeType | ExpenseType;
    type: string;
}



const TableCreditRow = ({transaction, type} : Props) => {
  const router = useRouter()

  const dispatch : Function = useDispatch()
  const cat= transaction?.category?.toString()
  const check = transaction.credit?.split(' ')[2]
  const handleChange = (e : any) => {
    Swal.fire({
      title: 'Este crédito ha concluído?',
      text: 'Una vez aceptado no se podrá volver atrás',
      icon:'question',
      showCloseButton: true,
      showConfirmButton: true,
      confirmButtonText: 'Aceptar',
    }).then((result) => {
      if(result.isConfirmed){
        let creditName
        if(transaction.credit.split(' ')[0] === 'No'){
          creditName = transaction.credit.split(' ')[0]
        } else {
          creditName = transaction.credit.split(' ').slice(0, 2).join(' ')
        }
        if(router.pathname === '/company/credit') {
          if(type === 'incomes'){
            transaction._id &&
            dispatch(updateCompanyIncome({...transaction, credit: e.target.checked ? `${creditName} nochecked` : `${creditName} checked` }, transaction._id))
          } else {
            transaction._id &&
            dispatch(updateCompanyExpense({...transaction, credit: e.target.checked ? `${creditName} nochecked` : `${creditName} checked` }, transaction._id))
          }
        } else {
          if(type === 'incomes'){
            transaction._id &&
            dispatch(updatePersonalIncome({...transaction, credit: e.target.checked ? `${creditName} nochecked` : `${creditName} checked` }, transaction._id))
          } else {
            transaction._id &&
            dispatch(updatePersonalExpense({...transaction, credit: e.target.checked ? `${creditName} nochecked` : `${creditName} checked` }, transaction._id))
          }
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
            <td className='mob:px-2 md:px-8 py-3 text-sm md:text-md'>{transaction.credit ? transaction.credit.split(' ')[0] === 'No' ? 'No' : transaction.credit.split(' ').slice(0, 2).join(' ') : 'No'}</td>
            <td className='mob:px-2 md:px-8 py-3 text-sm md:text-md'>s/{transaction.value}</td>
            <td className='mob:px-2 md:px-8 py-3 text-sm md:text-md'><input type='checkbox' name='checkbox' checked={check === 'checked' ? true : false} disabled={check === 'checked'} onChange={handleChange}/></td>
        </tr>
    </>
  )
}

export default TableCreditRow