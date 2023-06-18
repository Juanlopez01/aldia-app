import { creditList } from '@/utils/listCredits'
import React from 'react'

const SearchBarCredit = ({filters, setFilters} : any) => {
    const onChange =(e : any) => {
        setFilters({...filters, [e.target.name]: e.target.value});
    }

  return (
    <div>
        <div className='flex flex-col'>
            <label>Tipo</label>
            <select name="type" id="type" defaultValue={'incomes'} onChange={onChange}
            className='border-2 border-gray-300 rounded-md p-1 dark:bg-white  w-full md:w-1/2 xl:w-1/3'>
                <option value="incomes" key='incomes'>Ingresos</option>
                <option value="expenses" key='expenses'>Gastos</option>
            </select>
        </div>
        <div className='flex flex-col pt-3'>
            <label>Crédito</label>
            <select name='credit' id='credit' defaultValue={'Un pago'} onChange={onChange}
            className='border-2 border-gray-300 rounded-md p-1 dark:bg-white w-full md:w-1/2 xl:w-1/3'>
                {creditList.map((credit : string) => {
                    return <option value={credit} key={credit}>{credit}</option>
                })}
            </select>
        </div>
    </div>
  )
}

export default SearchBarCredit