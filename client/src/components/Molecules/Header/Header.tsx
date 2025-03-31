'use client'

import styles from './Header.module.css'

import Logo from '../../../../public/logo.svg'
import UserIcon from '../../../../public/icons/userIcon.svg'
import QrCodeIcon from '../../../../public/icons/qrCodeIcon.svg'

import Link from 'next/link'

import NavigateLink from '@/components/Atoms/NavigateLink/NavigateLink'
import Button from '@/components/Atoms/Button/Button'

import useDeviceType from '@/hooks/useDeviceType'

import { FC } from 'react'
import useAuth from '@/hooks/useAuth'

const Header: FC = () => {
    const device = useDeviceType()
    const { token, setToken } = useAuth()

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
            {token ? (
                <Link href={'/user_detail'}>
                    <UserIcon />
                </Link>
            ) : (
                <Link href={'/login'}>
                    <Button
                        className={styles.loginBtn}
                        shape="round"
                        color="primary"
                    >
                        Login
                    </Button>
                </Link>
            )}
        </header>
    )
}

export default Header
