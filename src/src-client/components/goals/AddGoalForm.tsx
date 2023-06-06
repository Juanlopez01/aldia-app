import React from 'react'
import { categories, shortExpiresValues, longExpiresValues } from '@/utils/categoriesGoals'
import Swal from 'sweetalert2'
import { createGoal, updateGoal } from '@/redux/slice/PersonalSlice'

const AddGoalForm = ({setForm, type, form, excess, dispatch}: any) => {
  
  
  
  const handleChange = (e : any) => {
    setForm({...form, [e.target.id]: e.target.value})
  }

  const handleSubmit = (e : any) => {
    e.preventDefault()
      if(type === 'register'){ 
        dispatch(createGoal(form))
        setForm({...form,
          title: '',
          category: '',
          goalValue: 0,
          expiresDate: '',
          _id: '',
          priority: 1,
          plazo: 'Corto plazo',
          status: 'Pending'
        })
      }
      if(type === 'edit') {
        dispatch(updateGoal({status: form.status, goalValue: form.goalValue,_id: form._id}))
      }
  }
  return (
    <div>
         <form className='flex flex-col' onSubmit={handleSubmit}>
            {type === 'register' && 
            <>
            <input type='text' id='title' placeholder='Escribe un titulo' value={form.title} onChange={handleChange} required/>
            <select id='category' onChange={handleChange} value={form.category} defaultValue={'Otros'} required>
              <option value={'Otros'} key={'Otros'}>Otros</option>
              {categories.map((category) => {
                return <option value={category} key={category}>{category}</option>
              })}
            </select>
            <input type='number' id='goalValue' placeholder='Selecciona el monto de tu meta' onChange={handleChange} value={form.goalValue} required/>
            <select id='plazo' defaultValue={'Corto plazo'} onChange={handleChange} value={form.plazo}>
              <option key={'Cortoplazo'} value='Corto plazo'>Corto plazo</option>
              <option key={'Largoplazo'} value='Largo plazo'>Largo plazo</option>
            </select>
            {form.plazo==='Corto plazo' &&
            <select id='expiresDate' onChange={handleChange} required value={form.expiresValue} defaultValue={'Una semana'}>
              {shortExpiresValues.map((expires) => {
                return <option value={expires} key={expires}>{expires}</option>
              })}
            </select>}
            {form.plazo==='Largo plazo' && 
            <select id='expiresDate' onChange={handleChange} required value={form.expiresValue} defaultValue={'Dos años'}>
              {longExpiresValues.map((expires) => {
                return <option value={expires} key={expires}>{expires}</option>
              })}
            </select>}
            <select id='priority' required defaultValue={1} value={form.priority} onChange={handleChange}>
              <option key='1' value={1}>Alta</option>
              <option key='2' value={2}>Media</option>
              <option key='3' value={3}>Baja</option>
              </select>            
            </>}
            {type === 'edit' && 
            <>
            <input type='number' id='goalValue' placeholder='Selecciona el monto de tu meta' onChange={handleChange} value={form.goalValue} required/>
            {/* {form.plazo==='Corto plazo' &&
            <select id='expiresDate' onChange={handleChange} required value={form.expiresValue} defaultValue={'Una semana'}>
              {shortExpiresValues.map((expires) => {
                return <option value={expires} key={expires}>{expires}</option>
              })}
            </select>}
            {form.plazo==='Largo plazo' && 
            <select id='expiresDate' onChange={handleChange} required value={form.expiresValue} defaultValue={'Una semana'}>
              {longExpiresValues.map((expires) => {
                return <option value={expires} key={expires}>{expires}</option>
              })}
            </select>}
            <select id='priority' required defaultValue={1} value={form.priority} onChange={handleChange}>
              <option key='1' value={1}>Alta</option>
              <option key='2' value={2}>Media</option>
              <option key='3' value={3}>Baja</option>
              </select>        */}
            </>}
            <button type='submit'>{type === 'register' ? 'Crear nueva meta': 'Editar meta'}</button>
         </form>
    </div>
  )
}

export default AddGoalForm