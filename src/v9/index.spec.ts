import axios from "axios"
import IRepository from "./IRepository"
import UseCaseFood from "./UseCaseFood"

describe("V9", () => {
  test.skip("Devo ser capaz de consultar lista de comidas com taxa de 20%", async () => {
    const response = await axios.get("http://localhost:3000/foods")
    const output = response.data.map((item: any) => ({
      ...item,
      price: (20 / 100) * item.price + item.price,
    }))

    expect(output).toEqual([
      { id: "123", name: "Macarronada", price: 15 },
      { id: "123", name: "File de frango", price: 12 },
    ])
  })

  test("Devo ser capaz de consultar lista de comidas com taxa de 20%", async () => {
    const fakeRepository: IRepository = {
      get: async () => {
        return [
          {
            id: "123",
            name: "Macarronada",
            price: 12.5,
          },
          {
            id: "123",
            name: "File de frango",
            price: 10,
          },
        ]
      },
    }
    const useCaseFood = new UseCaseFood(fakeRepository)
    const output = await useCaseFood.get()

    expect(output).toEqual([
      { id: "123", name: "Macarronada", price: 15 },
      { id: "123", name: "File de frango", price: 12 },
    ])
  })
})
