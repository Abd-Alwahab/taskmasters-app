'use client'

import {
  createContext,
  ReactNode,
  useContext,
  useLayoutEffect,
  useState,
} from 'react'

import { useMediaQuery } from 'react-responsive'

type ContextInterface = {
  isMobile: boolean
  isDesktop: boolean
  isTablet: boolean
}

export const breakPoint = {
  LARGE_2X: '1600px',
  LARGE_1X: '1200px',
  WIDE_DESKTOP: '992px',
  DESKTOP: '768px',
  TABLET: '576px',
  PHONE: '480px',
  SMALL: '400px',
}

const xsQueryWidth = parseInt(breakPoint?.TABLET?.split('px')?.[0], 10) ?? 0

const DeviceContext = createContext<ContextInterface>({
  isMobile: false,
  isDesktop: false,
  isTablet: false,
})

export const useBreakpoint = () => {
  const xxl = useMediaQuery({
    query: `(min-width: ${breakPoint.LARGE_2X})`,
  })
  const xl = useMediaQuery({
    query: `(min-width: ${breakPoint.LARGE_1X})`,
  })
  const lg = useMediaQuery({
    query: `(min-width: ${breakPoint.WIDE_DESKTOP})`,
  })
  const md = useMediaQuery({
    query: `(min-width: ${breakPoint.DESKTOP})`,
  })
  const sm = useMediaQuery({
    query: `(min-width: ${breakPoint.TABLET})`,
  })

  const xs = useMediaQuery({
    query: `(max-width: ${xsQueryWidth - 1}px)`,
  })

  return { xxl, xl, lg, md, sm, xs }
}

const DeviceProvider = ({
  params: { isDesktop, isMobile, isTablet },
  children,
}: {
  params: ContextInterface
  children: ReactNode
}) => {
  const { xs, sm, md, xl } = useBreakpoint()
  const [breakpoints, setBreakpoints] = useState<ContextInterface>({
    isDesktop,
    isTablet,
    isMobile,
  })

  useLayoutEffect(() => {
    setBreakpoints({
      isDesktop: (xl && (!sm || !xs)) ?? isDesktop,
      isTablet: (md && !xl) ?? isTablet,
      isMobile: ((sm || xs) && !xl && !md) ?? isMobile,
    })
  }, [xs, sm, md, xl, isDesktop, isMobile, isTablet])

  return (
    <DeviceContext.Provider
      value={{
        isDesktop: breakpoints.isDesktop,
        isTablet: breakpoints.isTablet,
        isMobile: breakpoints.isMobile,
      }}
    >
      {children}
    </DeviceContext.Provider>
  )
}

const useDevice = () => {
  const context = useContext(DeviceContext)
  if (!context) {
    throw new Error('useDevice must be used within a DeviceProvider')
  }
  return context
}

export { useDevice, DeviceProvider }
