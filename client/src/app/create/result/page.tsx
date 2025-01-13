import QrCreatePageHeader from '@/components/Molecules/QrCreatePageHeader/QrCreatePageHeader'
import styles from './page.module.css'
import QrCodeResult from '@/components/Molecules/QrCodeResult/QrCodeResult'

export default function LinkQrPage() {
    return (
        <div className={styles.container}>
            <QrCreatePageHeader title="Result" />
            <QrCodeResult qrCode="" />
        </div>
    )
}
