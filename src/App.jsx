import { useInvoiceData } from './hooks/useInvoiceData'
import { InvoiceForm } from './components/InvoiceForm'
import { InvoicePreview } from './components/InvoicePreview'
import { PreviewScaler } from './components/ui/PreviewScaler'
import './App.css'

function App() {
  const {
    data,
    updateNested,
    updateSection,
    savedClients,
    saveCurrentClient
  } = useInvoiceData();

  // Passing the hook methods as a clearer API object for the form
  const formOnChange = {
    updateNested,
    updateSection
  };

  return (
    <div className="app-container">
      <div className="sidebar">
        <InvoiceForm
          data={data}
          onChange={formOnChange}
          savedClients={savedClients}
          onSaveClient={saveCurrentClient}
        />
      </div>
      <div className="preview-area">
        <PreviewScaler>
          <InvoicePreview data={data} />
        </PreviewScaler>
      </div>
    </div>
  )
}

export default App
