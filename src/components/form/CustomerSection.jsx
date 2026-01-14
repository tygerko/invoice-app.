import React, { useState, useEffect, useRef } from 'react';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { Search, Save, UserCheck } from 'lucide-react';

export function CustomerSection({ data, onChange, savedClients, onSaveClient }) {
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [filteredClients, setFilteredClients] = useState([]);
    const wrapperRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleNameChange = (e) => {
        const value = e.target.value;
        onChange('customer', 'name', value);

        if (value.length > 0) {
            const filtered = savedClients.filter(c =>
                c.name.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredClients(filtered);
            setShowSuggestions(true);
        } else {
            setShowSuggestions(false);
        }
    };

    const selectClient = (client) => {
        // Populate all fields
        Object.keys(client).forEach(key => {
            onChange('customer', key, client[key]);
        });
        setShowSuggestions(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        onChange('customer', name, value);
    };

    return (
        <Card
            title="Odberateľ"
            action={
                <button
                    onClick={onSaveClient}
                    className="flex items-center gap-2 text-sm font-medium px-3 py-1.5 rounded-md transition-colors"
                    style={{
                        color: 'var(--color-primary)',
                        backgroundColor: 'var(--color-primary-light)'
                    }}
                    title="Uložiť klienta do zoznamu"
                >
                    <Save size={16} />
                    Uložiť
                </button>
            }
        >
            <div style={{ display: 'grid', gap: '1rem' }}>
                <div className="relative" ref={wrapperRef}>
                    <Input
                        label="Názov klienta"
                        name="name"
                        value={data.name}
                        onChange={handleNameChange} // Custom handler
                        placeholder="Začnite písať pre vyhľadanie..."
                        autoComplete="off"
                    />

                    {/* Autocomplete Dropdown */}
                    {showSuggestions && filteredClients.length > 0 && (
                        <div
                            className="absolute z-10 w-full mt-1 border rounded-md shadow-lg overflow-hidden"
                            style={{
                                backgroundColor: 'var(--color-bg-card)',
                                borderColor: 'var(--color-border)',
                                maxHeight: '200px',
                                overflowY: 'auto'
                            }}
                        >
                            {filteredClients.map((client, index) => (
                                <div
                                    key={index}
                                    className="px-4 py-2 cursor-pointer transition-colors text-sm flex items-center justify-between"
                                    style={{ borderBottom: '1px solid var(--color-border)' }}
                                    onClick={() => selectClient(client)}
                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-bg-app)'}
                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                >
                                    <span className="font-medium">{client.name}</span>
                                    {client.ico && <span className="text-xs text-gray-400">{client.ico}</span>}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

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
                />
            </div>
        </Card>
    );
}
