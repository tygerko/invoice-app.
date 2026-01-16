import yodaImage from '../assets/yoda.png';

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
    "Keď 900 faktúr vystavíš ty, tak dobre vyzerať nebudeš.",
    "Temný kočner blížiť sa."
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
            borderRadius: '12px',
            color: '#166534',
            fontSize: '0.85rem',
            display: 'flex',
            gap: '1rem',
            alignItems: 'center',
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05)'
        }}>
            <img
                src={yodaImage}
                alt="Master Yoda"
                style={{
                    width: '60px',
                    height: '60px',
                    objectFit: 'contain',
                    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
                }}
            />
            <div>
                <strong style={{ display: 'block', marginBottom: '4px', fontSize: '0.9rem' }}>
                    Majster Yoda radí:
                </strong>
                <span style={{ fontStyle: 'italic' }}>
                    "{quote}"
                </span>
            </div>
        </div>
    );
}
