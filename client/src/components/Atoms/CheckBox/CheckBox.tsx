import { cn } from '@/utils/cn'
import styles from './CheckBox.module.css'
import { cormorantGaramond } from '@/utils/fonts'

interface CheckBoxProps {
    label: string
    checked: boolean
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const CheckBox: React.FC<CheckBoxProps> = ({ label, checked, onChange }) => {
    return (
        <label className={styles.container}>
            <input
                className={styles.checkbox}
                type="checkbox"
                checked={checked}
                onChange={onChange}
            />
            <span className={cn(styles.label, cormorantGaramond.className)}>
                {label}
            </span>
        </label>
    )
}

export default CheckBox
