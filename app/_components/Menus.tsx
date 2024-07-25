import {
  createContext,
  useContext,
  useState,
  ReactNode,
  RefObject,
  MouseEvent,
} from 'react'
import { createPortal } from 'react-dom'
import { HiEllipsisVertical } from 'react-icons/hi2'
import { useClickOutside } from '../hooks/useClickOutside'

interface MenusContextType {
  openId: string
  open: (id: string) => void
  close: () => void
  position: { x: number; y: number }
  setPosition: (position: { x: number; y: number }) => void
}

const MenusContext = createContext<MenusContextType>({
  openId: '',
  open: () => {},
  close: () => {},
  position: { x: 0, y: 0 },
  setPosition: () => {},
})

interface MenusProps {
  children: ReactNode
}

function Menus({ children }: MenusProps) {
  const [openId, setOpenId] = useState('')
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const close = () => setOpenId('')

  const open = setOpenId

  return (
    <MenusContext.Provider
      value={{
        openId,
        open,
        close,
        position,
        setPosition,
      }}
    >
      {children}
    </MenusContext.Provider>
  )
}

interface ToggleProps {
  id: string
}

function Toggle({ id }: ToggleProps) {
  const { open, openId, close, setPosition } = useContext(MenusContext)

  function handleClick(e: MouseEvent<HTMLButtonElement>) {
    e.stopPropagation()

    setPosition({
      x: e.currentTarget.getBoundingClientRect().left,
      y: e.currentTarget.getBoundingClientRect().top + 30,
    })

    openId === '' || openId !== id ? open(id) : close()
  }

  return (
    <button
      onClick={handleClick}
      className="translate-x-3 rounded-sm border-none bg-transparent p-1 transition-all duration-200 hover:bg-gray-100"
    >
      <HiEllipsisVertical className="size-6 text-gray-700" />
    </button>
  )
}

interface ListProps {
  children: ReactNode
  id: string
}

function List({ children, id }: ListProps) {
  const { position, openId, close } = useContext(MenusContext)
  const { ref } = useClickOutside(close)

  if (openId !== id) return null
  return createPortal(
    <ul
      ref={ref as RefObject<HTMLUListElement>}
      className="fixed rounded-md bg-gray-100 shadow-md"
      style={{
        top: `${position.y}px`,
        left: `${position.x}px`,
      }}
    >
      {children}
    </ul>,
    document.body,
  )
}

interface ButtonProps {
  children: ReactNode
  icon: ReactNode
  onClick?: () => void
  disabled?: boolean
}

function Button({ children, icon, onClick, disabled }: ButtonProps) {
  const { close } = useContext(MenusContext)
  function handleClick() {
    onClick?.()
    close()
  }
  return (
    <li>
      <button
        onClick={handleClick}
        disabled={disabled}
        className="flex w-full items-center gap-4 border-none bg-transparent p-3 text-left text-base transition-all duration-200 hover:bg-gray-50"
      >
        {icon} <span>{children}</span>
      </button>
    </li>
  )
}

const Menu = ({ children }: { children: ReactNode }) => {
  return <div className="flex items-center justify-center">{children}</div>
}

Menus.Menu = Menu
Menus.Toggle = Toggle
Menus.List = List
Menus.Button = Button

export default Menus
