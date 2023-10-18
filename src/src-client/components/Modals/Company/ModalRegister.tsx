import { useSession } from 'next-auth/react';
import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import { createCompany } from '@/redux/slice/CompanySlice';
import Modal from '../../generals/Modal';
import Swal from 'sweetalert2';


const ModalRegister = (props: {classes?: string}) => {
    const dispatch: Function = useDispatch()
    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const { data: session } = useSession()
    const [form, setForm] = useState({
        name: '',
        user: ''
    })

    const sendForm = () => {
        if (session && session.user !== undefined && session.user.email !== undefined && session.user.email) {
            if(form.name !== ''){
                setForm({ ...form, user: session.user.email })
                dispatch(createCompany({ ...form, user: session.user.email }))
                setShow(false)
            } else {
                Swal.fire({
                    title: 'No has elegido un nombre',
                    icon: 'warning',
                    showCloseButton: true,
                })
            }
        }
    }
    const handleChange = (e: any) => {
        setForm({ ...form, name: e.target.value })
    }
    return (
        <div className='mt-4 text-center'>
            <button className={`px-3 py-2 bg-slate-900 ${props?.classes}`} onClick={handleShow}>
                <span className="">Registrar compañia</span>
            </button>
            <Modal 
            showModal={show} 
            closeModal={handleClose} 
            title='Registrar una compañía' 
            footer={<button className='px-4 py-2 bg-[#198754] text-white rounded-md' onClick={sendForm}>Registrar</button>} 
            >
                {<form className='input-group'>
                    <label className='input-group-text'>Nombre</label>
                    <input className='form-control' type="text" name="name" placeholder='Escribe el nombre' onChange={(e) => handleChange(e)} value={form.name} />
                </form>}
            </Modal>
        </div>
    )
}

export default ModalRegister