export default class PasswordDomain {
  static isInValidPassword(input: string) {
    return input.length <= 3
  }
}
