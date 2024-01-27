export default class Food {
  constructor() {}

  calculateFare(price: number) {
    return (10 / 100) * price + price
  }
}
