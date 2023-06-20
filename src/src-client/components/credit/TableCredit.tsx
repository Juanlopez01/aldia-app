import { ExpenseType } from '@/models/expense.model'
import { IncomeType } from '@/models/income.model'
import React from 'react'
import TableCreditRow from './TableCreditRow'

interface Props {
    transactions: IncomeType[] | ExpenseType[];
    type: string;
}

const stylesTH =
'px-6 pl-2  font-bold text-left uppercase align-middle bg-transparent border-b border-collapse shadow-none border-b-solid tracking-none whitespace-nowrap text-sm text-slate-400 opacity-70 dark:text-black'

const TableCredit = ({transactions, type} : Props) => {
  return (
    <section className='mt-4 overflow-x-auto rounded-[10px] w-full'>

        {transactions.length>0 
        ? <table className='shadow-plan w-full'>
            <thead className='border-[1px] border-gray-300 bg-white'>
                <tr className=''>
                    <th className={`mob:px-2 md:px-8 py-3 text-sm md:text-md ${stylesTH}`}>Categoría</th>
                    <th className={`mob:px-2 md:px-8 py-3 text-sm md:text-md ${stylesTH}`}>Descripción</th>
                    <th className={`mob:px-2 md:px-8 py-3 text-sm md:text-md ${stylesTH}`}>Crédito</th>
                    <th className={`mob:px-2 md:px-8 py-3 text-sm md:text-md ${stylesTH}`}>Importe</th>
                    <th className={`mob:px-2 md:px-8 py-3 text-sm md:text-md ${stylesTH}`}>Finalizado</th>
                </tr>
            </thead>
            <tbody>
                {transactions.map((transaction) => { return <TableCreditRow key={transaction._id?.toString()} transaction={transaction} type={type}/>})}
            </tbody>
        </table> : <p className='pl-4'>No hay transacciones que coincidan</p>}
    </section>
  )
}

export default TableCredit