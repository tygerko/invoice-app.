import { useState, useEffect } from 'react'
import { InvoiceForm } from './components/InvoiceForm'
import { InvoicePreview } from './components/InvoicePreview'
import './App.css'

const initialInvoiceData = {
  supplier: {
    name: 'Moja Firma s.r.o.',
    ico: '12345678',
    dic: 'SK2020202020',
    address: 'Obchodná 1, 811 01 Bratislava',
    bankName: 'Tatra Banka',
    iban: 'SK1211000000001234567890',
    swift: 'TATRQX'
  },
  customer: {
    name: 'Klient s.r.o.',
    ico: '87654321',
    dic: '',
    address: 'Hlavná 10, 040 01 Košice'
  },
  details: {
    number: '2025001',
    issueDate: new Date().toISOString().split('T')[0],
    dueDate: new Date().toISOString().split('T')[0],
    currency: 'EUR',
    market: 'SK',
    vatPayer: false,
    showQrCode: true
  },
  items: [
    { id: '1', description: 'Konzultačné služby', quantity: 1, price: 100, vatRate: 20 }
  ]
}

function App() {
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem('invoiceData')
    return saved ? JSON.parse(saved) : initialInvoiceData
  })

  useEffect(() => {
    localStorage.setItem('invoiceData', JSON.stringify(data))
  }, [data])

  return (
    <div className="app-container">
      <div className="sidebar">
        <InvoiceForm data={data} onChange={setData} />
      </div>
      <div className="preview-area">
        <div className="preview-scaler">
          <InvoicePreview data={data} />
        </div>
      </div>
    </div>
  )
}

export default App
