import React from 'react'
import { Plus, Trash2, ArrowRight, UploadCloud } from 'lucide-react'
import { YodaQuote } from './YodaQuote'
import { uploadToDrive } from '../services/googleDrive'
import './InvoiceForm.css'

export function InvoiceForm({ data, onChange }) {

    const updateField = (section, field, value) => {
        onChange({
            ...data,
            [section]: {
                ...data[section],
                [field]: value
            }
        })
    }

    const updateItem = (index, field, value) => {
        const newItems = [...data.items]
        newItems[index] = { ...newItems[index], [field]: value }
        onChange({ ...data, items: newItems })
    }

    const addItem = () => {
        onChange({
            ...data,
            items: [
                ...data.items,
                { id: crypto.randomUUID(), description: '', quantity: 1, price: 0, vatRate: 20 }
            ]
        })
    }

    const removeItem = (index) => {
        const newItems = data.items.filter((_, i) => i !== index)
        onChange({ ...data, items: newItems })
    }

    return (
        <div className="invoice-form">
            <div className="header">
                <h1>Nová Faktúra</h1>
            </div>

            {/* Settings Section */}
            <div className="form-section">
                <h3>Nastavenia</h3>
                <div className="form-row">
                    <div className="form-group">
                        <label>Jazyk / Trh</label>
                        <select
                            value={data.details.market}
                            onChange={(e) => updateField('details', 'market', e.target.value)}
                        >
                            <option value="SK">Slovensko (EUR)</option>
                            <option value="CZ">Česko (CZK)</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Mena</label>
                        <select
                            value={data.details.currency}
                            onChange={(e) => updateField('details', 'currency', e.target.value)}
                        >
                            <option value="EUR">EUR (€)</option>
                            <option value="CZK">CZK (Kč)</option>
                        </select>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group">
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <input
                                type="checkbox"
                                checked={data.details.vatPayer}
                                onChange={(e) => updateField('details', 'vatPayer', e.target.checked)}
                            />
                            Platiteľ DPH
                        </label>
                    </div>
                    <div className="form-group">
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <input
                                type="checkbox"
                                checked={data.details.showQrCode}
                                onChange={(e) => updateField('details', 'showQrCode', e.target.checked)}
                            />
                            Zobraziť QR Kód
                        </label>
                    </div>
                </div>
            </div>

            {/* Supplier Section */}
            <div className="form-section">
                <h3>Dodávateľ</h3>
                <div className="form-group">
                    <label>Názov firmy / Meno</label>
                    <input
                        value={data.supplier.name}
                        onChange={(e) => updateField('supplier', 'name', e.target.value)}
                        placeholder="Vaša firma s.r.o."
                    />
                </div>
                <div className="form-row">
                    <div className="form-group">
                        <label>IČO</label>
                        <input
                            value={data.supplier.ico}
                            onChange={(e) => updateField('supplier', 'ico', e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>DIČ / IČ DPH</label>
                        <input
                            value={data.supplier.dic}
                            onChange={(e) => updateField('supplier', 'dic', e.target.value)}
                        />
                    </div>
                </div>
                <div className="form-group">
                    <label>Adresa</label>
                    <textarea
                        value={data.supplier.address}
                        onChange={(e) => updateField('supplier', 'address', e.target.value)}
                        rows={2}
                    />
                </div>
                <div className="form-group">
                    <label>Banka</label>
                    <input
                        value={data.supplier.bankName}
                        onChange={(e) => updateField('supplier', 'bankName', e.target.value)}
                        placeholder="Názov banky"
                    />
                </div>
                <div className="form-row">
                    <div className="form-group">
                        <label>IBAN</label>
                        <input
                            value={data.supplier.iban}
                            onChange={(e) => updateField('supplier', 'iban', e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>SWIFT / BIC</label>
                        <input
                            value={data.supplier.swift}
                            onChange={(e) => updateField('supplier', 'swift', e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* Customer Section */}
            <div className="form-section">
                <h3>Odberateľ</h3>
                <div className="form-group">
                    <label>Názov firmy / Meno</label>
                    <input
                        value={data.customer.name}
                        onChange={(e) => updateField('customer', 'name', e.target.value)}
                        placeholder="Klient s.r.o."
                    />
                </div>
                <div className="form-row">
                    <div className="form-group">
                        <label>IČO</label>
                        <input
                            value={data.customer.ico}
                            onChange={(e) => updateField('customer', 'ico', e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>DIČ / IČ DPH</label>
                        <input
                            value={data.customer.dic}
                            onChange={(e) => updateField('customer', 'dic', e.target.value)}
                        />
                    </div>
                </div>
                <div className="form-group">
                    <label>Adresa</label>
                    <textarea
                        value={data.customer.address}
                        onChange={(e) => updateField('customer', 'address', e.target.value)}
                        rows={2}
                    />
                </div>
            </div>

            {/* Invoice Details */}
            <div className="form-section">
                <h3>Detaily</h3>
                <div className="form-group">
                    <label>Číslo faktúry</label>
                    <input
                        value={data.details.number}
                        onChange={(e) => updateField('details', 'number', e.target.value)}
                    />
                </div>
                <div className="form-row">
                    <div className="form-group">
                        <label>Dátum vystavenia</label>
                        <input
                            type="date"
                            value={data.details.issueDate}
                            onChange={(e) => updateField('details', 'issueDate', e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Dátum splatnosti</label>
                        <input
                            type="date"
                            value={data.details.dueDate}
                            onChange={(e) => updateField('details', 'dueDate', e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* Items Section */}
            <div className="form-section">
                <h3>Položky</h3>
                <div className="items-list">
                    {data.items.map((item, index) => (
                        <div key={item.id} className="item-row">
                            <div style={{ flex: 3 }}>
                                <input
                                    placeholder="Popis služby/tovaru"
                                    value={item.description}
                                    onChange={(e) => updateItem(index, 'description', e.target.value)}
                                    style={{ width: '100%' }}
                                />
                            </div>
                            <div style={{ flex: 1 }}>
                                <input
                                    type="number"
                                    placeholder="Mn."
                                    value={item.quantity}
                                    onChange={(e) => updateItem(index, 'quantity', Number(e.target.value))}
                                    style={{ width: '100%' }}
                                />
                            </div>
                            <div style={{ flex: 1.5 }}>
                                <input
                                    type="number"
                                    placeholder="Cena"
                                    value={item.price}
                                    onChange={(e) => updateItem(index, 'price', Number(e.target.value))}
                                    style={{ width: '100%' }}
                                />
                            </div>
                            {data.details.vatPayer && (
                                <div style={{ flex: 1 }}>
                                    <input
                                        type="number"
                                        placeholder="DPH %"
                                        value={item.vatRate}
                                        onChange={(e) => updateItem(index, 'vatRate', Number(e.target.value))}
                                        style={{ width: '100%' }}
                                    />
                                </div>
                            )}
                            <button className="btn-icon" onClick={() => removeItem(index)}>
                                <Trash2 size={18} />
                            </button>
                        </div>
                    ))}
                </div>
                <button className="btn-secondary" onClick={addItem} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginTop: '1rem' }}>
                    <Plus size={16} /> Pridať položku
                </button>
            </div>

            {/* Actions */}
            <div className="form-section" style={{ marginTop: 'auto', borderTop: '2px solid var(--color-border)', paddingTop: '2rem' }}>
                <div className="form-row">
                    <button className="btn-primary" onClick={() => window.print()} style={{ flex: 1 }}>
                        Stiahnuť PDF / Tlačiť
                    </button>
                    <button
                        className="btn-secondary"
                        onClick={() => uploadToDrive(data, `faktura_${data.details.number}.pdf`)}
                        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                        title="Vyžaduje Google Client ID"
                    >
                        <UploadCloud size={18} /> G-Drive
                    </button>
                </div>
                <p style={{ fontSize: '0.75rem', color: '#666', marginTop: '0.5rem', textAlign: 'center' }}>
                    Pre uloženie ako PDF zvoľte v tlačiarni "Save as PDF" / "Uložiť ako PDF".
                </p>

                <YodaQuote />
            </div>
        </div>
    )
}
