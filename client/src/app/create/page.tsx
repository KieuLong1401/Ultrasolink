import styles from './page.module.css'

import { Button } from '@/components/Atoms/Button/Button'
import QrType from '@/components/Molecules/QrType/QrType'
import LinkIcon from '../../../public/icons/linkIcon.svg'
import BackIcon from '../../../public/icons/backIcon.svg'
import BreadCrumbs from '@/components/Molecules/BreadCrumbs/BreadCrumbs'

export default function CreatePage() {
    return (
        <div className={styles.container}>
            <BreadCrumbs />
            <div className={styles.header}>
                <Button
                    className={styles.backButton}
                    shape="round"
                    color="reverse"
                >
                    <BackIcon />
                    Back
                </Button>
                <h1 className={styles.headerText}>Choose Type</h1>
            </div>
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
        </div>
    )
}
