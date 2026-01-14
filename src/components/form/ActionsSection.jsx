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

    return (
        <Card title="Akcie">
            <div className="flex flex-wrap gap-3 items-center">
                <button
                    onClick={handlePrint}
                    className="btn-primary-modern"
                >
                    <Download size={18} strokeWidth={2.5} />
                    <span>PDF / Tlačiť</span>
                </button>

                <button
                    onClick={handleGoogleDrive}
                    className="btn-secondary-glass"
                >
                    <Cloud size={18} strokeWidth={2.5} />
                    <span>Google Drive</span>
                </button>
            </div>

            <p className="mt-4 text-xs text-gray-500 font-medium">
                Tip: Pre uloženie ako PDF zvoľte v tlačiarni "Uložiť ako PDF".
            </p>
        </Card>
    );
}
