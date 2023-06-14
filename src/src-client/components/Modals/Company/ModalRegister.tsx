import { useSession } from 'next-auth/react';
import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import { createCompany } from '@/redux/slice/CompanySlice';
import { Formik, Field, Form, FormikHelpers } from 'formik';
import Modal from '../../generals/Modal';


const ModalRegister = () => {
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
            setForm({ ...form, user: session.user.email })
            dispatch(createCompany({ ...form, user: session.user.email }))
            setShow(false)
        }
    }
    const handleChange = (e: any) => {
        setForm({ ...form, name: e.target.value })
    }
    return (
        <div className='mt-5 text-center'>
            <button className='btn-general w-25' onClick={handleShow}>
                <span className="text-light">Registrar una compañia</span>
            </button>
            <Modal 
            showModal={show} 
            closeModal={handleClose} 
            title='Registrar una compañía' 
            footer={<button onClick={sendForm}>Registrar</button>} 
            children={<form>
                        <label>Nombre</label>
                        <input type="text" name="name" placeholder='Escribe el nombre' onChange={(e) => handleChange(e)} value={form.name} />
                    </form>}
             
            />
        </div>
    )
}

export default ModalRegister