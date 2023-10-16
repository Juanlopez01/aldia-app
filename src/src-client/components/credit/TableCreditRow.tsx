import { ExpenseType } from '@/models/expense.model';
import { IncomeType } from '@/models/income.model';
import React from 'react'
import PhotoComponent from '../goals/PhotoComponent';
import { useDispatch } from 'react-redux';
import { updatePersonalExpense, updatePersonalIncome } from '@/redux/slice/PersonalSlice';
import Swal from 'sweetalert2';
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
        let lastCreditName
        if(transaction.credit.split(' ')[0] === 'No'){
          creditName = transaction.credit.split(' ')[0]
        } else {
          creditName = transaction.credit.split(' ').slice(0, 2).join(' ')
          lastCreditName = transaction.credit.split(' ')[3]
        }
        if(router.pathname === '/company/credit') {
          if(type === 'incomes'){
            transaction._id &&
            dispatch(updateCompanyIncome({...transaction, credit: e.target.checked ? `${creditName} nochecked ${lastCreditName}` : `${creditName} checked ${lastCreditName}` }, transaction._id))
          } else {
            transaction._id &&
            dispatch(updateCompanyExpense({...transaction, credit: e.target.checked ? `${creditName} nochecked ${lastCreditName}` : `${creditName} checked ${lastCreditName}` }, transaction._id))
          }
        } else {
          if(type === 'incomes'){
            transaction._id &&
            dispatch(updatePersonalIncome({...transaction, credit: e.target.checked ? `${creditName} nochecked ${lastCreditName}` : `${creditName} checked ${lastCreditName}` }, transaction._id))
          } else {
            transaction._id &&
            dispatch(updatePersonalExpense({...transaction, credit: e.target.checked ? `${creditName} nochecked ${lastCreditName}` : `${creditName} checked ${lastCreditName}` }, transaction._id))
          }
        }
      }
    })
    
  }

  const handleClick = (e : any) => {
    Swal.fire({
      title: 'Has pagado una nueva cuota?',
      text: 'Una vez aceptado no se podrá volver atrás',
      icon:'question',
      showCloseButton: true,
      showConfirmButton: true,
      confirmButtonText: 'Aceptar',
    }).then((result) => {
      if(result.isConfirmed){
        let creditName
        let creditAmount 
        if(transaction.credit.split(' ')[0] === 'No'){
          creditName = transaction.credit.split(' ').slice(0,2).join(' ');
        } else {
          creditName = transaction.credit.split(' ').slice(0, 3).join(' ');
          creditAmount = transaction.credit.split(' ')[3]
        }
        if(router.pathname === '/company/credit') {
          if(type === 'incomes'){
            transaction._id &&
            dispatch(updateCompanyIncome({...transaction, credit: parseInt(creditAmount?.split('/')[0] as string) < parseInt(creditAmount?.split('/')[1] as string) ? parseInt(creditAmount?.split('/')[0] as string) === parseInt(creditAmount?.split('/')[1] as string) - 1 ? `${creditName.split(' ').slice(0,2).join(' ')} checked ${parseInt(creditAmount?.split('/')[0] as string) + 1}/${creditAmount?.split('/')[1]}` :  `${creditName} ${parseInt(creditAmount?.split('/')[0] as string) + 1}/${creditAmount?.split('/')[1]}` : `${creditName} ${creditAmount}`}, transaction._id))
          } else {
            transaction._id &&
            dispatch(updateCompanyExpense({...transaction,credit: parseInt(creditAmount?.split('/')[0] as string) < parseInt(creditAmount?.split('/')[1] as string) ? parseInt(creditAmount?.split('/')[0] as string) === parseInt(creditAmount?.split('/')[1] as string) - 1 ? `${creditName.split(' ').slice(0,2).join(' ')} checked ${parseInt(creditAmount?.split('/')[0] as string) + 1}/${creditAmount?.split('/')[1]}` :  `${creditName} ${parseInt(creditAmount?.split('/')[0] as string) + 1}/${creditAmount?.split('/')[1]}` : `${creditName} ${creditAmount}`}, transaction._id))
          }
        } else {
          if(type === 'incomes'){
            transaction._id &&
            dispatch(updatePersonalIncome({...transaction, credit: parseInt(creditAmount?.split('/')[0] as string) < parseInt(creditAmount?.split('/')[1] as string) ? parseInt(creditAmount?.split('/')[0] as string) === parseInt(creditAmount?.split('/')[1] as string) - 1 ? `${creditName.split(' ').slice(0,2).join(' ')} checked ${parseInt(creditAmount?.split('/')[0] as string) + 1}/${creditAmount?.split('/')[1]}` :  `${creditName} ${parseInt(creditAmount?.split('/')[0] as string) + 1}/${creditAmount?.split('/')[1]}` : `${creditName} ${creditAmount}`}, transaction._id))
          } else {
            transaction._id &&
            dispatch(updatePersonalExpense({...transaction, credit: parseInt(creditAmount?.split('/')[0] as string) < parseInt(creditAmount?.split('/')[1] as string) ? parseInt(creditAmount?.split('/')[0] as string) === parseInt(creditAmount?.split('/')[1] as string) - 1 ? `${creditName.split(' ').slice(0,2).join(' ')} checked ${parseInt(creditAmount?.split('/')[0] as string) + 1}/${creditAmount?.split('/')[1]}` :  `${creditName} ${parseInt(creditAmount?.split('/')[0] as string) + 1}/${creditAmount?.split('/')[1]}` : `${creditName} ${creditAmount}`}, transaction._id))
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
            <td className='mob:px-2 md:px-8 py-3 text-sm md:text-md'>{transaction.credit ? transaction.credit.split(' ')[0] === 'No' ? 'No' : transaction.credit.split(' ')[3] : 'No'}</td>
          <td className='mob:px-2 md:px-8 py-3 text-sm md:text-md'>s/{transaction.credit.split(' ')[0] === 'No' || transaction.credit.split(' ')[0] === 'Más'? transaction.value : transaction.value / parseInt(transaction.credit.split(' ')[3]?.split('/')[1]) }</td>
            <td className='mob:px-2 md:px-8 py-3 text-sm md:text-md'>s/{transaction.value}</td>
            <td className='mob:px-2 md:px-8 py-3 text-sm md:text-md'><button className='text-[#ffffff] px-2 py-1 cursor-pointer bg-[#495057] rounded-sm border-2 border-solid border-[#495057] transition-all font-bold hover:bg-white hover:text-[#495057]' onClick={handleClick}>Pagar cuota</button></td>
            <td className='mob:px-2 md:px-8 py-3 text-sm md:text-md'><input type='checkbox' name='checkbox' checked={check === 'checked' ? true : false} disabled={check === 'checked'} onChange={handleChange}/></td>
        </tr>
    </>
  )
}

export default TableCreditRow

// .css-button-sharp--grey {
//   min-width: 130px;
//   height: 40px;
//   color: #fff;
//   padding: 5px 10px;
//   font-weight: bold;
//   cursor: pointer;
//   transition: all 0.3s ease;
//   position: relative;
//   display: inline-block;
//   outline: none;
//   border: 2px solid #495057;
//   background: #495057;
// }
// .css-button-sharp--grey:hover {
//   background: #fff;
//   color: #495057
// }