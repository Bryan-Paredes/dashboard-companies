export const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-GT', {
        style: 'currency',
        currency: 'GTQ',
    }).format(price);
}