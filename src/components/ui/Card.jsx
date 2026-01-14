import React from 'react';

export function Card({ children, className = '', title, action }) {
    return (
        <div className={`
      bg-white rounded-xl border overflow-hidden
      ${className}
    `}
            style={{
                backgroundColor: 'var(--color-bg-card)',
                borderColor: 'var(--color-border)',
                boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
                borderRadius: 'var(--radius-xl)',
                transition: 'box-shadow 0.3s ease'
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)';
            }}
        >
            {(title || action) && (
                <div
                    className="px-6 py-4 border-b flex justify-between items-center"
                    style={{
                        borderColor: 'var(--color-border)',
                        backgroundColor: 'var(--color-bg-app)'
                    }}
                >
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
