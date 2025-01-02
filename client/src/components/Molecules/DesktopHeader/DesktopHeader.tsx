import styles from './DesktopHeader.module.css'

import { FC } from 'react'
import Logo from '../../../../public/logo.svg'
import Link from 'next/link'
import { NavigateLink } from '@/components/Atoms/NavigateLink/NavigateLink'
import { Button } from '@/components/Atoms/Button/Button'
interface IDesktopHeaderProps {}

export const DesktopHeader: FC<IDesktopHeaderProps> = (props) => {
    return (
        <header className={styles.header}>
            <nav className={styles.navbar}>
                <Link href={'/'} className={styles.logo}>
                    <Logo />
                    <h1 className={styles.brandName}>ULTRASOLINK</h1>
                </Link>
                <NavigateLink href={'/qr-code'}>My QR Codes</NavigateLink>
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
