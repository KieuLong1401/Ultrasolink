'use client'

import styles from './BreadCrumbs.module.css'
import { NavigateLink } from '@/components/Atoms/NavigateLink/NavigateLink'
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
        <span className={styles.container}>
            <NavigateLink href="/" color="primary">
                Home
            </NavigateLink>
            <span className={styles.slash}> / </span>
            {paths.map((path, index) => {
                const isLast = index === paths.length - 1
                const href = '/' + paths.slice(0, index + 1).join('/')

                return (
                    <NavigateLink
                        href={href}
                        color={isLast ? 'text' : 'primary'}
                        key={href}
                        disabled={isLast}
                    >
                        {path}
                        {isLast ? (
                            ''
                        ) : (
                            <span className={styles.slash}> / </span>
                        )}
                    </NavigateLink>
                )
            })}
        </span>
    )
}

export default BreadCrumbs
