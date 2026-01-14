import React from 'react';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { Trash2, Plus } from 'lucide-react';

export function ItemsSection({ items, onChange }) {

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
            <div className="flex flex-col gap-4">
                {items.map((item, index) => (
                    <div
                        key={item.id}
                        className="grid gap-3 p-4 rounded-lg border border-dashed hover:border-solid transition-all"
                        style={{
                            gridTemplateColumns: 'minmax(0, 4fr) 1fr 2fr 1fr auto',
                            borderColor: 'var(--color-border)',
                            backgroundColor: 'var(--color-bg-app)'
                        }}
                    >
                        <Input
                            label={index === 0 ? "Popis" : ""}
                            value={item.description}
                            onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                            placeholder="Názov položky"
                        />
                        <Input
                            label={index === 0 ? "Mn." : ""}
                            type="number"
                            min="0"
                            value={item.quantity}
                            onChange={(e) => updateItem(item.id, 'quantity', Number(e.target.value))}
                        />
                        <Input
                            label={index === 0 ? "Cena/ks (€)" : ""}
                            type="number"
                            min="0"
                            step="0.01"
                            value={item.price}
                            onChange={(e) => updateItem(item.id, 'price', Number(e.target.value))}
                        />
                        <Input
                            label={index === 0 ? "DPH %" : ""}
                            type="number"
                            value={item.vatRate}
                            onChange={(e) => updateItem(item.id, 'vatRate', Number(e.target.value))}
                        />
                        <div className={`flex items-end ${index === 0 ? 'pb-2' : ''}`}>
                            <button
                                onClick={() => removeItem(item.id)}
                                className="p-2 rounded-md hover:bg-red-50 text-red-500 transition-colors"
                                title="Odstrániť"
                                disabled={items.length === 1}
                                style={{ opacity: items.length === 1 ? 0.3 : 1 }}
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    );
}
