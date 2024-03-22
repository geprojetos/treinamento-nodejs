export default class EmailDomain {
  static isValidEmail(input: string) {
    const validation = /\S+@\S+\.\S+/
    return validation.test(input)
  }
}
