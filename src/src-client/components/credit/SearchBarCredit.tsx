import { creditList } from '@/utils/listCredits'
import React from 'react'

const SearchBarCredit = ({filters, setFilters} : any) => {
    const onChange =(e : any) => {
        setFilters({...filters, [e.target.name]: e.target.value});
    }

  return (
    <div>
        <div>
            <label>Tipo</label>
            <select name="type" id="type" defaultValue={'incomes'} onChange={onChange}>
                <option value="incomes" key='incomes'>Ingresos</option>
                <option value="expenses" key='expenses'>Gastos</option>
            </select>
        </div>
        <div>
            <label>Crédito</label>
            <select name='credit' id='credit' defaultValue={'Un pago'} onChange={onChange}>
                {creditList.map((credit : string) => {
                    return <option value={credit} key={credit}>{credit}</option>
                })}
            </select>
        </div>
    </div>
  )
}

export default SearchBarCredit