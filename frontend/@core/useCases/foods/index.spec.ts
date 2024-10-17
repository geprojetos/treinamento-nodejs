import { vitest } from "vitest"
import Gateway from "../../infra/Gateway"
import {
  IDeleteResponse,
  IFoodCreateResponse,
  IFoodsGetResponse,
  IHttpClient,
} from "../../infra/HttpAxiosAdapterClient"
import UseCreateFood, { ICreateFood } from "./UseCreateFood"
import UseDeleteFood, { IDeleteFood } from "./UseDeleteFood"
import UseGetAllFoods from "./UseGetAllFoods"
import UseGetOnlyFood, { IGetOnlyFood } from "./UseGetOnlyFood"
import UseNavigateDetailFood, {
  IUseNavigateDetailFood,
  IUseNavigateDetailFoodParams,
} from "./UseNavigateDetailFood"
import { IFood } from "../../domain/Food"

let httpClient: IHttpClient
let gateway: Gateway

beforeAll(() => {
  httpClient = {
    get: async (): Promise<IFoodsGetResponse> => {
      return {
        status: "200",
        message: "success",
        data: [
          {
            id: "1",
            name: "Macarronada",
            price: 12.5,
            category: "main",
          },
          {
            id: "2",
            name: "File de frango",
            price: 10,
            category: "main",
          },
          {
            id: "3",
            name: "Sorvete",
            price: 20,
            category: "secondary",
          },
        ],
      }
    },
    getOnly: async (input: IGetOnlyFood): Promise<any> => {
      return {
        data: [
          {
            id: "1",
            name: "Macarronada",
            price: 12.5,
            category: "main",
          },
        ],
      }
    },
    create: async (input: IFood): Promise<IFoodCreateResponse> => {
      return {
        message: "Success",
        status: "201",
        data: [input],
      }
    },
    delete: async (input: IDeleteFood): Promise<IDeleteResponse> => {
      return {
        message: "OK",
        status: "200",
      }
    },
  }
  gateway = new Gateway(httpClient)
})

describe("UseGetAllFoods", () => {
  test("Should be able get all foods", async () => {
    const useCase = new UseGetAllFoods(gateway)
    const response = await useCase.execute()
    const output = [
      {
        id: "1",
        name: "Macarronada",
        price: 12.5,
        category: "main",
      },
      {
        id: "2",
        name: "File de frango",
        price: 10,
        category: "main",
      },
      {
        id: "3",
        name: "Sorvete",
        price: 20,
        category: "secondary",
      },
    ]
    expect(response.data).toEqual(output)
  })
})

describe("UseGetOnlyFood", () => {
  test("Should be able get food for name", async () => {
    const useCase = new UseGetOnlyFood(gateway)
    const response = await useCase.execute({ id: "1" })
    const output = [
      {
        id: "1",
        name: "Macarronada",
        price: 12.5,
        category: "main",
      },
    ]
    expect(response.data).toEqual(output)
  })

  test("Should be able error get food for name ID is required", async () => {
    const useCase = new UseGetOnlyFood(gateway)
    const response = await useCase.execute({ id: "" })
    const output = {
      status: "400",
      message: "ID is required",
    }
    expect(response).toEqual(output)
  })
})

describe("UseCreateFood", () => {
  test("Should be able create food", async () => {
    const useCase = new UseCreateFood(gateway)
    const input = {
      name: "test",
      price: 10,
      category: "main",
    }
    const response = await useCase.execute(input)
    const output: IFoodCreateResponse = {
      message: "Success",
      status: "201",
      data: [input],
    }
    expect(response).toEqual(output)
  })

  test("Should be able error create food name is required", async () => {
    const useCase = new UseCreateFood(gateway)
    const input = {
      name: "",
      price: 10,
      category: "main",
    }
    const response = await useCase.execute(input)
    const output: IFoodCreateResponse = {
      status: "",
      message: "",
      error: {
        name: "Name is required",
        price: "",
        category: "",
      },
    }
    expect(response).toEqual(output)
  })

  test("Should be able error create food price is required", async () => {
    const useCase = new UseCreateFood(gateway)
    const input = {
      name: "test",
      price: 0,
      category: "main",
    }
    const response = await useCase.execute(input)
    const output: IFoodCreateResponse = {
      status: "",
      message: "",
      error: {
        name: "",
        price: "Price is required",
        category: "",
      },
    }
    expect(response).toEqual(output)
  })

  test("Should be able error create food category is required", async () => {
    const useCase = new UseCreateFood(gateway)
    const input = {
      name: "test",
      price: 10,
      category: "",
    }
    const response = await useCase.execute(input)
    const output: IFoodCreateResponse = {
      status: "",
      message: "",
      error: {
        name: "",
        price: "",
        category: "Category is required",
      },
    }
    expect(response).toEqual(output)
  })
})

describe("UseDeleteFood", () => {
  test("Should be able delete food", async () => {
    const useCase = new UseDeleteFood(gateway)
    const input: IDeleteFood = {
      id: "1",
      isConfirm: true,
      callback: () => null,
    }
    const response = await useCase.execute(input)
    const output = {
      message: "OK",
      status: "200",
    }
    expect(response).toEqual(output)
  })

  test("Should be able error delete food ID is required", async () => {
    const useCase = new UseDeleteFood(gateway)
    const input: IDeleteFood = {
      id: "",
      isConfirm: true,
    }
    const response = await useCase.execute(input)
    const output: IDeleteResponse = {
      status: "400",
      message: "ID is required",
    }
    expect(response).toEqual(output)
  })

  test("Should be able error delete food is pending confirm", async () => {
    const useCase = new UseDeleteFood(gateway)
    const input: IDeleteFood = {
      id: "test",
      isConfirm: false,
    }
    const response = await useCase.execute(input)
    const output: IDeleteResponse = {
      status: "400",
      message: "Is pending confirm",
    }
    expect(response).toEqual(output)
  })
})

describe("UseNavigateDetailFood", () => {
  test("Should be able navigate detail food", async () => {
    const useCase = new UseNavigateDetailFood()
    const spyUseCase = vitest.spyOn(useCase, "execute")
    const input: IUseNavigateDetailFood = {
      params: {
        id: "1",
        name: "Macarronada",
        price: 12.5,
        category: "main",
      },
      callback: (params: IUseNavigateDetailFoodParams) => null,
    }
    useCase.execute(input)
    expect(spyUseCase).toHaveBeenCalledWith(input)
  })
})
