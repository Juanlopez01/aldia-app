import { GoalsTypes } from '@/models/goal.model'
import AddGoalForm from '@/src-client/components/goals/AddGoalForm'
import ProgressBar from '@/src-client/components/goals/ProgressBar'
import { useSession } from 'next-auth/react'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

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
  console.log(incomes, expenses)
  if(session && session.user){
    return(
      <div className='flex flex-col'>
        <AddGoalForm setForm={setForm} type={formType} form={form} excess={incomes-expenses} dispatch={dispatch}/>
        <div>
          <ul>
            {goals.length > 0 && goals.map((goal : GoalsTypes) =>{
              const completed = goal.currentValue.valueOf() > 0 ? (goal.currentValue.valueOf() * 100) / goal.goalValue.valueOf() : 0
              return( 
              <li key={goal._id?.toString()}><span>{`${goal.title} ${completed} %`}</span>
                <ProgressBar completed={completed} />
                <button onClick={() => {
                  setForm({...form, _id: goal._id, currentValue: goal.currentValue, goalValue: goal.goalValue})
                  setFormType('edit')
                }}>Edit</button>
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