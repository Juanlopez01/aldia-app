import { useToggle } from '@hooks/use-toggle'
import { faPencil, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ObjectId } from 'mongodb'
import Modal from '@components/generals/Modal'
import Input from '@components/generals/Input'
import { useAuth } from '@hooks/use-auth'
import { FormEventHandler } from 'react'
import Button from '@components/generals/Button'


interface UserNameParams {
  name: string
  lastname: string
  userId: ObjectId
}

const authConfig = {
  action: 'update',
  success: {
    title: 'Genial!',
    text: 'Haz cambiado tu nombre de usuario',
  },  
  validate: true,
}

export default function UserName({ name, lastname, userId }: UserNameParams) {
  const { toggle, toggleHandler } = useToggle(false)

  const { errors, isLoading, singInAction, inputs, handerInputsChange } =
    useAuth({ ...authConfig, initialState: { name, lastname } })
  const handlerSubmitHandler: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    singInAction({
      ...authConfig,
      inputs,
      update: {
        property: ['name', 'lastname'],
        value: [inputs.name, inputs.lastname],
        id: userId,
      },
      onSuccess:toggleHandler
    })
  }
  return (
    <>
      <div>
        <div className="text-gray-900 dark:text-main-yellow flex items-center w-fit text-md gap-2 hover:last:hidden">
          <FontAwesomeIcon icon={faUser} />
          <span className="">Usuario</span>
          <FontAwesomeIcon
            icon={faPencil}
            className="text-gray-900 dark:text-white hover:cursor-pointer"
            onClick={toggleHandler}
          />
        </div>
        <p
          className={`text-white mt-2 text-md bg-main-green dark:bg-violet-blue-profile outline-0 outline-white py-1 pl-1 border-b-0`}
        >{`${name} ${lastname}`}</p>
        <hr className="border-gray-900 dark:border-main-yellow border-2"></hr>
        
        <Modal
          showModal={toggle}
          title="Cambia tu nombre y/o apellido"
          closeModal={toggleHandler}
        >
          <form onSubmit={handlerSubmitHandler} className="grid gap-4">
            <Input
              name="name"
              label="Nombre"
              value={inputs.name}
              onChange={handerInputsChange}
              type="text"
              error={errors.name}
            />
            <Input
              name="lastname"
              label="Apellido"
              value={inputs.lastname}
              onChange={handerInputsChange}
              type="text"
              error={errors.lastname}
            />
            <Button loading={isLoading}>Actualizar nombre</Button>
          </form>
        </Modal>
      </div>
    </>
  )
}
