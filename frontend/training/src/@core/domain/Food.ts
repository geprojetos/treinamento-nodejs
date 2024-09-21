interface IFood {
  name: string
  price: number
  category: string
}

export default class Food {
  public error
  private _name: string
  private _price: number
  private _category: string

  constructor(input: IFood) {
    this._name = input.name
    this._price = input.price
    this._category = input.category
    this.error = {}
    this._validate()
  }

  private _validate() {
    if (!this._name) {
      this.error = { message: "Name is required" }
      return
    }
    if (!this._price) {
      this.error = { message: "Price is required" }
      return
    }
    if (!this._category) {
      this.error = { message: "Category is required" }
      return
    }
    this.error = {}
  }

  isInValid(): boolean {
    return !!Object.keys(this.error).length
  }
}
