export const createQrCode = async (formData: FormData) => {
    const response = await fetch('/api/qrCode', {
        method: 'POST',
        body: formData,
    })

    if (response.ok) {
        return response.json()
    } else {
        throw new Error('Failed to create QR code')
    }
}
