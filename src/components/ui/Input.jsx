import React from 'react';

export function Input({ label, error, className = '', ...props }) {
    return (
        <div className={`flex flex-col gap-1.5 ${className}`}>
            {label && (
                <label className="text-sm font-medium" style={{ color: 'var(--color-text-secondary)' }}>
                    {label}
                </label>
            )}
            <input
                className="w-full px-3 py-2 outline-none transition-all"
                style={{
                    backgroundColor: 'var(--color-input-bg)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-md)',
                    color: 'var(--color-text-main)',
                    fontSize: '0.925rem'
                }}
                onFocus={(e) => {
                    e.target.style.borderColor = 'var(--color-primary)';
                    e.target.style.boxShadow = '0 0 0 3px var(--color-primary-light)';
                }}
                onBlur={(e) => {
                    e.target.style.borderColor = 'var(--color-border)';
                    e.target.style.boxShadow = 'none';
                }}
                {...props}
            />
            {error && (
                <span className="text-xs" style={{ color: 'var(--color-danger)' }}>
                    {error}
                </span>
            )}
        </div>
    );
}
