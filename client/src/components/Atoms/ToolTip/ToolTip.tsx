'use client'

import { FC, useRef, useState } from 'react'
import { cn } from '@/utils/cn'
import styles from './ToolTip.module.css'

interface IToolTipProps {
    children: React.ReactNode
    text?: string
    classname?: string
}

const ToolTip: FC<IToolTipProps> = ({ children, text, classname = '' }) => {
    const tooltipRef = useRef<HTMLDivElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const [position, setPosition] = useState({ left: 0, top: 0 })
    const tooltipMargin = 10

    const adjustTooltipPosition = () => {
        if (!tooltipRef.current || !containerRef.current) return

        const tooltip = tooltipRef.current
        const container = containerRef.current
        const tooltipRect = tooltip.getBoundingClientRect()
        const containerRect = container.getBoundingClientRect()

        const { innerWidth: viewportWidth, innerHeight: viewportHeight } =
            window
        let left = 0
        let top = 20

        if (
            containerRect.left +
                containerRect.width +
                tooltipRect.width +
                tooltipMargin >
            viewportWidth
        ) {
            left =
                viewportWidth -
                tooltipRect.width -
                containerRect.left -
                containerRect.width -
                tooltipMargin
        }

        if (
            containerRect.top +
                tooltipRect.height +
                containerRect.height +
                tooltipMargin >
            viewportHeight
        ) {
            top = -tooltipRect.height
        }

        setPosition({ left, top })
    }

    return (
        <div
            className={cn(styles.container, classname)}
            ref={containerRef}
            onMouseEnter={adjustTooltipPosition}
        >
            {children}
            <div
                className={styles.tooltip}
                ref={tooltipRef}
                style={{ left: position.left, top: position.top }}
            >
                {text && <span className={styles.text}>{text}</span>}
            </div>
        </div>
    )
}

export default ToolTip
