import { FC } from 'react'
import styles from './Input.module.css'
import ToolTip from '@/components/Atoms/ToolTip/ToolTip'

import InfoIcon from '../../../../public/icons/infoIcon.svg'
import { cn } from '@/utils/cn'
import { cormorantGaramond } from '@/utils/fonts'

interface InputProps {
    description: string
    setValue: (value: string) => void
    type: string
    placeholder: string
    value: string
    name: string
    error?: string
}

const Input: FC<InputProps> = ({
    description,
    setValue,
    type,
    placeholder,
    value,
    name,
    error,
}) => {
    console.log(error)

    return (
        <div className={styles.container}>
            <div className={styles.inputContainer}>
                <input
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className={cn(
                        styles.input,
                        cormorantGaramond.className,
                        error ? styles.error : ''
                    )}
                    name={name}
                />
                <ToolTip text={description} classname={styles.info}>
                    <InfoIcon />
                </ToolTip>
            </div>
            {error && <span className={styles.errorMessage}>{error[0]}</span>}
        </div>
    )
}

export default Input
