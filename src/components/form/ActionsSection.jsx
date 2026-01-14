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
                {/* Primary Action - PDF/Print with modern design */}
                <button
                    onClick={handlePrint}
                    className="group relative overflow-hidden flex items-center gap-3 px-5 py-3.5 rounded-xl font-semibold text-white transition-all duration-300 shadow-sm hover:shadow-lg active:scale-[0.98]"
                    style={{
                        background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                    }}
                >
                    {/* Animated shine effect */}
                    <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{
                            background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)',
                            transform: 'translateX(-100%)',
                            animation: 'shine 2s infinite'
                        }}
                    />

                    <div
                        className="flex items-center justify-center w-10 h-10 rounded-lg"
                        style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
                    >
                        <Download size={20} strokeWidth={2.5} />
                    </div>

                    <div className="flex-1 text-left">
                        <div className="font-semibold text-base">Stiahnuť PDF / Tlačiť</div>
                        <div className="text-xs opacity-90 font-normal">Uložiť alebo vytlačiť faktúru</div>
                    </div>
                </button>

                {/* Secondary Action - Google Drive with modern design */}
                <button
                    onClick={handleGoogleDrive}
                    className="group flex items-center gap-3 px-5 py-3.5 rounded-xl font-medium border-2 transition-all duration-300 hover:shadow-md active:scale-[0.98]"
                    style={{
                        borderColor: '#e5e7eb',
                        backgroundColor: 'white',
                        color: '#111827',
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = '#3b82f6';
                        e.currentTarget.style.backgroundColor = '#eff6ff';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = '#e5e7eb';
                        e.currentTarget.style.backgroundColor = 'white';
                    }}
                >
                    <div
                        className="flex items-center justify-center w-10 h-10 rounded-lg transition-colors"
                        style={{ backgroundColor: '#eff6ff' }}
                    >
                        <Cloud size={20} strokeWidth={2.5} style={{ color: '#3b82f6' }} />
                    </div>

                    <div className="flex-1 text-left">
                        <div className="font-semibold text-base">Nahrať na Google Drive</div>
                        <div className="text-xs" style={{ color: '#6b7280' }}>Zálohovať do cloudu</div>
                    </div>
                </button>

                {/* Info Note with modern styling */}
                <div
                    className="flex items-start gap-2.5 p-3.5 rounded-lg text-xs"
                    style={{
                        backgroundColor: '#eff6ff',
                        border: '1px solid #bfdbfe',
                        color: '#1e40af'
                    }}
                >
                    <Info size={16} style={{ marginTop: '1px', flexShrink: 0, color: '#3b82f6' }} />
                    <p className="leading-relaxed">
                        <strong>Tip:</strong> Pre uloženie ako PDF zvoľte v tlačiarni "Save as PDF" / "Uložiť ako PDF".
                    </p>
                </div>
            </div>

            <style>{`
                @keyframes shine {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
            `}</style>
        </Card>
    );
}
