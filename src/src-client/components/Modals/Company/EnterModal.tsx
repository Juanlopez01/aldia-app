import React, {useState} from 'react'
import Modal from '../../generals/Modal';

const EnterModal = () => {
    const [showModal, setShowModal] = useState(false);
    const [filter, setFilter] = useState('');
    const closeModal = () => {
        setShowModal(false);
    }

    const handleChange = (e : any) => {
        setFilter(e.target.value)
    };


    const modalContent = (
        <>
            <label>Buscar</label>
            <input type='text' placeholder='Escribe el nombre de la compañía' value={filter} onChange={handleChange}/>
            
        </>
    )

  return (
    <div>
        <button onClick={() => setShowModal(true)}>Ingresar a una compañía</button>
        <Modal title='Ingresar a una compañía' footer='footer' showModal={showModal} closeModal={closeModal} children={modalContent}  />
    </div>
  )
}

export default EnterModal