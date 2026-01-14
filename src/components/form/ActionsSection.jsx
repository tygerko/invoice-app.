import React from 'react';
import { Card } from '../ui/Card';
import { Printer, Upload, FileText } from 'lucide-react';
import { uploadToDrive } from '../../services/googleDrive';

export function ActionsSection({ data, onSaveClient }) {
    const handlePrint = () => {
        onSaveClient();
        window.print();
    };

    const handleGoogleDrive = () => {
        uploadToDrive(data, `faktura_${data.details.number}.pdf`);
    };

    return (
        <Card title="Akcie">
            <div className="flex flex-col gap-4">
                {/* Primary Action - PDF/Print */}
                <button
                    onClick={handlePrint}
                    className="group relative flex items-center justify-center gap-3 px-6 py-4 rounded-xl font-semibold text-white transition-all duration-300 overflow-hidden shadow-md hover:shadow-xl"
                    style={{
                        background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%)',
                    }}
                >
                    {/* Shine effect on hover */}
                    <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                        style={{
                            background: 'linear-gradient(90deg, transparent, white, transparent)',
                        }}
                    />

                    <div className="flex items-center gap-3 relative z-10">
                        <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                            <Printer size={20} />
                        </div>
                        <div className="flex flex-col items-start">
                            <span className="text-base">Stiahnuť PDF / Tlačiť</span>
                            <span className="text-xs opacity-90 font-normal">Uložiť alebo vytlačiť faktúru</span>
                        </div>
                    </div>
                </button>

                {/* Secondary Action - Google Drive */}
                <button
                    onClick={handleGoogleDrive}
                    className="group flex items-center justify-center gap-3 px-6 py-4 rounded-xl font-medium border-2 transition-all duration-300 hover:shadow-lg"
                    style={{
                        borderColor: 'var(--color-border-hover)',
                        backgroundColor: 'var(--color-bg-card)',
                        color: 'var(--color-text-main)',
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = 'var(--color-primary)';
                        e.currentTarget.style.backgroundColor = 'var(--color-primary-light)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'var(--color-border-hover)';
                        e.currentTarget.style.backgroundColor = 'var(--color-bg-card)';
                    }}
                >
                    <div className="flex items-center gap-3">
                        <div
                            className="p-2 rounded-lg transition-colors"
                            style={{ backgroundColor: 'var(--color-primary-light)' }}
                        >
                            <Upload size={20} style={{ color: 'var(--color-primary)' }} />
                        </div>
                        <div className="flex flex-col items-start">
                            <span className="text-base">Nahrať na Google Drive</span>
                            <span className="text-xs" style={{ color: 'var(--color-text-tertiary)' }}>
                                Zálohovať do cloudu
                            </span>
                        </div>
                    </div>
                </button>

                {/* Info Note */}
                <div
                    className="flex items-start gap-2 p-4 rounded-lg"
                    style={{
                        backgroundColor: 'var(--color-primary-light)',
                        border: '1px solid var(--color-primary)',
                        borderLeft: '4px solid var(--color-primary)'
                    }}
                >
                    <FileText size={16} style={{ color: 'var(--color-primary)', marginTop: '2px' }} />
                    <p className="text-xs leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                        <strong>Tip:</strong> Pre uloženie ako PDF zvoľte v tlačiarni "Save as PDF" / "Uložiť ako PDF".
                    </p>
                </div>
            </div>
        </Card>
    );
}
