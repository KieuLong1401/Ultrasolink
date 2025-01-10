'use client'

import styles from './DropDown.module.css'

import ArrowIcon from '../../../../public/icons/arrowIcon.svg'

interface DropDownProps {
    options: { value: string; label: string }[]
    setDropDownValue: (value: string) => void
    value: string
    name: string
}

const DropDown: React.FC<DropDownProps> = ({
    options,
    setDropDownValue,
    value,
    name,
}) => {
    return (
        <div className={styles.container}>
            <select
                value={value}
                onChange={(e) => {
                    setDropDownValue(e.target.value)
                }}
                className={styles.dropDown}
                name={name}
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
