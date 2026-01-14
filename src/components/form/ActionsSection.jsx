import React from 'react';
import { Card } from '../ui/Card';
import { Printer, Upload } from 'lucide-react';
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
                <div className="grid grid-cols-2 gap-3">
                    <button
                        onClick={handlePrint}
                        className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all hover:shadow-md"
                        style={{
                            backgroundColor: 'var(--color-primary)',
                            color: 'white'
                        }}
                    >
                        <Printer size={18} />
                        Stiahnuť PDF / Tlačiť
                    </button>

                    <button
                        onClick={handleGoogleDrive}
                        className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium border transition-all hover:shadow-md"
                        style={{
                            borderColor: 'var(--color-border)',
                            backgroundColor: 'white',
                            color: 'var(--color-text-main)'
                        }}
                        title="Nahrať na Google Drive"
                    >
                        <Upload size={18} />
                        Google Drive
                    </button>
                </div>

                <p className="text-xs text-center" style={{ color: 'var(--color-text-secondary)' }}>
                    Pre uloženie ako PDF zvoľte v tlačiarni "Save as PDF" / "Uložiť ako PDF".
                </p>
            </div>
        </Card>
    );
}
