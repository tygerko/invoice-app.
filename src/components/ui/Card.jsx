import React from 'react';

export function Card({ children, className = '', title, action }) {
    return (
        <div className={`card-premium overflow-hidden transition-all ${className}`}>
            {(title || action) && (
                <div className="px-6 py-4 border-b flex justify-between items-center bg-gray-50/30">
                    {title && (
                        <h3 className="text-base font-bold tracking-tight text-gray-800">
                            {title}
                        </h3>
                    )}
                    {action && <div>{action}</div>}
                </div>
            )}
            <div className="p-6">
                {children}
            </div>
        </div>
    );
}
