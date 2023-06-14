interface ModalProps {
    children: React.ReactNode
    title: string 
    footer?: string | React.ReactNode
    className?: string
    closeModal?: React.MouseEventHandler
    showModal: boolean
}
  
export default function Modal({
  children,
  title,
  footer,
  className,
  closeModal,
  showModal,
}: ModalProps) {
  if (!showModal) return null
  const modalStyles =
    className || 'bg-white w-96  rounded shadow-md shadow-black p-4 text-black'
  return (
    <>
      <section className="w-full h-screen fixed z-[9999999]  backdrop-blur-sm grid place-content-center top-0 left-0">
        <div className={modalStyles}>
          <header className="flex justify-between mb-2">
            <h1 className="text-xl font-semibold m-0">{title}</h1>
            {closeModal && (
              <button onClick={closeModal} className="font-extrabold text-xl ">
                X
              </button>
            )}
          </header>
          {children}
          {footer && (
            <footer className="mt-4">
              {/* <p className="text-sm text-gray-500">{footer}</p> */}
              {footer}
            </footer>
          )}
        </div>
      </section>
    </>
  )
}
  