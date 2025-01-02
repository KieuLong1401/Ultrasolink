import { cn } from '@/utils/cn'
import styles from './ToolTip.module.css'

import { FC } from 'react'

interface IToolTipProps {
    children: React.ReactNode
    text?: string
    classname?: string
}

const ToolTip: FC<IToolTipProps> = ({ children, text, classname = '' }) => {
    return (
        <div className={cn(styles.container, classname)}>
            {children}
            <div className={styles.tooltip}>
                {text && <span className={styles.text}>{text}</span>}
            </div>
        </div>
    )
}

export default ToolTip
