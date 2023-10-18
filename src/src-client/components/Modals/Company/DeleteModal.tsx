import { deleteCompany } from '@/redux/slice/CompanySlice'
import React from 'react'
import { useDispatch } from 'react-redux'
import Swal from 'sweetalert2'

const DeleteModal = (props : any) => {
    const dispatch : Function = useDispatch()
    const handleClick = () => {
        Swal.fire({
            title: 'Estas seguro que quieres eliminar esta compañía?',
            text: 'Una vez que aceptes, no se podrá recuperar',
            showCancelButton: true,
            icon: 'warning',
            showConfirmButton: true,
            confirmButtonText: 'Eliminar compañía',
        }).then((result) => {
            Swal.fire({
                title: 'Compañía eliminada con éxito',
                icon: 'success',
                timer: 5000,
            })
            if(result.isConfirmed){
                if(props.user && props.id) dispatch(deleteCompany(props.user, props.id))
            }

        });
    }

  return (
    <div className='pt-2'>
        <button className="bg-[#e9ecef] border-2 border-[#dbddf0] px-3 py-2 rounded-xl" onClick={handleClick}>
            Eliminar compañía
        </button>
    </div>
  )
}

export default DeleteModal