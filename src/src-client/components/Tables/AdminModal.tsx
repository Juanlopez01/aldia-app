import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useSelector } from 'react-redux';
import { ModalEdit } from '../Modals/ModalEditRegister';


const AdminModal = ({props}: any) => {
    const companyDetail = useSelector((state : any) => state.AdminSlice.selectedCompany)
    const userDetail = useSelector((state : any) => state.AdminSlice.selectedUser)


  return (
    <Modal
        show={props.show}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
    >
      <Modal.Header>
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
      </Modal.Footer>
    </Modal>
  )
}

export default AdminModal