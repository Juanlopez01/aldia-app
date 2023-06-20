import { catTransactions } from '@/utils/categoriesTransactions'
import Calendar from 'react-calendar'
import React from 'react'
import { creditList } from '@/utils/listCredits'
export interface FormType {
  type: string
  description: string
  category: string
  value: number
  date: Date
  credit: string
}

interface FormProps {
  form: FormType
  setForm: Function
}

export default function FormRegister({ form, setForm }: FormProps) {
  const [dateShow, setDateShow] = React.useState(true)
  const [showOtherCategory, setShowOtherCategory] = React.useState(false)
  const [otherCategory, setOtherCategory] = React.useState('')

  const handleChange = (
    evt: React.FormEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const name = evt.currentTarget.name
    const value = evt.currentTarget.value
    if (name === 'value') {
      setForm({ ...form, [name]: parseInt(value) })
    } else if (name === 'category' && value === 'Otros') {
      setShowOtherCategory(true)
    } else if (name==='other-category') {
      setOtherCategory(value)
      setForm({ ...form, category: value })
    } else {
      setForm({ ...form, [name]: value })
    }
  }

  const handleDateChange = (e: any) => {
    setForm({ ...form, date: e })
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
          {catTransactions.map((category) => {
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
          value={form.date}
          onChange={handleDateChange}
          className="bg-white [span:bg-white text-center important]"
        />
      </div>

      <div className="input-group mb-3 mt-3 w-100">
        <label htmlFor="value" className="input-group-text">
          Valor
        </label>
        <input
          type="number"
          value={form.value}
          onChange={handleChange}
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
