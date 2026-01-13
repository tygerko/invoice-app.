export function calculateInvoice(items, vatPayer) {
    const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    let vatTotal = 0;
    let total = subtotal;

    if (vatPayer) {
        // Calculate VAT per item to be precise
        vatTotal = items.reduce((sum, item) => {
            const itemTotal = item.price * item.quantity;
            return sum + (itemTotal * (item.vatRate / 100));
        }, 0);
        total = subtotal + vatTotal;
    }

    return {
        subtotal,
        vatTotal,
        total
    };
}

export function formatCurrency(amount, currency) {
    return new Intl.NumberFormat(currency === 'CZK' ? 'cs-CZ' : 'sk-SK', {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 2
    }).format(amount);
}
