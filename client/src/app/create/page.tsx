import styles from './page.module.css'

import { Button } from '@/components/Atoms/Button/Button'
import QrType from '@/components/Molecules/QrType/QrType'
import LinkIcon from '../../../public/icons/linkIcon.svg'
import BackIcon from '../../../public/icons/backIcon.svg'
import BreadCrumbs from '@/components/Atoms/BreadCrumbs/BreadCrumbs'
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
