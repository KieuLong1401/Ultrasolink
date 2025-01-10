'use client'

import QrCreatePageHeader from '@/components/Molecules/QrCreatePageHeader/QrCreatePageHeader'
import styles from './page.module.css'
import LinkQRForm from '@/components/Organisms/LinkQRForm/LinkQrForm'

export default function LinkQrPage() {
    return (
        <div className={styles.container}>
            <QrCreatePageHeader title="Enter Content" />
            <LinkQRForm />
        </div>
    )
}
