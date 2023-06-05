import { GoalsTypes } from '@/models/goal.model'
import { deleteGoal } from '@/redux/slice/PersonalSlice'
import AddGoalForm from '@/src-client/components/goals/AddGoalForm'
import ProgressBar from '@/src-client/components/goals/ProgressBar'
import { useSession } from 'next-auth/react'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'

const Index = () => {
  const {data: session} = useSession()
  const email = useSelector((state : any) => state.PersonalReducer.user.email)
  const dispatch : Function = useDispatch()
  const [form, setForm] = useState({
    title: '',
    category: '',
    goalValue: 0,
    currentValue: 0,
    expiresDate: '',
    email: email,
    _id: '',
  })
  const incomes = useSelector((state : any) => state.PersonalReducer.totalIncomes)
  const expenses = useSelector((state : any) => state.PersonalReducer.totalExpenses)
  const [formType, setFormType] = useState('register')
  const goals = useSelector((state : any) => state.PersonalReducer.goals)
  
  const handleDelete = (_id : any) => {
    Swal.fire({
      title: "Estas seguro de que quieres eliminar esta meta?",
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: 'Eliminar meta',
      cancelButtonText: 'Cancelar',
      icon: 'warning'
    }).then((result) => {
      if(result.isConfirmed){
      dispatch(deleteGoal({_id}))
      }
    })
  }
  
  
  
  if(session && session.user){
    return(
      <div className='flex flex-col w-3/4'>
        <AddGoalForm setForm={setForm} type={formType} form={form} excess={(incomes-expenses)} dispatch={dispatch}/>
        <div>
          <ul>
            {goals.length > 0 && goals.map((goal : GoalsTypes) =>{
              const completed = goal.currentValue.valueOf() > 0 ? (goal.currentValue.valueOf() * 100) / goal.goalValue.valueOf() : 0
              return( 
              <li key={goal._id?.toString()}><span>{`${goal.title} ---- ${completed} % --- vto: ${goal.expires}`}</span>
                <ProgressBar completed={completed} />
                {goal.currentValue !== goal.goalValue && <button onClick={() => {
                  setForm({...form, _id: goal._id, currentValue: goal.currentValue, goalValue: goal.goalValue})
                  setFormType('edit')
                }}>Edit</button>}
                <button onClick={() => handleDelete(goal._id)}>Eliminar meta</button>
              </li>
              )
            })}
          </ul>
          {formType === 'edit' && <button onClick={() => {setFormType('register');
        setForm({
          title: '',
          category: '',
          goalValue: 0,
          currentValue: 0,
          expiresDate: '',
          email: email,
          _id: '',
        })}}>Register</button>}
        </div>
      </div>
    )
  } else {
    return (
      <h2> No iniciaste sesion</h2>
    )
  }
}

export default Index