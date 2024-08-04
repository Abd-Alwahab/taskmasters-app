'use client'

import {
  cloneElement,
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useEffect,
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

  useEffect(() => {
    const prevOverflow = document.body.style.overflow // Store previous overflow
    const prevPosition = document.body.style.position // Store previous position

    if (openName === name) {
      document.body.style.overflow = 'hidden'
      document.body.style.position = 'fixed' // Prevent body from scrolling
      document.body.style.width = '100%' // Ensure body takes up full viewport width
    }

    return () => {
      document.body.style.overflow = prevOverflow // Restore previous overflow
      document.body.style.position = prevPosition // Restore previous position
      document.body.style.width = '' // Remove the fixed width
    }
  }, [openName, name])

  return (
    openName === name &&
    createPortal(
      <div className="fixed left-0 top-0 z-30 h-screen w-screen animate-modalBounce bg-[rgba(0,0,0,0.5)] opacity-100 backdrop-blur transition-all lg:z-10">
        <div className="absolute left-1/2 top-1/2 size-full -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-4 lg:size-fit">
          <div
            onClick={close}
            className="absolute right-4 top-4 cursor-pointer"
          >
            <IoCloseCircleOutline fontSize={30} />
          </div>

          <div>
            <h3 className="mb-6 max-w-[90%] text-lg font-bold lg:max-w-full">
              {label}
            </h3>
            {cloneElement(children, {
              onCloseModal: () => close(), // Pass the close function to children
            })}
          </div>
        </div>
      </div>,
      document.body,
    )
  )
}

Modal.Open = OpenModal
Modal.Window = ModalWindow

export const useModal = () => useContext(ModalContext)

export default Modal
