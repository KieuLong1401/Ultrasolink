'use server'

import z from 'zod'
import axiosInstance from '@/utils/axiosInstance'
import { redirect } from 'next/navigation'
// change folders to dynamic
const folders = ['Default', 'Home']

const createQrCodeSchema = z.object({
    folder: z.string().refine((folder: string) => folders.includes(folder), {
        message: 'Invalid folder',
    }),
    link: z
        .string()
        .min(1, { message: 'Link is required' })
        .startsWith('http', { message: 'Invalid link' }),
    name: z.string().trim().min(1, { message: 'Name is required' }),
})

export const createQrCode = async (prevState: any, formData: FormData) => {
    const data = Object.fromEntries(formData)
    const validatedData = createQrCodeSchema.safeParse(data)

    if (!validatedData.success) {
        const formFieldErrors = validatedData.error.flatten().fieldErrors

        return {
            errors: {
                folders: formFieldErrors?.folder,
                link: formFieldErrors?.link,
                name: formFieldErrors?.name,
            },
        }
    }

    await new Promise((resolve) => setTimeout(resolve, 1000))

    //dynamic redirect
    redirect('/create/result?id=fje8239')

    return {
        success: 'QR code created successfully',
    }

    const response = await axiosInstance.post('/qr-codes', formData)

    return response.data.json()
}
