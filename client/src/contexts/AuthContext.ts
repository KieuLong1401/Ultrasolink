import { cookies } from 'next/headers'
import { createContext, FC, use, useContext, useEffect, useState } from 'react'

interface AuthContextType {
    token: string | null
    setToken: (token: string | null) => void
}

export const AuthContext = createContext<AuthContextType | null>(null)
