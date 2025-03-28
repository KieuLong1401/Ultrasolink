import { AuthContext } from '@/contexts/AuthContext'
import { cookies } from 'next/headers'
import React, { FC, useEffect, useState } from 'react'

interface AuthProviderProps {
    children: React.ReactNode
}

const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
    const [token, setToken] = useState<string | null>(null)

    useEffect(() => {
        const token = cookies().get('token')?.toString() || null
        setToken(token)
    }, [])

    return (
        <AuthContext.Provider value={{ token, setToken }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
