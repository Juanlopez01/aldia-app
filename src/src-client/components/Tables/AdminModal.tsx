import { UserWithId } from "@/models/user.model"
import { useToggle } from "@/src-client/hooks/use-toggle"
import Modal from "@components/generals/Modal"
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image from "next/image"
import { ReactNode } from "react"

type Props = {
  user: UserWithId
}

export default function AdminModal({ user }: Props) {
  const { toggle, toggleHandler } = useToggle(false)
  return (
    <>
      <button onClick={toggleHandler}>
        <FontAwesomeIcon icon={faCircleInfo} />
      </button>
      <Modal
        title={`Detalles de ${user.name}`}
        showModal={toggle}
        closeModal={toggleHandler}
      >
        <header className="flex flex-row w-full gap-2">
        <Image src={user.image} alt='imagen del usuario' width='40' height='40' className='rounded-full' />
        <div className="flex flex-col gap-1">
          <h3 className="m-0 text-black font-bold text-lg">{user.fullName}</h3>
          <h4 className="m-0 text-gray-700 text-xs">{user.email}</h4>
        </div>
        </header>
        <section>
          <span>id:{user._id as unknown as ReactNode}</span>
        </section>
      </Modal>
    </>
  )
}





      {/* <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Detalles {props.type === 'negocio' ? 'del negocio' : 'del usuario'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h3>Incomes</h3>
        <ul>
            {props.type === 'negocio' &&  companyDetail.incomes.map((ele : any) => {
                return(
                  <li key={ele._id}>
                  <div>
                    {ele.category}
                  </div>
                  <div>
                    <p>{ele.value}</p>
                    <ModalEdit props={{
                      category: ele.category,
                      value: ele.value,
                      description: ele.description,
                      type: props.type,
                      id: ele._id,
                      table: 'admin incomes',
                    }}/>
                  </div>
                </li>
                )
            })}
            {props.type === 'usuarios' &&  userDetail.incomes.map((ele : any) => {
                return(
                  <li key={ele._id}>
                  <div>
                    {ele.category}
                  </div>
                  <div>
                    <p>{ele.value}</p>
                    <ModalEdit props={{
                      category: ele.category,
                      value: ele.value,
                      description: ele.description,
                      type: props.type,
                      id: ele._id,
                      table: 'admin incomes',
                    }}/>
                  </div>
                </li>
                )
            })}
        </ul>
        <h3>Expenses</h3>
        <ul>
            {props.type === 'negocio' &&  companyDetail.expenses.map((ele : any) => {
                return(
                  <li key={ele._id}>
                    <div>
                      {ele.category}
                    </div>
                    <div>
                      <p>{ele.value}</p>
                      <ModalEdit props={{
                      category: ele.category,
                      value: ele.value,
                      description: ele.description,
                      type: props.type,
                      id: ele._id,
                      table: 'admin expenses',
                    }}/>
                    </div>
                  </li>
                )
            })}
            {props.type === 'usuarios' &&  userDetail.expenses.map((ele : any) => {
                return(
                  <li key={ele._id}>
                  <div>
                    {ele.category}
                  </div>
                  <div>
                    <p>{ele.value}</p>
                    <ModalEdit props={{
                      category: ele.category,
                      value: ele.value,
                      description: ele.description,
                      type: props.type,
                      id: ele._id,
                      table: 'admin expenses',
                    }}/>
                  </div>
                </li>
                )
            })}
        </ul>
        {props.type === 'negocio' && <>
        <h3>Usuarios</h3>
        <ul>
            {companyDetail.users.map((ele : any) => {
                return(
                    <li key={`${ele.name}1`}>{ele.name}</li>
                )
            })}
        </ul>
        </>}
        {props.type === 'usuarios' && <>
        <h3>Companias</h3>
        <ul>
            {userDetail.company.map((ele : any) => {
                return(
                    <li key={`${ele.name}2`}>{ele.name}</li>
                )
            })}
        </ul>
        </>}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => {props.setShow(false)}}>Close</Button>
      </Modal.Footer> */}