import { ExpenseType } from '@/models/expense.model';
import { IncomeType } from '@/models/income.model';
import React from 'react'

interface Props {
    transaction: IncomeType | ExpenseType;
}

const TableCreditRow = ({transaction} : Props) => {
  return (
    <>
        <tr key={transaction._id?.toString()} className='border-[1px] border-black'>
            <th className='px-3 border-r-[1px] border-r-black'>{transaction.category}</th>
            {/* <th>{transaction.description}</th> */}
            <th className='px-3 border-r-[1px] border-r-black'>{transaction.credit}</th>
            <th className='px-3 border-r-[1px] border-r-black'>${transaction.value}</th>
        </tr>
    </>
  )
}

export default TableCreditRow