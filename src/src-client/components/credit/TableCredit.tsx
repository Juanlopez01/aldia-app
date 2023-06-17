import { ExpenseType } from '@/models/expense.model'
import { IncomeType } from '@/models/income.model'
import React from 'react'
import TableCreditRow from './TableCreditRow'

interface Props {
    transactions: IncomeType[] | ExpenseType[]
}

const TableCredit = ({transactions} : Props) => {
  return (
    <section>
        <table>
            <thead>
                <tr>
                    <th>Categoría</th>
                    <th>Descripción</th>
                    <th>Crédito</th>
                    <th>Valor</th>
                </tr>
            </thead>
            <tbody>
                {transactions.map((transaction) => { return <TableCreditRow transaction={transaction}/>})}
            </tbody>
        </table>
    </section>
  )
}

export default TableCredit