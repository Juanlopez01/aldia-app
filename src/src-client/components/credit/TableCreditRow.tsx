import { ExpenseType } from '@/models/expense.model';
import { IncomeType } from '@/models/income.model';
import React from 'react'

interface Props {
    transaction: IncomeType | ExpenseType;
}

const TableCreditRow = ({transaction} : Props) => {
  return (
    <>
        <tr key={transaction._id?.toString()}>
            <th>{transaction.category}</th>
            <th>{transaction.description}</th>
            <th>{transaction.credit}</th>
            <th>{transaction.value}</th>
        </tr>
    </>
  )
}

export default TableCreditRow