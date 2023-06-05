import React from 'react'
import { categories, expiresValues } from '@/utils/categoriesGoals'
import Swal from 'sweetalert2'
import { createGoal, updateGoal } from '@/redux/slice/PersonalSlice'

const AddGoalForm = ({setForm, type, form, excess, dispatch}: any) => {
  const handleChange = (e : any) => {
    setForm({...form, [e.target.id]: e.target.value})
  }
  const handleSubmit = (e : any) => {
    console.log(excess)
    e.preventDefault()
      if(form.currentValue <= form.goalValue){
        if(form.currentValue > excess){
        Swal.fire(
          'Cuidado!', 'El monto indicado supera tus excedentes!', 'warning'
        )
      }
      if(type === 'register'){ 
        dispatch(createGoal(form))
        setForm({...form,
          title: '',
          category: '',
          goalValue: 0,
          currentValue: 0,
          expiresDate: '',
          _id: '',
        })
      }
      if(type === 'edit') {
        if(form.currentValue === form.goalValue) Swal.fire('Felicitaciones!', 'Has completado correctamente tu meta!', 'success');
        dispatch(updateGoal({currentValue: form.currentValue,_id: form._id}))
      }
    } else {
      Swal.fire('Cuidado!', 'Has sobrepasado el monto de tu meta', 'error')
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
            <input type='number' id='currentValue' placeholder='Selecciona el monto para tu meta' onChange={handleChange} value={form.currentValue}/>
            <select id='expiresDate' onChange={handleChange} required value={form.expiresValue} defaultValue={'Una semana'}>
              {expiresValues.map((expires) => {
                return <option value={expires} key={expires}>{expires}</option>
              })}
            </select>
            </>}
            {type === 'edit' && 
            <>
            <input type='number' id='currentValue' placeholder='Selecciona el monto para tu meta' onChange={handleChange} value={form.currentValue}/>
            </>}
            <button type='submit'>{type === 'register' ? 'Crear nueva meta': 'Editar meta'}</button>
         </form>
    </div>
  )
}

export default AddGoalForm