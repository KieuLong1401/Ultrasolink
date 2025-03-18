'use client'

import CheckBox from '@/components/Atoms/CheckBox/CheckBox'

import { useEffect, useState } from 'react'

const RememberMeCheckBox: React.FC = () => {
    const [rememberMe, setRememberMe] = useState(false)

    useEffect(() => {
        const rememberMe = localStorage.getItem('rememberMe')
        if (rememberMe == 'true') {
            setRememberMe(true)
        }
    }, [])

    const handleChange = () => {
        setRememberMe(!rememberMe)
        localStorage.setItem('rememberMe', rememberMe.toString())
    }

    return (
        <CheckBox
            label="Remember me"
            checked={rememberMe}
            onChange={handleChange}
        />
    )
}

export default RememberMeCheckBox
