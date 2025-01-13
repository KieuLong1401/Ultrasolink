'use client'

import QrCreatePageHeader from '@/components/Molecules/QrCreatePageHeader/QrCreatePageHeader'
import LinkQRForm from '@/components/Organisms/LinkQRForm/LinkQrForm'

export default function LinkQrPage() {
    return (
        <div>
            <QrCreatePageHeader title="Enter Content" />
            <LinkQRForm />
        </div>
    )
}
