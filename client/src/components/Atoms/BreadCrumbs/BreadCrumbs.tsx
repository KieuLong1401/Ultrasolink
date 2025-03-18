'use client'

import styles from './BreadCrumbs.module.css'
import NavigateLink from '@/components/Atoms/NavigateLink/NavigateLink'
import capitalizeFirstLetter from '@/utils/capitalizeFirstLetter'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const BreadCrumbs = () => {
    const pathname = usePathname()
    const [paths, setPaths] = useState<string[]>([])

    useEffect(() => {
        if (pathname) {
            setPaths(pathname.split('/').filter((path) => path))
        }
    }, [pathname])

    return (
        <div className={styles.container}>
            <NavigateLink href="/" color="primary">
                Home
            </NavigateLink>
            <span className={styles.slash}> / </span>
            {paths.map((path, index) => {
                const isLast = index === paths.length - 1
                const href = '/' + paths.slice(0, index + 1).join('/')

                return (
                    <span key={href}>
                        <NavigateLink
                            href={href}
                            color={isLast ? 'text' : 'primary'}
                            disabled={isLast}
                        >
                            {capitalizeFirstLetter(path)}
                        </NavigateLink>
                        {isLast ? (
                            ''
                        ) : (
                            <span className={styles.slash}> / </span>
                        )}
                    </span>
                )
            })}
        </div>
    )
}

export default BreadCrumbs
