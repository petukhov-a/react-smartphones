export const productsString = (count: number) => {
    const lastDigit = count % 10;
    const twoLastDigits = count % 100;
      
    if (twoLastDigits === 11) {
      return 'товаров'
    }
    if (lastDigit === 1) {
      return 'товар';
    }
    if (lastDigit > 1 && lastDigit < 5) {
      return 'товара';
    }
    return 'товаров';
  }