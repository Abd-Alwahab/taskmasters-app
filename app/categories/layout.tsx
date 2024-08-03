import { ReactNode } from 'react'
import AppDeviceProvider from '../_lib/AppDeviceProvider'

function CategoriesLayout({ children }: { children: ReactNode }) {
  return <AppDeviceProvider>{children}</AppDeviceProvider>
}

export default CategoriesLayout
