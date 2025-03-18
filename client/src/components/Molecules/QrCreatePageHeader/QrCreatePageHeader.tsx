'use client'

import styles from './QrCreatePageHeader.module.css'

import BreadCrumbs from '../../Atoms/BreadCrumbs/BreadCrumbs'
import Button from '@/components/Atoms/Button/Button'

import BackIcon from '../../../../public/icons/backIcon.svg'
import { useRouter } from 'next/navigation'

const QrCreatePageHeader = ({ title }: { title: string }) => {
    const router = useRouter()

    return (
        <>
            <BreadCrumbs />
            <div className={styles.header}>
                <Button
                    className={styles.backButton}
                    shape="round"
                    color="reverse"
                    onClick={() => router.back()}
                >
                    <BackIcon />
                    Back
                </Button>
                <h1 className={styles.headerText}>{title}</h1>
            </div>
        </>
    )
}

export default QrCreatePageHeader
