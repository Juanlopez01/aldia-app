import { catTransactions, incomesPersonal } from '@/utils/categoriesTransactions'
import Calendar from 'react-calendar'
import React from 'react'
import { creditList } from '@/utils/listCredits'
import { traductDate } from '@/utils/traductDate'
import { useAppSelector } from '@/src-client/hooks/use-redux'
import { expensesCompany, incomesCompany } from '@/utils/companyTransactions'
export interface FormType {
  type: string
  description: string
  category: string
  value: number
  date: string
  credit: string

}

interface FormProps {
  form: FormType
  setForm: Function
  type: string
  extraCategories : string[] | [] | null | undefined
  transactionType: string
}

const inyectOtherCategories = (otherCats : string[], defaultCategories : string[])=>{
  const lastCat = defaultCategories.at(-1)
  const allCategories = [...defaultCategories.slice(0,defaultCategories.length - 1), ...otherCats, lastCat]

  return allCategories

}

export default function FormRegister({ form, setForm,type, extraCategories, transactionType }: FormProps) {
  const [dateShow, setDateShow] = React.useState(true)
  const [showOtherCategory, setShowOtherCategory] = React.useState(false)
  const [otherCategory, setOtherCategory] = React.useState('')
  const {otherCategories}= useAppSelector(s=> type==='negocio'? s.CompanyReducer  : s.PersonalReducer)
  const handleChange = (
    evt: React.FormEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const name = evt.currentTarget.name
    const value = evt.currentTarget.value
    if (name === 'value') {
      setForm({ ...form, [name]: value.valueOf() })
    } else if (name === 'category' && value === 'Otros') {
      setShowOtherCategory(true)
    } else if (name === 'other-category') {
      setOtherCategory(value)
      setForm({ ...form, category: value })
    } else if (name === 'credit') {
      setForm({ ...form, [name]: `${value} nochecked` })
    } else {
      setForm({ ...form, [name]: value })
    }
  }

  const handleDateChange = (e: any) => {
    const formatDate = traductDate(e)
    setForm({ ...form, date: formatDate })
    setDateShow(true)
  }

  return (
    <form className="d-flex flex-column z-50 text-black">
      <div className="input-group mb-3 w-100 mt-3">
        <label htmlFor="text" className="input-group-text">
          Categoria
        </label>
        <select
          name="category"
          className="form-control"
          defaultValue={form.category}
          onChange={handleChange}
          required
        > 
         <option value="" key={'null'}></option>
          {extraCategories && extraCategories.length > 0 && extraCategories.map((category : string) => {
            return (
              <option key={category} value={category}>
                {category}
              </option>
            )
          })}
          {inyectOtherCategories(otherCategories, type === 'negocio' ? transactionType === 'expense' ? expensesCompany : incomesCompany : transactionType === 'expense' ? catTransactions : incomesPersonal).map((category) => {
            return (
              <option key={category} value={category}>
                {category}
              </option>
            )
          })}
        </select>
      </div>

      {showOtherCategory && (
        <div className="input-group mb-3 w-100 ">
          <label htmlFor="text" className="input-group-text">
            Otra categoría
          </label>
          <input
            type="text"
            name="other-category"
            onChange={handleChange}
            value={otherCategory}
            placeholder="Nombre de otra categoría"
            className="form-control"
          />
        </div>
      )}
      <div className="input-group mb-0 w-100">
        <label htmlFor="text" className="input-group-text ">
          Fecha
        </label>
        <input
          type="text"
          id="check"
          value={form?.date?.toString()}
          placeholder="Seleccione una fecha"
          onClick={() => setDateShow(!dateShow)}
          className="form-control"
        />
      </div>
      <div className={`${!dateShow ? '' : 'hidden'}`}>
        <Calendar
          value={form.date ?? new Date()}
          onChange={handleDateChange}
          className="bg-white [span:bg-white text-center important]"
        />
      </div>

      <div className="input-group mb-3 mt-3 w-100">
        <label htmlFor="value" className="input-group-text">
          Importe
        </label>
        <input
          type="number"
          value={form.value}
          onChange={handleChange}
          step="0.01"
          min="0.01"
          max={Infinity}
          name="value"
          className="form-control"
          aria-describedby="Valor"
          placeholder="Ingresa aca el valor"
        />
      </div>

      <div className="input-group mb-3 w-100 mt-0">
        <label htmlFor="text" className="input-group-text">
          Crédito
        </label>
        <select
          name="credit"
          className="form-control"
          defaultValue={form.credit}
          onChange={handleChange}
          required
        >
          {creditList.map((credit) => {
            return (
              <option key={credit} value={credit}>
                {credit}
              </option>
            )
          })}
        </select>
      </div>

      <div className="form-floating">
        <textarea
          className="form-control"
          placeholder="Leave a comment here"
          id="floatingTextarea"
          value={form.description}
          onChange={handleChange}
          name="description"
          rows={5}
        ></textarea>
        <label htmlFor="floatingTextarea">Descripción</label>
      </div>
    </form>
  )
}
