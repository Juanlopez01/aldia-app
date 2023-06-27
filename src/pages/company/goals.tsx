import { GoalsTypes } from '@/models/goal.model'
import { deleteGoal } from '@/redux/slice/PersonalSlice'
import Modal from '@/src-client/components/generals/Modal'
import AddGoalForm from '@/src-client/components/goals/AddGoalForm'
import GoalBar from '@/src-client/components/goals/GoalBar'
import LayoutWithSideNav from '@/src-client/components/layouts/LayoutSideNav'
import { useValidatePlan } from '@/src-client/hooks/use-validate-plan'
import { dateDifference } from '@/utils/dateDiff'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import { faPlus, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from 'next/router'
import { deleteCompanyGoal } from '@/redux/slice/CompanySlice'

const Index = () => {
    const router = useRouter()
  const { session } = useValidatePlan()
  const id = useSelector((state: any) => state.CompanyReducer.selectedCompany._id)
  const dispatch: Function = useDispatch()
  const [form, setForm] = useState({
    title: '',
    category: 'Hogar',
    goalValue: 0,
    expiresDate: 'Una semana',
    email: id,
    _id: '',
    priority: 0,
    plazo: 'Corto plazo',
    status: 'Pending',
  })
  const [goalsExpirated, setGoalsExpirated] = useState(0)
  const incomes = useSelector(
    (state: any) => state.CompanyReducer.totalIncomes
  )
  const expenses = useSelector(
    (state: any) => state.CompanyReducer.totalExpenses
  )
  const [formType, setFormType] = useState('register')
  const goals = useSelector((state: any) => state.CompanyReducer.goals)
  const [show, setShow] = useState(false)
  const handleClose = () => {setShow(false)}

  const handleDelete = (_id: any) => {
    Swal.fire({
      title: 'Estas seguro de que quieres eliminar esta meta?',
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: 'Eliminar meta',
      cancelButtonText: 'Cancelar',
      icon: 'warning',
    }).then((result) => {
      if (result.isConfirmed) {
        if(router.pathname === '/company/goals') {
            dispatch(deleteCompanyGoal({ _id }))
        } else {
            dispatch(deleteGoal({ _id }))
        }
      }
    })
  }

//   const goalsCompleted = goals?.filter(
//     (goal: GoalsTypes) => goal.status === 'Completed'
//   )
//   const completedGoals = Math.floor(
//     (goalsCompleted?.length * 100) / goals.length
//   )
  if (session && session.user) {
    return (
      <LayoutWithSideNav>
        <div className="bg-light-green dark:bg-violet-blue-profile w-full min-h-[70vh] flex">
          <div className="flex flex-col w-full xl:w-3/4 2xl:w-9/12 mx-auto py-2 h-full">
            {/* <ProgressBar completed={completedGoals} /> */}
            <Modal showModal={show} closeModal={handleClose} title={formType === 'register' ? 'Agregar meta' : 'Editar meta'} >
              <AddGoalForm
                setForm={setForm}
                type={formType}
                form={form}
                excess={incomes - expenses}
                dispatch={dispatch}
                setShow={setShow}
              />
            </Modal>
            <div className="flex justify-center py-4">
              <button
                type="submit"
                className="w-[220px] text-white px-3 py-2 bg-main-green dark:bg-darkest-blue text-lg
                rounded-full flex justify-center items-center gap-x-2"
                onClick={() => {setFormType('register');setForm({
                  title: '',
                  category: '',
                  goalValue: 0,
                  expiresDate: '',
                  email: id.toString(),
                  _id: '',
                  priority: 0,
                  plazo: 'Corto plazo',
                  status: 'Pending',
                });setShow(true)}}
              >
                {
                <>
                  <FontAwesomeIcon icon={faPlus} className="text-white border-2 border-white rounded-full p-1"/>
                  <span>AGREGAR META</span>
                </>}
              </button>
				    </div>
            <div className="w-full">
              <ul className="flex flex-col justify-center w-full gap-y-4">
                {goals && goals.length > 0 &&
                  goals.map((goal: GoalsTypes) => {
                    if (goal.status === 'Pending')
                      dateDifference(
                        goal.expires,
                        setGoalsExpirated,
                        goalsExpirated
                      )
                    if (goalsExpirated > 0) {
                      Swal.fire({
                        title: 'Tienes metas que vencen pronto!',
                        text: `Tienes ${goalsExpirated} que están por vencer`,
                        showConfirmButton: true,
                        confirmButtonText: 'Entendido',
                        icon: 'warning',
                      })
                    }
                    return (
                      <li
                        key={goal._id?.toString()}
                        className="w-full flex justify-center items-center"
                      >
                        <GoalBar
                          title={goal.title}
                          excess={incomes - expenses}
                          goalValue={goal.goalValue}
                          priority={goal.priority}
                          plazo={goal.plazo}
                          expires={goal.expires}
                          category={goal.category}
                          status={goal.status}
                          dispatch={dispatch}
                          _id={goal._id}
                          handleDelete={handleDelete}
                          email={id}
                          setFormType={setFormType}
                          setForm={setForm}
                          form={form}
                          setShow={setShow}
                        />
                      </li>
                    )
                  })}
              </ul>
            </div>
          </div>
        </div>
      </LayoutWithSideNav>
    )
  } else {
    return <h2> No iniciaste sesion</h2>
  }
}

export default Index
