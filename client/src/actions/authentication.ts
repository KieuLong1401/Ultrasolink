'use server'

import axiosInstance from '@/utils/axiosInstance'
import { z } from 'zod'

const singUpSchema = z.object({
    email: z.string().email({ message: 'Invalid email' }),
    password: z
        .string()
        .trim()
        .min(6, { message: 'Password must be at least 6 characters long' }),
})

export const signUp = async (prevState: any, formData: FormData) => {
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const data = Object.fromEntries(formData)
    const validatedData = singUpSchema.safeParse(data)

    if (!validatedData.success) {
        return {
            errors: validatedData.error.flatten().fieldErrors,
        }
    }

    try {
        const res = await axiosInstance.post('/user', { email, password })

        return {
            success: 'User created successfully',
            data: res.data,
        }
    } catch (error) {
        console.error(error)
    }
}

export const login = async (prevState: any, formData: FormData) => {
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const data = Object.fromEntries(formData)
    const validatedData = singUpSchema.safeParse(data)

    if (!validatedData.success) {
        return {
            errors: validatedData.error.flatten().fieldErrors,
        }
    }

    try {
        const res = await axiosInstance.post('/user', { email, password })

        return {
            success: 'User created successfully',
            data: res.data,
        }
    } catch (error) {
        console.error(error)
    }
}
