'use client'

import { createQrCode } from '@/actions/qrCodeActions'
import styles from './LinkQrForm.module.css'

import { Button } from '@/components/Atoms/Button/Button'
import DropDown from '@/components/Molecules/DropDown/DropDown'
import Input from '@/components/Molecules/Input/Input'
import { cn } from '@/utils/cn'
import { cormorantGaramond } from '@/utils/fonts'
import { useState } from 'react'
import { useFormState } from 'react-dom'

const initialState = {
    success: '',
    errors: {
        link: '',
        name: '',
    },
}

const LinkQRForm: React.FC = () => {
    const [folderDropDownValue, setFolderDropDownValue] = useState('default')
    const [linkInputValue, setLinkInputValue] = useState('')
    const [nameInputValue, setNameInputValue] = useState('')

    const [state, formAction] = useFormState(createQrCode, initialState)

    return (
        <form className={styles.formContainer} action={formAction}>
            <DropDown
                options={[
                    { value: 'Default', label: 'Default' },
                    { value: 'Home', label: 'Home' },
                ]}
                setDropDownValue={setFolderDropDownValue}
                name="folder"
                value={folderDropDownValue}
            />
            <Input
                description="URL of your link"
                setValue={setLinkInputValue}
                type="text"
                placeholder="Link"
                value={linkInputValue}
                name="link"
                error={state.errors.link}
            />
            <Input
                description="Name the Qr code you are creating"
                setValue={setNameInputValue}
                type="text"
                placeholder="Name"
                value={nameInputValue}
                name="name"
                error={state.errors.name}
            />
            <Button
                shape="square"
                color="primary"
                type="submit"
                className={cn(cormorantGaramond.className, styles.submitButton)}
            >
                Generate QR Code
            </Button>
        </form>
    )
}

export default LinkQRForm
