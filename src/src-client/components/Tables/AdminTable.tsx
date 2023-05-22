import { CompanType } from '@/models/company.model'
import { UserType } from '@/models/user.model'
import React, { useState } from 'react'
import AdminModal from './AdminModal'
import { useDispatch, useSelector } from 'react-redux'
import { getDetails, updateUserStatus } from '@/redux/slice/AdminSlice'
import Swal from 'sweetalert2'

interface List {
  list: CompanType[] | UserType[] | [],
  type: string
}

const AdminTable = ({ list, type }: List) => {
  const dispatch: Function = useDispatch()

  const [show, setShow] = useState(false)

  const showHandler = async (id: string) => {
    await dispatch(getDetails(type, id))
    setShow(true)
  }

  const deleteHandler = async (status: string, id: string) => {

    Swal.fire({
      title: 'Estas seguro?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: `${status === 'disabled' ? 'Habilitar' : 'Deshabilitar'} usuario`,
    }).then((result) => {
      if (result.isConfirmed) {
        status === 'disabled'
          ? dispatch(updateUserStatus('enabled', id))
          : dispatch(updateUserStatus('disabled', id))
      }
    })
  }

  return (
    <div className='' style={{ height: "90vh" }}>
      {!list && <span className='loader'></span>}
      <div className=' d-flex flex-row flex-wrap gap-3 mt-5'>
        {list[0] && list.map((ele: any) => {
          return (
            <>
              <div className='card containerCuentas'>
                <div className=' card-header text-center'>
                  {ele.name}
                </div>
                <div className='d-flex card-footer gap-3 justify-content-center'>
                  <button
                    onClick={() => showHandler(ele._id)}
                    className="btn-general">
                    <span className="text-light">Abrir detalles</span>
                  </button>
                  {
                    type === 'usuarios' && <button
                      onClick={() => deleteHandler(ele.status, ele._id)}
                      className="btn-general">
                      <span className='text-light'>
                        {
                          ele.status === 'disabled' ? 'Habilitar' : 'Deshabilitar'
                        }
                      </span>

                    </button>
                  }
                </div>
              </div>
            </>
          )
        })}
      </div>
      {
        show && <AdminModal props={{ show, setShow, type, }} />
      }
    </div>
  )
}

export default AdminTable

{/* <ul className='list-unstyled d-flex flex-row gap-4 flex-wrap'> */ }
{/* <li key={ele._id} className="flex-row">
        <div>
           {ele.name}
         </div>
        <div>
      <button onClick={() => showHandler(ele._id)}>Abrir detalles</button>
    {type === 'usuarios' && <button onClick={() => deleteHandler(ele.status, ele._id)}>{ele.status === 'disabled' ? 'Habilitar' : 'Deshabilitar'}</button>}
  </div>
 </li> */}
{/* </ul> */ }