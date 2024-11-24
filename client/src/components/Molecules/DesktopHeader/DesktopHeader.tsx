import styles from './DesktopHeader.module.css'

import { FC } from "react";
import { Logo } from "../../Atoms/Logo";
import Link from 'next/link';
import { NavigateLink } from '@/components/Atoms/NavigateLink/NavigateLink';
import { Button } from '@/components/Atoms/Button/Button';
interface IDesktopHeaderProps {};

export const DesktopHeader: FC<IDesktopHeaderProps> = (props) => {
    return (
        <header className={styles.header}>
            <nav className={styles.navbar}>
                <Link href={'/'} className={styles.logo}>
                    <Logo/>
                    <h1 className={styles.brandName}>ULTRASOLINK</h1>
                </Link>
                <NavigateLink href={'/'}>Home</NavigateLink>
                <NavigateLink href={'/qr-code'}>My QR Codes</NavigateLink>
            </nav>
            <Button className={styles.loginBtn} shape='round' color='primary'>Login</Button>
        </header>
    );
}
