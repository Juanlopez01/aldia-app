import { GoalsTypes } from '@/models/goal.model'
import { deleteGoal } from '@/redux/slice/PersonalSlice'
import AddGoalForm from '@/src-client/components/goals/AddGoalForm'
import GoalBar from '@/src-client/components/goals/GoalBar'
import ProgressBar from '@/src-client/components/goals/ProgressBar'
import { dateDifference } from '@/utils/dateDiff'
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
    expiresDate: '',
    email: email,
    _id: '',
    priority: 0,
    plazo: 'Corto plazo',
    status: 'Pending'
  })
  const [goalsExpirated, setGoalsExpirated] = useState(0)
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
  
  const goalsCompleted = goals.filter((goal : GoalsTypes) => goal.status === 'Completed')
  const completedGoals = Math.floor((goalsCompleted.length * 100) / goals.length)
  if(session && session.user){
    return(
      <div className='flex flex-col xl:w-3/4 2xl:w-7/12'>
        <ProgressBar completed={completedGoals} />
        <AddGoalForm setForm={setForm} type={formType} form={form} excess={(incomes-expenses)} dispatch={dispatch}/>
        <div>
          <ul className='flex flex-col justify-center w-full gap-y-4'>
            {goals.length > 0 && goals.map((goal : GoalsTypes) =>{
              if(goal.status === 'Pending') dateDifference(goal.expires, setGoalsExpirated, goalsExpirated)
              if(goalsExpirated > 0) {
                Swal.fire({
                  title: 'Tienes metas que vencen pronto!',
                  text: `Tienes ${goalsExpirated} que están por vencer`,
                  showConfirmButton: true,
                  confirmButtonText: 'Entendido',
                  icon: 'warning'                  
                })
              }
              return( 
              <li key={goal._id?.toString()} className='w-full flex justify-center'>
                <GoalBar 
                  title={goal.title}
                  excess={(incomes-expenses)}
                  goalValue={goal.goalValue}
                  priority={goal.priority}
                  plazo={goal.plazo}
                  expires={goal.expires}
                  category={goal.category}
                  status={goal.status}
                  dispatch={dispatch}
                  _id={goal._id}
                  handleDelete={handleDelete}
                  email={email}
                  setFormType={setFormType}
                  setForm={setForm}
                  form={form}
                />
              </li>
              )
            })}
          </ul>
          {formType === 'edit' && <button onClick={() => {setFormType('register');
        setForm({
          title: '',
          category: '',
          goalValue: 0,
          expiresDate: '',
          email: email,
          _id: '',
          priority: 0,
          plazo: 'Corto plazo',
          status: 'Pending'
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