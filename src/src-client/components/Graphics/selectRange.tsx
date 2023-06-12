import { catTransactions } from '@/utils/categoriesTransactions'
import { datesRange } from '@/utils/dateRange'
import React from 'react'

const SelectRange = (setDateRange : any) => {
  return (
    <div>
        <select name="dateRange" id="dateRange" required defaultValue={'Todo'} onChange={(e) => setDateRange(e.target.value)} >
            {datesRange.map((category) => {
                return <option value={category} key={category}>{category}</option>
            })}
        </select>
    </div>
  )
}

export default SelectRange