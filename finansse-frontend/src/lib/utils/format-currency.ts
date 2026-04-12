export const formatCurrency = (amount: number | string, currency: string = 'PHP'): string => {
    const formatter = new Intl.NumberFormat('en-PH', {
        style: 'currency',
        currency: currency,
    });
    return formatter.format(Number(amount));
};