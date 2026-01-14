import React from 'react';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { Trash2, Plus } from 'lucide-react';

export function ItemsSection({ items, currency, onChange }) {

    const updateItem = (id, field, value) => {
        const newItems = items.map(item =>
            item.id === id ? { ...item, [field]: value } : item
        );
        onChange(newItems);
    };

    const addItem = () => {
        const newItem = {
            id: Date.now().toString(),
            description: '',
            quantity: 1,
            price: 0,
            vatRate: 20
        };
        onChange([...items, newItem]);
    };

    const removeItem = (id) => {
        if (items.length === 1) return; // Keep at least one item
        onChange(items.filter(item => item.id !== id));
    };

    const currencySymbol = currency === 'CZK' ? 'Kč' : '€';

    return (
        <Card
            title="Položky faktúry"
            action={
                <button
                    onClick={addItem}
                    className="flex items-center gap-1 text-sm font-medium px-3 py-1.5 rounded-md transition-colors"
                    style={{
                        color: 'var(--color-primary)',
                        backgroundColor: 'var(--color-primary-light)'
                    }}
                >
                    <Plus size={16} />
                    Pridať položku
                </button>
            }
        >
            <div className="flex flex-col gap-2">
                {/* Header Row */}
                <div
                    className="grid gap-3 px-3 mb-1 text-xs font-semibold text-gray-500 uppercase tracking-wider"
                    style={{ gridTemplateColumns: '1fr 65px 100px 70px 30px' }}
                >
                    <div>Popis</div>
                    <div>Mn.</div>
                    <div>Cena/ks ({currencySymbol})</div>
                    <div>DPH %</div>
                    <div></div>
                </div>

                {items.map((item) => (
                    <div
                        key={item.id}
                        className="grid gap-3 p-2.5 rounded-lg border border-dashed hover:border-solid transition-all items-center"
                        style={{
                            gridTemplateColumns: '1fr 65px 100px 70px 30px',
                            borderColor: 'var(--color-border)',
                            backgroundColor: 'var(--color-bg-app)'
                        }}
                    >
                        <Input
                            value={item.description}
                            onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                            placeholder="Názov položky"
                            className="bg-white"
                        />
                        <Input
                            type="number"
                            min="0"
                            value={item.quantity}
                            onChange={(e) => updateItem(item.id, 'quantity', Number(e.target.value))}
                            className="bg-white"
                        />
                        <Input
                            type="number"
                            min="0"
                            step="0.01"
                            value={item.price}
                            onChange={(e) => updateItem(item.id, 'price', Number(e.target.value))}
                            className="bg-white"
                        />
                        <Input
                            type="number"
                            value={item.vatRate}
                            onChange={(e) => updateItem(item.id, 'vatRate', Number(e.target.value))}
                            className="bg-white"
                        />
                        <div className="flex justify-end">
                            <button
                                onClick={() => removeItem(item.id)}
                                className="p-1.5 rounded-md hover:bg-red-50 text-red-500 transition-colors"
                                title="Odstrániť"
                                disabled={items.length === 1}
                                style={{ opacity: items.length === 1 ? 0.3 : 1 }}
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    );
}
