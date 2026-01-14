import React from 'react';
import { Card } from '../ui/Card';
import { Download, Cloud } from 'lucide-react';
import { uploadToDrive } from '../../services/googleDrive';

export function ActionsSection({ data, onSaveClient }) {
    const handlePrint = () => {
        onSaveClient();
        window.print();
    };

    const handleGoogleDrive = () => {
        uploadToDrive(data, `faktura_${data.details.number}.pdf`);
    };

    // Štýly pre kompaktné, elegantné tlačidlá
    const primaryBtnStyle = {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.625rem 1.25rem',
        fontSize: '0.875rem',
        fontWeight: '600',
        borderRadius: '0.5rem',
        background: 'linear-gradient(135deg, #7c3aed 0%, #6366f1 100%)',
        color: '#fff',
        border: 'none',
        boxShadow: '0 4px 14px rgba(124, 58, 237, 0.35)',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
    };

    const secondaryBtnStyle = {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.625rem 1.25rem',
        fontSize: '0.875rem',
        fontWeight: '500',
        borderRadius: '0.5rem',
        background: '#fff',
        color: '#374151',
        border: '1px solid #e5e7eb',
        boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
    };

    return (
        <Card title="Akcie">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center' }}>
                <button
                    onClick={handlePrint}
                    style={primaryBtnStyle}
                    onMouseEnter={e => {
                        e.currentTarget.style.transform = 'translateY(-1px)';
                        e.currentTarget.style.boxShadow = '0 6px 20px rgba(124, 58, 237, 0.45)';
                    }}
                    onMouseLeave={e => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 4px 14px rgba(124, 58, 237, 0.35)';
                    }}
                >
                    <Download size={16} strokeWidth={2.5} />
                    PDF / Tlačiť
                </button>

                <button
                    onClick={handleGoogleDrive}
                    style={secondaryBtnStyle}
                    onMouseEnter={e => {
                        e.currentTarget.style.borderColor = '#7c3aed';
                        e.currentTarget.style.color = '#7c3aed';
                    }}
                    onMouseLeave={e => {
                        e.currentTarget.style.borderColor = '#e5e7eb';
                        e.currentTarget.style.color = '#374151';
                    }}
                >
                    <Cloud size={16} strokeWidth={2.5} />
                    Google Drive
                </button>
            </div>

            <p style={{ marginTop: '0.75rem', fontSize: '0.75rem', color: '#6b7280' }}>
                Tip: Pre uloženie ako PDF zvoľte v tlačiarni "Uložiť ako PDF".
            </p>
        </Card>
    );
}
