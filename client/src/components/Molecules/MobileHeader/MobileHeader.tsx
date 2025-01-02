import styles from './MobileHeader.module.css'

import Link from 'next/link'
import Logo from '../../../../public/logo.svg'
import QrCodeIcon from '../../../../public/icons/qrCodeIcon.svg'
import { Button } from '@/components/Atoms/Button/Button'

export function MobileHeader() {
    return (
        <header className={styles.header}>
            <nav className={styles.navbar}>
                <Link href={'/'} className={styles.logo}>
                    <Logo />
                </Link>
                <Link href={'/qr-code'}>
                    <QrCodeIcon />
                </Link>
            </nav>
            <Link href={'login'}>
                <Button
                    className={styles.loginBtn}
                    shape="round"
                    color="primary"
                >
                    Login
                </Button>
            </Link>
        </header>
    )
}
