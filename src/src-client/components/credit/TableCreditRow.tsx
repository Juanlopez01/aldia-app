import { ExpenseType } from '@/models/expense.model';
import { IncomeType } from '@/models/income.model';
import React from 'react'
import PhotoComponent from '../goals/PhotoComponent';

interface Props {
    transaction: IncomeType | ExpenseType;
}

const TableCreditRow = ({transaction} : Props) => {
  const cat= transaction?.category?.toString()
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
        </tr>
    </>
  )
}

export default TableCreditRow