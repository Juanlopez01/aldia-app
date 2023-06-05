import { addPersonalExpense, updateGoal } from '@/redux/slice/PersonalSlice'
import React from 'react'
import Swal from 'sweetalert2';

interface GoalBarTypes {
    title: String, 
    goalValue: Number,
    excess: Number,
    status: String,
    priority: Number,
    plazo: String,
    expires: String,
    category: String,
    dispatch: Function,
    _id: String | undefined,
    handleDelete: Function,
    email: String;
}

const GoalBar = ({title, goalValue, excess, status, priority, plazo, expires, category, dispatch, _id, handleDelete, email} : GoalBarTypes) => {
  const porcentaje = (excess.valueOf() * 100) / goalValue.valueOf();
  return (
    <div className='bg-[var(--bs-Blue)] p-4'>
        <span>{title}</span>
        {status==='Pending' && <>
        <span>{`${excess}/${goalValue}`}</span>
        <span>{expires}</span>
        <span>{plazo}</span>
        </>}
        <span>{category}</span>
        <span>{porcentaje > 100 ? `100%` : `${porcentaje}%`}</span>
        {status === 'Pending' && <button onClick={() => handleDelete(_id)}>Delete</button>}
        {status === 'Pending' && excess >= goalValue && <button onClick={() => {
          Swal.fire({
            title: 'Estas Seguro?',
            text:'Presiona aceptar si has completado esta meta, luego no podras deshacer este cambio',
            showConfirmButton: true, 
            showCancelButton: true ,
            confirmButtonText: 'He completado esta meta',
            cancelButtonText:'Cancelar',
            icon: 'warning'
          }).then((result) => {
            if(result.isConfirmed){
              dispatch(updateGoal({status:'Completed', goalValue, _id,}))
              dispatch(addPersonalExpense({type: 'personales', value: goalValue, description: title, category: 'Metas'}, email))
            } else {

            }
          })
          }}>Completado</button>}
        {/* {status === 'Completed' && <button onClick={() => dispatch(updateGoal({status:'Pending', goalValue, _id,}))}>No completado</button>} */}
    </div>
  )
}

export default GoalBar