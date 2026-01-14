import React from 'react';
import { DetailsSection } from './form/DetailsSection';
import { SupplierSection } from './form/SupplierSection';
import { CustomerSection } from './form/CustomerSection';
import { ItemsSection } from './form/ItemsSection';

export function InvoiceForm({ data, onChange, savedClients, onSaveClient }) {
    // Helpers to adapt to the section's expected onChange signature
    const updateNested = (section, field, value) => {
        onChange.updateNested(section, field, value);
    };

    const updateItems = (newItems) => {
        onChange.updateSection('items', newItems);
    };

    return (
        <div className="flex flex-col gap-6 pb-20">
            <div className="flex items-center justify-between mb-2">
                <h1 className="text-2xl font-bold tracking-tight" style={{ color: 'var(--color-text-main)' }}>
                    Nová faktúra
                </h1>
                <div className="text-sm text-gray-500">
                    # {data.details.number}
                </div>
            </div>

            <DetailsSection
                data={data.details}
                onChange={updateNested}
            />

            <SupplierSection
                data={data.supplier}
                onChange={updateNested}
            />

            <CustomerSection
                data={data.customer}
                onChange={updateNested}
                savedClients={savedClients}
                onSaveClient={onSaveClient}
            />

            <ItemsSection
                items={data.items}
                onChange={updateItems}
            />
        </div>
    );
}
