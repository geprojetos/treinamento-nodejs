export default class Food {
  static calculateFare(price: number) {
    return (10 / 100) * price + price
  }
}
