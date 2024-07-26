'use client'

import {
  cloneElement,
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useState,
} from 'react'
import { createPortal } from 'react-dom'
import { IoCloseCircleOutline } from 'react-icons/io5'

type Context = {
  openName: string
  close: () => void
  open: (name: string) => void
}

const ModalContext = createContext<Context>({
  openName: '',
  close: () => {},
  open: () => {},
})

const Modal = ({ children }: { children: ReactNode }) => {
  const [openName, setOpenName] = useState('')
  const close = () => setOpenName('')
  const open = setOpenName

  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  )
}

export const OpenModal = ({
  name,
  children,
}: {
  name: string
  children: ReactElement
}) => {
  const { open } = useContext(ModalContext)

  return cloneElement(children, { onClick: () => open(name) })
}

export const ModalWindow = ({
  name,
  children,
  label,
}: {
  name: string
  children: ReactElement
  label: ReactNode
}) => {
  const { openName, close } = useContext(ModalContext)
  const isOpen = openName === name

  return createPortal(
    <div
      className={`fixed left-0 top-0 z-10 h-screen w-screen  bg-[rgba(0,0,0,0.5)] backdrop-blur transition-all ${isOpen ? 'visible opacity-100' : 'invisible opacity-0'}`}
    >
      <div className="absolute left-1/2 top-1/2 size-fit -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-4">
        <div onClick={close} className="absolute right-4 top-4 cursor-pointer">
          <IoCloseCircleOutline fontSize={30} />
        </div>

        <div>
          <h3 className="mb-6 text-lg font-bold">{label}</h3>

          {cloneElement(children, { onCloseModal: close })}
        </div>
      </div>
    </div>,
    document.body,
  )
}

Modal.Open = OpenModal
Modal.Window = ModalWindow

export default Modal
