import { ExpenseType } from '@/models/expense.model';
import { IncomeType } from '@/models/income.model';
import React from 'react'

interface Props {
    transaction: IncomeType | ExpenseType;
}

const TableCreditRow = ({transaction} : Props) => {
  return (
    <>
        <tr key={transaction._id?.toString()} className='border-[1px] border-gray-400 bg-white'>
            <td className='mob:px-2 md:px-8 py-2 text-sm md:text-md'>{transaction.category}</td>
            <td className='mob:px-2 md:px-8 py-2 text-sm md:text-md'>{transaction.description ? transaction.description : "No hay descripción"}</td>
            <td className='mob:px-2 md:px-8 py-2 text-sm md:text-md'>{transaction.credit}</td>
            <td className='mob:px-2 md:px-8 py-2 text-sm md:text-md'>${transaction.value}</td>
        </tr>
    </>
  )
}

export default TableCreditRow