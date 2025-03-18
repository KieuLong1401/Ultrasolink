'use client'

import { cn } from '@/utils/cn'
import styles from './Button.module.css'

import React, { FC } from 'react'
import { useFormStatus } from 'react-dom'

interface IButtonProps {
    children: React.ReactNode
    shape: 'round' | 'square'
    color: 'primary' | 'background' | 'reverse'
    onClick?: () => void
    className?: string
    type?: 'button' | 'submit' | 'reset'
}

const Button: FC<IButtonProps> = ({
    children,
    shape,
    color,
    onClick,
    className,
    type = 'button',
}) => {
    const { pending } = useFormStatus()

    return (
        <button
            className={cn(
                styles.button,
                className ? className : '',
                shape == 'round' ? styles.round : styles.square,
                color == 'primary'
                    ? styles.primary
                    : color == 'background'
                    ? styles.background
                    : styles.reverse
            )}
            disabled={pending}
            onClick={onClick}
            type={type}
        >
            {pending ? <span>Submitting</span> : children}
        </button>
    )
}

export default Button
