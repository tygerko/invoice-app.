import React from 'react';

export function Card({ children, className = '', title, action }) {
    return (
        <div className={`
      bg-white rounded-xl shadow-sm border border-gray-200 
      hover:shadow-md transition-shadow duration-300
      overflow-hidden
      ${className}
    `}
            style={{
                backgroundColor: 'var(--color-bg-card)',
                borderColor: 'var(--color-border)',
                boxShadow: 'var(--shadow-sm)',
                borderRadius: 'var(--radius-lg)'
            }}
        >
            {(title || action) && (
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center"
                    style={{ borderColor: 'var(--color-border)' }}>
                    {title && (
                        <h3 className="text-lg font-semibold" style={{ color: 'var(--color-text-main)' }}>
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
