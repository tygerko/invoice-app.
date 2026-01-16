import React, { useState, useEffect, useRef } from 'react';

/**
 * PreviewScaler intelligently scales the invoice preview (designed for A4)
 * to fit the available screen width on mobile devices.
 */
export function PreviewScaler({ children }) {
    const containerRef = useRef(null);
    const [scale, setScale] = useState(1);
    const [containerHeight, setContainerHeight] = useState('auto');

    useEffect(() => {
        const calculateScale = () => {
            if (!containerRef.current) return;

            const containerWidth = containerRef.current.offsetWidth;
            const a4WidthInPixels = 794; // Approx 210mm at 96 DPI

            // Only scale down if the container is smaller than A4
            if (containerWidth < a4WidthInPixels) {
                const newScale = containerWidth / a4WidthInPixels;
                setScale(newScale);
                // Adjust container height to account for scaled content
                setContainerHeight(`${297 / 210 * containerWidth}px`);
            } else {
                setScale(1);
                setContainerHeight('auto');
            }
        };

        calculateScale();

        const observer = new ResizeObserver(calculateScale);
        if (containerRef.current) observer.observe(containerRef.current);

        window.addEventListener('resize', calculateScale);
        return () => {
            observer.disconnect();
            window.removeEventListener('resize', calculateScale);
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="preview-scaler-container"
            style={{
                width: '100%',
                overflow: 'hidden',
                height: containerHeight,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start'
            }}
        >
            <div
                className="preview-scale-wrapper"
                style={{
                    transform: `scale(${scale})`,
                    transformOrigin: 'top center',
                    width: '210mm', // Fixed A4 width
                    flexShrink: 0
                }}
            >
                {children}
            </div>
        </div>
    );
}
