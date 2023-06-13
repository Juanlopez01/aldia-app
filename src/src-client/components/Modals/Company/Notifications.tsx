import React, { useState } from 'react'
import Modal from '../../generals/Modal'
import Swal from 'sweetalert2';
import SearchBar from '../../generals/SearchBarWithResults';
import { aceptNotification } from '@/redux/slice/CompanySlice';

const Notifications = ({data, dispatch} : any) => {
  const [show, setShow] = useState(false)
  const closeModal = () => {setShow(false)};
    //HACER TODO EL MODAL Y LA VISUALIZACION DE LAS NOTIFS

  const handleAcept = (user : string) => {
    Swal.fire({
      title: `Aceptar la solicitud de ${user}`,
      text: 'Esta persona ahora podrá ver las transacciones de tu compañía',
      icon: 'warning',
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: 'Aceptar solicitud'
    }).then((result ) => {
      if(result.isConfirmed) {
        dispatch(aceptNotification(user, data._id))
      }
    });
  }



  const list = (
    <>
      {data.notifications.length > 0 && data.notifications.length < 10 &&<ul>
        {data.notifications.map((notification : any) => {
           return <li key={notification.user}><button onClick={() => {handleAcept(notification.user); closeModal()}}>{notification.user}</button></li>
        })}
      </ul>}
      {data.notifications.length >= 10 && <SearchBar data={data.notifications.map((notif : any) => notif.user)} closeModal={closeModal} placeholder='Escribe el correo del usuario' handleAcept={handleAcept} sendNotification={null}/>}
    </>
  )
  return (
    <>
      <button onClick={() => {setShow(true)}}>Notificaciones</button>
      <Modal showModal={show} closeModal={closeModal} title='Notificaciones' footer={<></>} children={list} />
    </>
  )
}

export default Notifications