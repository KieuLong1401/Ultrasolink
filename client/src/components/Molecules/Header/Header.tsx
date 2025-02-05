'use client'

import styles from './Header.module.css'

import { FC } from 'react'
import Logo from '../../../../public/logo.svg'
import Link from 'next/link'
import { NavigateLink } from '@/components/Atoms/NavigateLink/NavigateLink'
import { Button } from '@/components/Atoms/Button/Button'
import QrCodeIcon from '../../../../public/icons/qrCodeIcon.svg'
import useDeviceType from '@/hooks/useDeviceType'

const Header: FC = () => {
    const device = useDeviceType()

    return (
        <header className={styles.header}>
            <nav className={styles.navbar}>
                <Link href={'/'} className={styles.logo}>
                    <Logo />
                    {device == 'desktop' && (
                        <h1 className={styles.brandName}>ULTRASOLINK</h1>
                    )}
                </Link>
                <NavigateLink href={'/qr-code'}>
                    {device == 'desktop' ? 'My QR Codes' : <QrCodeIcon />}
                </NavigateLink>
            </nav>
            <Link href={'/login'}>
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

export default Header
