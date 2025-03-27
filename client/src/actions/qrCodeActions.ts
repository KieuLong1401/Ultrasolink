'use server'

import axiosInstance from '@/utils/axiosInstance'
import { z } from 'zod'

//alt
const folders = ['folder1', 'folder2', 'folder3']

const formSchema = z.object({
    folder: z
        .string()
        .nonempty('Folder is required')
        .refine((folder) => folders.includes(folder), {
            message: 'Invalid folder',
        }),
    link: z
        .string()
        .nonempty('Link is required')
        .startsWith('http', { message: 'Invalid link' }),
    name: z.string().nonempty('Name is required'),
})

export async function createQrCode(prevState: any, formData: FormData) {
    const data = Object.fromEntries(formData)
    const result = formSchema.safeParse(data)

    if (!result.success) {
        return { errors: result.error.flatten().fieldErrors }
    }

    const res = await axiosInstance.post('/short-link', {
        ...formData,
        type: 'link',
        //alt
        user: undefined,
    })

    return { success: 'Form submitted successfully!', data: res.data }
}
