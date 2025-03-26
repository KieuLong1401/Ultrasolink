import styles from './page.module.css'

import QrType from '@/components/Molecules/QrType/QrType'
import LinkIcon from '../../../public/icons/linkIcon.svg'
import QrCreatePageHeader from '@/components/Molecules/QrCreatePageHeader/QrCreatePageHeader'

export default function CreatePage() {
    return (
        <div className={styles.container}>
            <QrCreatePageHeader title="Choose Type" />
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
