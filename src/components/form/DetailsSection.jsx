import React from 'react';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';

export function DetailsSection({ data, onChange }) {
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        onChange('details', name, type === 'checkbox' ? checked : value);
    };

    return (
        <Card title="Detaily faktúry">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
                <Input
                    label="Číslo faktúry"
                    name="number"
                    value={data.number}
                    onChange={handleChange}
                />
                <Input
                    label="Dátum vystavenia"
                    type="date"
                    name="issueDate"
                    value={data.issueDate}
                    onChange={handleChange}
                />
                <Input
                    label="Dátum splatnosti"
                    type="date"
                    name="dueDate"
                    value={data.dueDate}
                    onChange={handleChange}
                />
                <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-gray-700">Mena</label>
                    <select
                        name="currency"
                        value={data.currency}
                        onChange={(e) => {
                            const newCurrency = e.target.value;
                            onChange('details', 'currency', newCurrency);
                            onChange('details', 'market', newCurrency === 'CZK' ? 'CZ' : 'SK');
                        }}
                        className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    >
                        <option value="EUR">EUR (€)</option>
                        <option value="CZK">CZK (Kč)</option>
                    </select>
                </div>
            </div>

            <div className="mt-4 flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                        type="checkbox"
                        name="vatPayer"
                        checked={data.vatPayer}
                        onChange={handleChange}
                        className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span className="text-sm">Platca DPH</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                        type="checkbox"
                        name="showQrCode"
                        checked={data.showQrCode}
                        onChange={handleChange}
                        className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span className="text-sm">Zobraziť QR kód</span>
                </label>
            </div>
        </Card>
    );
}
