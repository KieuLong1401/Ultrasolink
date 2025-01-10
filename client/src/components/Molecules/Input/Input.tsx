import { FC } from 'react'
import styles from './Input.module.css'
import ToolTip from '@/components/Atoms/ToolTip/ToolTip'

import InfoIcon from '../../../../public/icons/infoIcon.svg'

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
    return (
        <div className={styles.container}>
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className={styles.input}
                name={name}
            />
            <ToolTip text={description} classname={styles.info}>
                <InfoIcon />
            </ToolTip>
            {error && <span className={styles.errorMessage}>{error}</span>}
        </div>
    )
}

export default Input
