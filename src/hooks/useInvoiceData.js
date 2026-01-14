import { useState, useEffect, useCallback } from 'react';

const INITIAL_INVOICE_DATA = {
    supplier: {
        name: 'Moja Firma s.r.o.',
        ico: '',
        dic: '',
        address: '',
        bankName: '',
        iban: '',
        swift: ''
    },
    customer: {
        name: '',
        ico: '',
        dic: '',
        address: ''
    },
    details: {
        number: new Date().getFullYear() + '001',
        issueDate: new Date().toISOString().split('T')[0],
        dueDate: new Date().toISOString().split('T')[0],
        currency: 'EUR',
        market: 'SK',
        vatPayer: false,
        showQrCode: true
    },
    items: [
        { id: '1', description: 'Konzultačné služby', quantity: 1, price: 0, vatRate: 20 }
    ]
};

export function useInvoiceData() {
    // Main Invoice State
    const [data, setData] = useState(() => {
        try {
            const saved = localStorage.getItem('invoiceData');
            return saved ? JSON.parse(saved) : INITIAL_INVOICE_DATA;
        } catch (e) {
            console.error('Failed to load invoice data', e);
            return INITIAL_INVOICE_DATA;
        }
    });

    // Saved Clients State
    const [savedClients, setSavedClients] = useState(() => {
        try {
            const saved = localStorage.getItem('invoice_saved_clients');
            return saved ? JSON.parse(saved) : [];
        } catch (e) {
            console.error('Failed to load saved clients', e);
            return [];
        }
    });

    // Persistence
    useEffect(() => {
        localStorage.setItem('invoiceData', JSON.stringify(data));
    }, [data]);

    useEffect(() => {
        localStorage.setItem('invoice_saved_clients', JSON.stringify(savedClients));
    }, [savedClients]);

    // Actions
    const updateSection = useCallback((section, value) => {
        setData(prev => ({ ...prev, [section]: value }));
    }, []);

    const updateNested = useCallback((section, field, value) => {
        setData(prev => ({
            ...prev,
            [section]: { ...prev[section], [field]: value }
        }));
    }, []);

    // Client Management
    const searchClients = useCallback((query) => {
        if (!query) return [];
        const lowerQuery = query.toLowerCase();
        return savedClients.filter(client =>
            client.name.toLowerCase().includes(lowerQuery) ||
            client.ico.includes(lowerQuery)
        );
    }, [savedClients]);

    const saveCurrentClient = useCallback(() => {
        const newClient = { ...data.customer };
        if (!newClient.name) return;

        setSavedClients(prev => {
            // Remove existing if same name/ico to update it
            const filtered = prev.filter(c => c.name !== newClient.name);
            return [...filtered, newClient];
        });
    }, [data.customer]);

    const removeClient = useCallback((clientName) => {
        setSavedClients(prev => prev.filter(c => c.name !== clientName));
    }, []);

    return {
        data,
        setData,
        updateSection,
        updateNested,
        savedClients,
        searchClients,
        saveCurrentClient,
        removeClient
    };
}
