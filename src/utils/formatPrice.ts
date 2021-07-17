const intl = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL'
});

export const formatPrice = (price: number) => {
  return intl.format(price);
}