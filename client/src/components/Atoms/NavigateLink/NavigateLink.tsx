import { cn } from '@/utils/cn';
import styles from './NavigateLink.module.css'

import Link from "next/link";
import React, { FC } from "react";
import { cormorantGaramond } from '@/utils/fonts';
interface INavigateLinkProps {
    children: React.ReactNode
    href: string
};

export const NavigateLink: FC<INavigateLinkProps> = ({ children, href }) => {
    return (
        <Link href={href} className={cn(styles.link, cormorantGaramond.className)}>{children}</Link>
    );
}
