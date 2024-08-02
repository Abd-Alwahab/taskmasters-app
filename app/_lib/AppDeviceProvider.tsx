import { ReactNode } from 'react'
import { DeviceProvider } from '../context/device'
import * as Device from 'react-device-detect'
import { headers } from 'next/headers'
import { userAgent } from 'next/server'

function AppDeviceProvider({ children }: { children: ReactNode }) {
  const userAgentDetails = userAgent({ headers: headers() })

  return (
    <DeviceProvider
      params={{
        isDesktop: Device.deviceDetect(userAgentDetails.ua).isBrowser ?? false,
        isMobile: Device.deviceDetect(userAgentDetails.ua).isMobile ?? false,
        isTablet: Device.deviceDetect(userAgentDetails.ua).isTablet ?? false,
      }}
    >
      {children}
    </DeviceProvider>
  )
}

export default AppDeviceProvider
