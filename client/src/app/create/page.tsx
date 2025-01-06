import styles from './page.module.css'

import { Button } from '@/components/Atoms/Button/Button'
import QrType from '@/components/Molecules/QrType/QrType'
import LinkIcon from '../../../public/icons/linkIcon.svg'

export default function CreatePage() {
    return (
        <div className={styles.container}>
            <div className={styles.breadCrumb}>home/create</div>
            <div className={styles.header}>
                <Button
                    className={styles.backButton}
                    shape="round"
                    color="reverse"
                >
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
            </div>
        </div>
    )
}
