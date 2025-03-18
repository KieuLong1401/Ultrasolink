'use client'

import styles from './LinkQrForm.module.css'

import { createQrCode } from '@/actions/qrCodeActions'
import Button from '@/components/Atoms/Button/Button'
import DropDown from '@/components/Molecules/DropDown/DropDown'
import Input from '@/components/Molecules/Input/Input'
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

export default function ServerForm() {
    const [folder, setFolder] = useState('')
    const [link, setLink] = useState('')
    const [name, setName] = useState('')

    const [state, formAction] = useFormState(createQrCode, initialState)

    return (
        <form action={formAction} className={styles.formContainer}>
            <DropDown
                name="folder"
                value={folder}
                setDropDownValue={setFolder}
                //
                options={[
                    { value: 'folder1', label: 'Folder 1' },
                    { value: 'folder2', label: 'Folder 2' },
                    { value: 'folder3', label: 'Folder 3' },
                ]}
            />
            <Input
                description="Link to be shortened"
                placeholder="Link"
                type="text"
                name="link"
                value={link}
                setValue={setLink}
                error={state?.errors?.link}
            />
            <Input
                description="Name of the link"
                placeholder="Name"
                type="text"
                name="name"
                value={name}
                setValue={setName}
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
