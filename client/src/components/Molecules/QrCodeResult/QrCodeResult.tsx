import styles from './QrCodeResult.module.css'

import { FC } from 'react'
import Button from '@/components/Atoms/Button/Button'
import CodeIcon from '../../../../public/icons/codeIcon.svg'
import ShareIcon from '../../../../public/icons/shareIcon.svg'
import QrCode from '@/components/Atoms/QrCode/QrCode'

interface QrCodeResultProps {
    qrCode: string
}

const QrCodeResult: FC<QrCodeResultProps> = ({ qrCode }) => {
    return (
        <div className={styles.container}>
            <div className={styles.roundButtonContainer}>
                <Button
                    shape="round"
                    color="background"
                    className={styles.roundButton}
                >
                    <CodeIcon />
                </Button>
                <Button
                    shape="round"
                    color="background"
                    className={styles.roundButton}
                >
                    <ShareIcon />
                </Button>
            </div>
            <QrCode value="https://www.google.com" size={256} />
        </div>
    )
}

export default QrCodeResult
