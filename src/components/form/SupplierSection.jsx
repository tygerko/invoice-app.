import React from 'react';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';

export function SupplierSection({ data, onChange }) {
    const handleChange = (e) => {
        const { name, value } = e.target;
        onChange('supplier', name, value);
    };

    return (
        <Card title="Dodávateľ">
            <div style={{ display: 'grid', gap: '1rem' }}>
                <Input
                    label="Názov firmy"
                    name="name"
                    value={data.name}
                    onChange={handleChange}
                    placeholder="Moja Firma s.r.o."
                />

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <Input
                        label="IČO"
                        name="ico"
                        value={data.ico}
                        onChange={handleChange}
                    />
                    <Input
                        label="DIČ / IČ DPH"
                        name="dic"
                        value={data.dic}
                        onChange={handleChange}
                    />
                </div>

                <Input
                    label="Adresa"
                    name="address"
                    value={data.address}
                    onChange={handleChange}
                    placeholder="Ulica, Mesto, PSČ"
                />

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <Input
                        label="Banka"
                        name="bankName"
                        value={data.bankName}
                        onChange={handleChange}
                    />
                    <Input
                        label="SWIFT / BIC"
                        name="swift"
                        value={data.swift}
                        onChange={handleChange}
                    />
                </div>

                <Input
                    label="IBAN"
                    name="iban"
                    value={data.iban}
                    onChange={handleChange}
                />
            </div>
        </Card>
    );
}
