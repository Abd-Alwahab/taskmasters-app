'use client'

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  RefObject,
  MouseEvent,
  useRef,
} from 'react'
import { HiEllipsisVertical } from 'react-icons/hi2'
import { useClickOutside } from '../_hooks/useClickOutside'

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

export function Toggle({ id }: ToggleProps) {
  const { open, openId, close, setPosition } = useContext(MenusContext)
  const buttonRef = useRef<HTMLButtonElement>(null)

  function handleClick(e: MouseEvent<HTMLButtonElement>) {
    e.stopPropagation()

    const buttonRect = buttonRef.current?.getBoundingClientRect()

    if (buttonRect) {
      setPosition({
        x: -70,
        y: buttonRect.height,
      })
    }

    openId === '' || openId !== id ? open(id) : close()
  }

  return (
    <button
      ref={buttonRef}
      aria-label="open menu"
      onClick={handleClick}
      className="translate-x-3 rounded-sm border-none bg-transparent p-1 transition-all duration-200"
    >
      <HiEllipsisVertical className="size-6 text-gray-700" />
    </button>
  )
}

interface ListProps {
  children: ReactNode
  id: string
}

export function List({ children, id }: ListProps) {
  const { position, openId, close } = useContext(MenusContext)
  const { ref } = useClickOutside(close)

  if (openId !== id) return null
  return (
    <ul
      ref={ref as RefObject<HTMLUListElement>}
      className={`absolute z-10 animate-modalBounce rounded-md bg-gray-100 opacity-100 shadow-md transition-all`}
      style={{
        top: `${position.y}px`,
        left: `${position.x}px`,
      }}
    >
      {children}
    </ul>
  )
}

interface ButtonProps {
  children: ReactNode
  icon: ReactNode
  onClick?: () => void
  disabled?: boolean
  ariaLabel?: string
}

export function Button({
  children,
  icon,
  onClick,
  disabled,
  ariaLabel,
}: ButtonProps) {
  const { close } = useContext(MenusContext)
  function handleClick() {
    onClick?.()
    close()
  }
  return (
    <li>
      <button
        aria-label={ariaLabel}
        onClick={handleClick}
        disabled={disabled}
        className="flex w-full items-center gap-4 border-none bg-transparent p-3 text-left text-base transition-all duration-200 hover:bg-gray-50"
      >
        {icon} <span>{children}</span>
      </button>
    </li>
  )
}

export const Menu = ({ children }: { children: ReactNode }) => {
  return (
    <div className="relative flex items-center justify-center">{children}</div>
  )
}

Menus.Menu = Menu
Menus.Toggle = Toggle
Menus.List = List
Menus.Button = Button

export default Menus
