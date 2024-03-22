export default class Fare {
  static calculate(value: number) {
    return (10 / 100) * value + value
  }
}
