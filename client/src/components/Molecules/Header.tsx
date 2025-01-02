'use client'

import useDeviceType from '@/hooks/useDeviceType'
import { DesktopHeader } from './DesktopHeader/DesktopHeader'
import { MobileHeader } from './MobileHeader/MobileHeader'

const Header = () => {
    const device = useDeviceType()

    return <>{device == 'mobile' ? <MobileHeader /> : <DesktopHeader />}</>
}

export default Header
