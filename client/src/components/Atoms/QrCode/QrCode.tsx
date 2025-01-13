'use client'

import { QRCodeCanvas } from 'qrcode.react'

interface QrCodeProps {
    value: string
    size?: number
    bgColor?: string
    fgColor?: string
}

const QrCode: React.FC<QrCodeProps> = ({
    value,
    size = 128,
    bgColor = '#ffffff',
    fgColor = '#000000',
}) => {
    return (
        <QRCodeCanvas
            value={value}
            size={size}
            bgColor={bgColor}
            fgColor={fgColor}
            marginSize={1}
        />
    )
}

export default QrCode
