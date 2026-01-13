import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { calculateInvoice, formatCurrency } from '../utils/calculations';
import { getQrString } from '../utils/qrGenerator';
import './InvoicePreview.css';

export function InvoicePreview({ data }) {
    const { details, supplier, customer, items } = data;
    const { subtotal, vatTotal, total } = calculateInvoice(items, details.vatPayer);

    const qrValue = getQrString(data, total);

    return (
        <div className="invoice-preview">
            {/* Header */}
            <div className="invoice-header">
                <div className="header-left">
                    <div className="invoice-title">Faktúra {details.number}</div>
                    <div className="invoice-number">Variabilný symbol: {details.vs || details.number}</div>
                </div>
                <div className="provider-box">
                    <div className="company-name">{supplier.name || 'Dodávateľ'}</div>
                    <div>{supplier.ico && `IČO: ${supplier.ico}`}</div>
                </div>
            </div>

            {/* Addresses */}
            <div className="participants-grid">
                {/* Supplier */}
                <div className="participant-box">
                    <div className="box-title">Dodávateľ</div>
                    <div className="company-name">{supplier.name}</div>
                    <div style={{ whiteSpace: 'pre-line', marginBottom: '1rem' }}>{supplier.address}</div>

                    {supplier.ico && (
                        <div className="detail-row">
                            <span className="label">IČO:</span>
                            <span>{supplier.ico}</span>
                        </div>
                    )}
                    {supplier.dic && (
                        <div className="detail-row">
                            <span className="label">DIČ:</span>
                            <span>{supplier.dic}</span>
                        </div>
                    )}
                    <div className="detail-row" style={{ marginTop: '1rem' }}>
                        <span className="label">Banka:</span>
                        <span>{supplier.bankName}</span>
                    </div>
                    <div className="detail-row">
                        <span className="label">IBAN:</span>
                        <span>{supplier.iban}</span>
                    </div>
                    <div className="detail-row">
                        <span className="label">SWIFT:</span>
                        <span>{supplier.swift}</span>
                    </div>
                </div>

                {/* Customer */}
                <div className="participant-box">
                    <div className="box-title">Odberateľ</div>
                    <div className="company-name">{customer.name}</div>
                    <div style={{ whiteSpace: 'pre-line', marginBottom: '1rem' }}>{customer.address}</div>

                    {customer.ico && (
                        <div className="detail-row">
                            <span className="label">IČO:</span>
                            <span>{customer.ico}</span>
                        </div>
                    )}
                    {customer.dic && (
                        <div className="detail-row">
                            <span className="label">DIČ:</span>
                            <span>{customer.dic}</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Dates */}
            <div className="info-bar">
                <div className="info-item">
                    <span className="info-label">Dátum vystavenia</span>
                    <span className="info-value">{new Date(details.issueDate).toLocaleDateString('sk-SK')}</span>
                </div>
                <div className="info-item">
                    <span className="info-label">Dátum dodania</span>
                    <span className="info-value">{new Date(details.issueDate).toLocaleDateString('sk-SK')}</span>
                </div>
                <div className="info-item">
                    <span className="info-label">Dátum splatnosti</span>
                    <span className="info-value">{new Date(details.dueDate).toLocaleDateString('sk-SK')}</span>
                </div>
                <div className="info-item">
                    <span className="info-label">Forma úhrady</span>
                    <span className="info-value">Bankový prevod</span>
                </div>
            </div>

            {/* Items Table */}
            <table className="items-table">
                <thead>
                    <tr>
                        <th>Položka</th>
                        <th className="col-right">Množstvo</th>
                        <th className="col-right">Cena/j.</th>
                        {details.vatPayer && <th className="col-right">DPH %</th>}
                        <th className="col-right">Spolu</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map(item => (
                        <tr key={item.id}>
                            <td>{item.description}</td>
                            <td className="col-right">{item.quantity}</td>
                            <td className="col-right">{formatCurrency(item.price, details.currency)}</td>
                            {details.vatPayer && <td className="col-right">{item.vatRate}%</td>}
                            <td className="col-right">
                                {formatCurrency(item.price * item.quantity, details.currency)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Totals */}
            <div className="totals-section">
                <div className="totals-box">
                    {details.vatPayer && (
                        <>
                            <div className="total-row">
                                <span>Základ:</span>
                                <span>{formatCurrency(subtotal, details.currency)}</span>
                            </div>
                            <div className="total-row">
                                <span>DPH:</span>
                                <span>{formatCurrency(vatTotal, details.currency)}</span>
                            </div>
                        </>
                    )}
                    <div className="total-row final">
                        <span>Celkom k úhrade:</span>
                        <span>{formatCurrency(total, details.currency)}</span>
                    </div>
                </div>
            </div>

            {/* Footer / QR */}
            <div className="footer-section">
                <div className="left-footer">
                    {details.showQrCode && qrValue && (
                        <div className="qr-box">
                            <QRCodeSVG value={qrValue} size={128} level="M" />
                            <div style={{ fontSize: '0.7rem', marginTop: '5px', textAlign: 'center' }}>
                                {details.currency === 'CZK' ? 'QR Platba' : 'PAY by square / SEPA'}
                            </div>
                        </div>
                    )}
                </div>

                <div className="signature-box">
                    Podpis a pečiatka
                </div>
            </div>
        </div>
    );
}
