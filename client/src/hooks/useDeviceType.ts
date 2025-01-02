import { useEffect, useState } from 'react'

const useDeviceType = (): string => {
    const [deviceType, setDeviceType] = useState('desktop')

    useEffect(() => {
        const checkDeviceType = () => {
            if (window.matchMedia('(max-width: 767px)').matches) {
                setDeviceType('mobile')
            } else if (window.matchMedia('(max-width: 1024px)').matches) {
                setDeviceType('tablet')
            } else {
                setDeviceType('desktop')
            }
        }

        checkDeviceType()
        window.addEventListener('resize', checkDeviceType)

        return () => {
            window.removeEventListener('resize', checkDeviceType)
        }
    }, [])

    return deviceType
}

export default useDeviceType
