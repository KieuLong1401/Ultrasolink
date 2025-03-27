'use server'

import axiosInstance from '@/utils/axiosInstance'
import { cookies } from 'next/headers'
import { z } from 'zod'

const authSchema = z.object({
    email: z.string().email({ message: 'Invalid email' }),
    password: z
        .string()
        .trim()
        .min(6, { message: 'Password must be at least 6 characters long' }),
})

export const signUp = async (prevState: any, formData: FormData) => {
    var data = Object.fromEntries(formData)
    data = {
        ...data,
        email: data['signup[email]'],
        password: data['signup[password]'],
    }
    console.log(data)
    const validatedData = authSchema.safeParse(data)

    if (!validatedData.success) {
        return {
            errors: {
                ...validatedData.error.flatten().fieldErrors,
                general: undefined,
            },
        }
    }

    try {
        const res = await axiosInstance.post('/auth/signup', validatedData.data)
        const token = res.data.access_token

        cookies().set('token', token, { httpOnly: true })

        return {
            success: 'User created successfully',
            data: res.data,
        }
    } catch (error: any) {
        return {
            errors: {
                email: undefined,
                password: undefined,
                general: error.response?.data?.message || 'Failed to sign up',
            },
        }
    }
}

export const login = async (prevState: any, formData: FormData) => {
    var data = Object.fromEntries(formData)
    data = {
        ...data,
        email: data['login[email]'],
        password: data['login[password]'],
    }
    const validatedData = authSchema.safeParse(data)

    if (!validatedData.success) {
        return {
            errors: {
                ...validatedData.error.flatten().fieldErrors,
                general: undefined,
            },
        }
    }

    try {
        const res = await axiosInstance.post('/auth/login', validatedData.data)
        const token = res.data.access_token

        cookies().set('token', token, { httpOnly: true })

        return {
            success: 'Logged in successfully',
            data: res.data,
        }
    } catch (error: any) {
        return {
            errors: {
                email: undefined,
                password: undefined,
                general: error.response?.data?.message || 'Invalid credentials',
            },
        }
    }
}

export const logout = async () => {
    cookies().delete('token')
    return {
        success: 'Logged out successfully',
    }
}
