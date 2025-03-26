import { FC } from 'react'
import styles from './Input.module.css'
import ToolTip from '@/components/Atoms/ToolTip/ToolTip'

import InfoIcon from '../../../../public/icons/infoIcon.svg'
import { cn } from '@/utils/cn'
import { cormorantGaramond } from '@/utils/fonts'

interface InputProps {
    description?: string
    type: string
    placeholder: string
    name: string
    error?: string[] | undefined
}

const Input: FC<InputProps> = ({
    description,
    type,
    placeholder,
    name,
    error,
}) => {
    return (
        <div className={styles.container}>
            <div className={styles.inputContainer}>
                <input
                    type={type}
                    placeholder={placeholder}
                    className={cn(
                        styles.input,
                        cormorantGaramond.className,
                        error ? styles.error : ''
                    )}
                    autoComplete="off"
                    name={name}
                />
                {description && (
                    <ToolTip text={description} classname={styles.info}>
                        <InfoIcon />
                    </ToolTip>
                )}
            </div>
            {error && (
                <span className={styles.errorMessage}>
                    {Array.isArray(error) ? error[0] : error}
                </span>
            )}
        </div>
    )
}

export default Input
