'use client'

import QrCreatePageHeader from '@/components/Molecules/QrCreatePageHeader/QrCreatePageHeader'
import styles from './page.module.css'
import DropDown from '@/components/Molecules/DropDown/DropDown'
import { useState } from 'react'
import Input from '@/components/Molecules/Input/Input'
import { Button } from '@/components/Atoms/Button/Button'
import { cn } from '@/utils/cn'
import { cormorantGaramond } from '@/utils/fonts'

export default function LinkQrPage() {
    const [dropDownValue, setDropDownValue] = useState('default')
    const [linkInputValue, setLinkInputValue] = useState('')
    const [nameInputValue, setNameInputValue] = useState('')

    return (
        <div className={styles.container}>
            <QrCreatePageHeader title="Enter Content" />
            <form className={styles.formContainer}>
                <DropDown
                    options={[
                        { value: 'Default', label: 'Default' },
                        { value: 'Home', label: 'Home' },
                    ]}
                    setDropDownValue={setDropDownValue}
                />
                <Input
                    description="URL to the link"
                    setValue={setLinkInputValue}
                    type="text"
                    placeholder="Link"
                    value={linkInputValue}
                />
                <Input
                    description="Name the Qr code you are creating"
                    setValue={setNameInputValue}
                    type="text"
                    placeholder="Name"
                    value={nameInputValue}
                />
                <Button
                    shape="square"
                    color="primary"
                    className={cn(
                        cormorantGaramond.className,
                        styles.submitButton
                    )}
                >
                    Generate QR Code
                </Button>
            </form>
        </div>
    )
}
