import React from 'react';
import { Card } from '../ui/Card';
import { Download, Cloud, Info } from 'lucide-react';
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
            <div className="flex flex-col gap-3">
                {/* Primary Glassy Button - PDF/Print */}
                <button
                    onClick={handlePrint}
                    className="group relative overflow-hidden flex items-center justify-center gap-3 px-6 py-4 rounded-2xl font-semibold text-white transition-all duration-300 active:scale-[0.97]"
                    style={{
                        background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)',
                        boxShadow: '0 8px 32px rgba(139, 92, 246, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                        border: '1px solid rgba(255, 255, 255, 0.18)',
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 12px 40px rgba(139, 92, 246, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 8px 32px rgba(139, 92, 246, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
                    }}
                >
                    {/* Glassy overlay */}
                    <div
                        className="absolute inset-0"
                        style={{
                            background: 'linear-gradient(180deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 100%)',
                            pointerEvents: 'none'
                        }}
                    />

                    <Download size={20} strokeWidth={2.5} className="relative z-10" />
                    <span className="relative z-10 text-base">Stiahnuť PDF / Tlačiť</span>
                </button>

                {/* Secondary Glassy Button - Google Drive */}
                <button
                    onClick={handleGoogleDrive}
                    className="group relative overflow-hidden flex items-center justify-center gap-3 px-6 py-4 rounded-2xl font-medium transition-all duration-300 active:scale-[0.97]"
                    style={{
                        background: 'rgba(255, 255, 255, 0.8)',
                        backdropFilter: 'blur(10px)',
                        boxShadow: '0 4px 24px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.5)',
                        border: '1px solid rgba(255, 255, 255, 0.5)',
                        color: '#111827',
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.5)';
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.95)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 4px 24px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.5)';
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.8)';
                    }}
                >
                    <Cloud size={20} strokeWidth={2.5} style={{ color: '#6366f1' }} />
                    <span className="text-base">Nahrať na Google Drive</span>
                </button>

                {/* Info Note with glassy effect */}
                <div
                    className="flex items-start gap-2.5 p-3.5 rounded-xl text-xs"
                    style={{
                        background: 'rgba(239, 246, 255, 0.6)',
                        backdropFilter: 'blur(8px)',
                        border: '1px solid rgba(191, 219, 254, 0.5)',
                        color: '#1e40af'
                    }}
                >
                    <Info size={16} style={{ marginTop: '1px', flexShrink: 0, color: '#3b82f6' }} />
                    <p className="leading-relaxed">
                        <strong>Tip:</strong> Pre uloženie ako PDF zvoľte v tlačiarni "Save as PDF" / "Uložiť ako PDF".
                    </p>
                </div>
            </div>
        </Card>
    );
}
