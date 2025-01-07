import { cn } from '@/utils/cn'
import styles from './NavigateLink.module.css'

import Link from 'next/link'
import React, { FC } from 'react'
import { cormorantGaramond } from '@/utils/fonts'
interface INavigateLinkProps {
    children: React.ReactNode
    href: string
    color?: 'text' | 'primary'
    disabled?: boolean
}

export const NavigateLink: FC<INavigateLinkProps> = ({
    children,
    href,
    color = 'text',
    disabled = false,
}) => {
    return (
        <Link
            href={href}
            className={cn(
                styles.link,
                cormorantGaramond.className,
                color == 'text' ? styles.textColor : styles.primaryColor,
                disabled ? styles.disabled : ''
            )}
        >
            {children}
        </Link>
    )
}
