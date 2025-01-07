import ToolTip from '@/components/Atoms/ToolTip/ToolTip'
import styles from './QrType.module.css'

import { FC, ReactNode } from 'react'
import InfoIcon from '../../../../public/icons/infoIcon.svg'
import Link from 'next/link'

interface IQrTypeProps {
    logo: ReactNode
    describe: string
    title: string
    link: string
}

const QrType: FC<IQrTypeProps> = ({ logo, describe, title, link }) => {
    return (
        <Link className={styles.container} href={link}>
            <ToolTip text={describe} classname={styles.info}>
                <InfoIcon />
            </ToolTip>
            {logo}
            <h3 className={styles.title}>{title}</h3>
        </Link>
    )
}

export default QrType
