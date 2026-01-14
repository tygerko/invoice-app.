import React from 'react';

export function Input({ label, error, className = '', ...props }) {
    return (
        <div className={`flex flex-col ${className}`}>
            {label && (
                <label className="label-premium">
                    {label}
                </label>
            )}
            <input
                className="input-premium"
                {...props}
            />
            {error && (
                <span className="text-xs text-red-500 mt-1">
                    {error}
                </span>
            )}
        </div>
    );
}
