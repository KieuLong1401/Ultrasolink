import styles from './page.module.css'
import QrType from '@/components/Molecules/QrType/QrType'
import LinkIcon from '../../public/icons/linkIcon.svg'
import { cormorantGaramond } from '@/utils/fonts'
import { cn } from '@/utils/cn'
import Link from 'next/link'

export default function Home() {
    return (
        <div className={styles.container}>
            <h1 className={styles.header}>
                <span>Free</span> URL Shortener & QR Code
            </h1>
            <h3 className={cn(styles.subHeader, cormorantGaramond.className)}>
                Easy Link Management & Analytics
            </h3>
            <div className={styles.QrTypeContainer}>
                <QrType
                    logo={<LinkIcon />}
                    describe="Link to an URL"
                    title="Link"
                    link="/create/link"
                />
                <QrType
                    logo={<LinkIcon />}
                    describe="Link to an URL"
                    title="Link"
                    link="/create/link"
                />
                <QrType
                    logo={<LinkIcon />}
                    describe="Link to an URL"
                    title="Link"
                    link="/create/link"
                />
                <QrType
                    logo={<LinkIcon />}
                    describe="Link to an URL"
                    title="Link"
                    link="/create/link"
                />
                <QrType
                    logo={<LinkIcon />}
                    describe="Link to an URL"
                    title="Link"
                    link="/create/link"
                />
            </div>
            <Link
                href={'/create'}
                className={cn(cormorantGaramond.className, styles.moreBtn)}
            >
                More Type
            </Link>
        </div>
    )
}
