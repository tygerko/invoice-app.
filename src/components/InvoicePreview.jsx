export function InvoicePreview({ data }) {
    return (
        <div className="invoice-preview" style={{
            width: '210mm',
            minHeight: '297mm',
            background: 'white',
            padding: '20mm',
            boxShadow: 'var(--shadow-paper)'
        }}>
            <h1>Faktúra {data.details.number}</h1>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    )
}
