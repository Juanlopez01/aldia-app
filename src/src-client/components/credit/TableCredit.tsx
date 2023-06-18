import { ExpenseType } from '@/models/expense.model'
import { IncomeType } from '@/models/income.model'
import React from 'react'
import TableCreditRow from './TableCreditRow'

interface Props {
    transactions: IncomeType[] | ExpenseType[]
}

const TableCredit = ({transactions} : Props) => {
  return (
    <section className='pt-4 overflow-x-auto'>
        {transactions.length>0 
        ? <table className='rounded-md shadow-plan'>
            <thead className='bg-white border-[1px] border-gray-400'>
                <tr className=''>
                    <th className='mob:px-2 md:px-8 py-2 text-sm md:text-md'>Categoría</th>
                    <th className='mob:px-2 md:px-8 py-2 text-sm md:text-md'>Descripción</th>
                    <th className='mob:px-2 md:px-8 py-2 text-sm md:text-md'>Crédito</th>
                    <th className='mob:px-2 md:px-8 py-2 text-sm md:text-md'>Valor</th>
                </tr>
            </thead>
            <tbody>
                {transactions.map((transaction) => { return <TableCreditRow key={transaction._id?.toString()} transaction={transaction}/>})}
            </tbody>
        </table> : <p>No hay transacciones que coincidan</p>}
    </section>
  )
}

export default TableCredit