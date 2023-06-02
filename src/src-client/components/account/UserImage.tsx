import { useToggle } from '@hooks/use-toggle'
import { faPencil } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import Modal from '@components/generals/Modal'
import {  useState } from 'react'
import { UploadImage } from '@components/generals/UploadImage'


export default function UserImage({ image }: { image: string }) {
  const { toggle, toggleHandler } = useToggle(false)
  const [imageInput, setImageInput] = useState<File | null>(null)
  

  return (
    <>
      <div className="group relative w-36 h-36 md:w-52 md:h-52 z-[100] mt-4 ">
        <Image
          src={image}
          width="144"
          height="144"
          alt="img"
          className={`user-img w-36 h-36 md:w-52 md:h-52 rounded-circle border-4 border-black`}
        />
        <div className="top-0 left-0 w-full h-full absolute flex items-end justify-end ">
          <button onClick={toggleHandler} className="mr-4">
            <FontAwesomeIcon icon={faPencil} className="w-10 h-10 text-white" />
          </button>
        </div>
        <Modal
          showModal={toggle}
          closeModal={toggleHandler}
          title="Cambia tu foto de perfil"
        >
          <form>
            <UploadImage />
          </form>
        </Modal>
      </div>
    </>
  )
}
