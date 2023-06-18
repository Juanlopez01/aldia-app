import { ExpenseType } from '@/models/expense.model'
import { IncomeType } from '@/models/income.model'
import React from 'react'
import TableCreditRow from './TableCreditRow'

interface Props {
    transactions: IncomeType[] | ExpenseType[]
}

const TableCredit = ({transactions} : Props) => {
  return (
    <section className='pt-4'>
        {transactions.length>0 
        ? <table className='bg-white rounded-md shadow-plan'>
            <thead className=''>
                <tr className='border-[1px] border-black'>
                    <th className='px-3 border-r-[1px] border-r-black'>Categoría</th>
                    {/* <th>Descripción</th> */}
                    <th className='px-3 border-r-[1px] border-r-black'>Crédito</th>
                    <th className='px-3 border-r-[1px] border-r-black'>Valor</th>
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