import React, { useState, useEffect } from 'react';
import { Quote } from 'lucide-react';

const quotes = [
    "Faktúru vystaviť musíš, alebo nie. Nie je skúšania.",
    "Strach zo splatnosti je cesta na temnú stranu.",
    "Trpezlivosť musíš mať, mladý fakturant.",
    "Veľká je sila v DPH, ale pozor si daj.",
    "Splatnosť, ktorú hľadáš, za tebou je.",
    "Vždy dvoch je treba – dodávateľa a odberateľa.",
    "K zisku cesta tŕnistá je.",
    "Zaplať, alebo neplat. Nič medzi tým nie je.",
    "Silný v Exceli som, hmmm.",
    "Keď 900 faktúr vystavíš ty, tak dobre vyzerať nebudeš."
];

export function YodaQuote() {
    const [quote, setQuote] = useState('');

    useEffect(() => {
        // Pick random quote on mount
        const random = quotes[Math.floor(Math.random() * quotes.length)];
        setQuote(random);
    }, []);

    return (
        <div style={{
            marginTop: '2rem',
            padding: '1rem',
            background: '#F0FDF4', // Light green bg
            border: '1px solid #BBF7D0',
            borderRadius: '8px',
            color: '#166534',
            fontSize: '0.85rem',
            fontStyle: 'italic',
            display: 'flex',
            gap: '0.5rem',
            alignItems: 'start'
        }}>
            <Quote size={16} style={{ minWidth: '16px', marginTop: '2px' }} />
            <div>
                <strong>Majster Yoda radí:</strong><br />
                "{quote}"
            </div>
        </div>
    );
}
