import { ExpenseType } from '@/models/expense.model';
import { IncomeType } from '@/models/income.model';
import React from 'react'

interface Props {
    transaction: IncomeType | ExpenseType;
}

const TableCreditRow = ({transaction} : Props) => {
  return (
    <>
        <tr key={transaction._id?.toString()} className='border-[1px] border-gray-400'>
            <th className='px-4 py-2'>{transaction.category}</th>
            {/* <th>{transaction.description}</th> */}
            <th className='px-4 py-2'>{transaction.credit}</th>
            <th className='px-4 py-2'>${transaction.value}</th>
        </tr>
    </>
  )
}

export default TableCreditRow