'use client'

import styles from './LinkQrForm.module.css'

import { createQrCode } from '@/actions/qrCodeActions'
import Button from '@/components/Atoms/Button/Button'
import DropDown from '@/components/Molecules/DropDown/DropDown'
import Input from '@/components/Molecules/Input/Input'
import axiosInstance from '@/utils/axiosInstance'
import { cn } from '@/utils/cn'
import { cormorantGaramond } from '@/utils/fonts'
import { useState } from 'react'
import { useFormState } from 'react-dom'

const initialState = {
    errors: {
        folder: undefined,
        link: undefined,
        name: undefined,
    },
    success: undefined,
    data: undefined,
}

export default async function LinkQrForm() {
    const [folder, setFolder] = useState('Default')
    const [state, formAction] = useFormState(createQrCode, initialState)
    const UserFolders: string[] = await axiosInstance.get('/user/folders')

    return (
        <form action={formAction} className={styles.formContainer}>
            <DropDown
                name="folder"
                value={folder}
                setDropDownValue={setFolder}
                //alt
                options={['Default', ...UserFolders]}
            />
            <Input
                description="Link to be shortened"
                placeholder="Link"
                type="text"
                name="link"
                error={state?.errors?.link}
            />
            <Input
                description="Name of the link"
                placeholder="Name"
                type="text"
                name="name"
                error={state?.errors?.name}
            />

            <Button
                shape="square"
                color="primary"
                type="submit"
                className={cn(cormorantGaramond.className, styles.submitButton)}
            >
                Submit
            </Button>
        </form>
    )
}
