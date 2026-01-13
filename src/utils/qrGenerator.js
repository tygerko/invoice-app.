
// Generates string for CZ "QR Platba" (SPAD)
export function generateSpadString({ iban, amount, currency, vs, date, message }) {
    if (!iban) return '';

    // Basic SPAD format: SPD*1.0*ACC:IBAN*AM:AMOUNT*CC:CZK...
    const keys = [
        `SPD*1.0`,
        `ACC:${iban}`,
        `AM:${amount.toFixed(2)}`,
        `CC:${currency}`,
        vs ? `X-VS:${vs}` : '',
        date ? `DT:${date.replace(/-/g, '')}` : '', // YYYYMMDD
        message ? `MSG:${message.slice(0, 60).toUpperCase()}` : '' // Max 60 chars
    ];

    return keys.filter(Boolean).join('*');
}

// Generates string for SEPA QR (EPC069-12) - Usage in SK/DE for EUR
export function generateSepaString({ iban, bic, amount, name, message, vs }) {
    if (!iban || !name) return '';

    return [
        'BCD', // Service Tag
        '002', // Version
        '1', // Character Set (1=UTF-8)
        'SCT', // Identification (SEPA Credit Transfer)
        bic || '', // BIC (Optional)
        name, // Beneficiary Name
        iban, // Beneficiary IBAN
        `EUR${amount.toFixed(2)}`, // Amount
        '', // Purpose Code (Optional)
        vs ? `/VS/${vs}` : (message || ''), // Remittance Info (Reference or Unstructured)
        '', // Beneficiary Info (Optional)
        ''  // Internal Use (Optional)
    ].join('\n');
}

export function getQrString(data, total) {
    const { market, currency } = data.details;
    const commonData = {
        iban: data.supplier.iban?.replace(/\s/g, ''),
        amount: total,
        currency: currency,
        vs: data.details.vs,
        date: data.details.dueDate,
        message: `Faktúra ${data.details.number}`,
        name: data.supplier.name,
        bic: data.supplier.swift // SEPA needs BIC often
    };

    if (currency === 'CZK') {
        // Force SPAD for CZK
        return generateSpadString(commonData);
    } else if (currency === 'EUR') {
        // Force SEPA for EUR (Works in SK, DE, etc.)
        return generateSepaString(commonData);
    }

    return '';
}
