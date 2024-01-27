interface IFoodV3 {
  id: string
  name: string
  price: number
}

export default interface IFoodsV3 {
  getFoods(): Promise<IFoodV3[]>
}
export { IFoodV3 }
