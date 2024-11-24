import { cn } from '@/utils/cn';
import styles from './Button.module.css'

import React, { FC } from "react";
interface IButtonProps {
    children: React.ReactNode
    className?: string
    shape: 'round' | 'square'
    color: 'primary' | 'background' | 'reverse'
}

export const Button: FC<IButtonProps> = ({ children, className, shape, color }) => {
    return (
        <button className={
                cn(
                    styles.button,
                    className ? className : '',
                    shape == 'round' ? styles.round : styles.square, 
                    color == 'primary' ? styles.primary : color == 'background' ? styles.background : styles.reverse
                )
            }>
            {children}
        </button>
    );
}
