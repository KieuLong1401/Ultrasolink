'use client'

import styles from './DropDown.module.css'

import ArrowIcon from '../../../../public/icons/arrowIcon.svg'
import { useState } from 'react'

interface DropDownProps {
    options: { value: string; label: string }[]
    setDropDownValue: (value: string) => void
}

const DropDown: React.FC<DropDownProps> = ({ options, setDropDownValue }) => {
    const [value, setValue] = useState('default')

    return (
        <div className={styles.container}>
            <select
                value={value}
                onChange={(e) => {
                    setValue(e.target.value)
                    setDropDownValue(e.target.value)
                }}
                className={styles.dropDown}
            >
                {options.map((option) => (
                    <option
                        key={option.value}
                        value={option.value}
                        className={styles.option}
                    >
                        {option.label}
                    </option>
                ))}
            </select>
            <ArrowIcon className={styles.arrowIcon} />
        </div>
    )
}

export default DropDown
