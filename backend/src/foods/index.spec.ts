import supertest from "supertest"
import FoodsDatabase from "./3_resources/database"
import GetFoodsApplication from "./2_application/getFoods"
import GetFoodsController from "./1_drivers/getFoods/GetFoodsController"
import { IHttpClient } from "./3_resources/adapters/HttpClientAxiosAdapter"
import {
  IDeleteResponse,
  IFoodCreateResponse,
  IFoodsGetAllResponse,
} from "./3_resources/database"
import ServerClientExpressAdapter from "./1_drivers/adapters/ServerClientExpressAdapter"
import CreateFoodsApplication from "./2_application/createFoods"
import CreateFoodsController from "./1_drivers/createFoods/CreateFoodsController"
import DeleteFoodsApplication from "./2_application/deleteFoods"
import DeleteFoodsController from "./1_drivers/deleteFoods/DeleteFoodsController"
import LoginDatabase, {
  ILogin,
  ILoginResponse,
  IRegisterResponse,
} from "./3_resources/database/LoginDatabase"
import LoginApplication from "./2_application/login"
import LoginController from "./1_drivers/login/LoginController"
import Login from "./domain/login"
import RegisterApplication from "./2_application/registerApplication"
import RegisterController from "./1_drivers/register/RegisterController"
import LoggerPinoAdapter from "./3_resources/adapters/LoggerPinoAdapter"

class HttpClientMemory implements IHttpClient {
  foods: any

  constructor() {
    this.foods = []
  }

  async get(): Promise<IFoodsGetAllResponse> {
    return this.foods
  }

  async post(input: any): Promise<IFoodCreateResponse> {
    this.foods.push(input)
    return {
      status: "201",
      message: "Success",
      data: this.foods,
    }
  }

  async delete(input: any): Promise<IDeleteResponse> {
    this.foods.filter((food: any) => food.id !== input.id)
    return {
      message: "OK",
      status: "200",
    }
  }
}

describe("Register", () => {
  let app: any
  let httpClient: IHttpClient

  beforeAll(() => {
    httpClient = {
      get: async (): Promise<ILoginResponse> => {
        return {
          status: "200",
          message: "success",
          data: [
            {
              email: "teste@teste.com",
              password: "password",
            },
          ],
        }
      },
      post: async (): Promise<IRegisterResponse> => {
        return {
          status: "201",
          message: "success",
          data: {
            email: "teste@teste.com",
          },
        }
      },
    }
    const logger = new LoggerPinoAdapter()
    const database = new LoginDatabase(httpClient, logger)
    const application = new RegisterApplication(database, logger)
    const serverClient = ServerClientExpressAdapter.getInstance()
    const controller = new RegisterController(application, serverClient)
    controller.execute()
    app = serverClient.app
  })

  test("Should be able register user", async () => {
    const input: ILogin = {
      email: "teste@teste1.com",
      password: "password",
    }
    const response = await supertest(app).post("/register").send(input)
    const data = JSON.parse(response.text)
    const database: IRegisterResponse = await httpClient.post(input)
    const output: IRegisterResponse = {
      status: database.status,
      message: database.message,
      data: {
        email: database.data?.email,
      },
    }
    expect(data).toEqual(output)
  })

  test("Should be able error register user, user existing", async () => {
    const input: ILogin = {
      email: "teste@teste.com",
      password: "password",
    }
    const response = await supertest(app).post("/register").send(input)
    const data = JSON.parse(response.text)
    const output: IRegisterResponse = {
      status: "400",
      message: "Invalid register",
    }
    expect(data).toEqual(output)
  })

  test("Should be able invalid login e-mail is required", async () => {
    const input: ILogin = {
      email: "",
      password: "password",
    }
    const response = await supertest(app).post("/register").send(input)
    const data = JSON.parse(response.text)
    delete data.data
    const output: ILoginResponse = {
      status: "400",
      message: "Invalid email or password",
    }
    expect(data).toEqual(output)
  })

  test("Should be able invalid login password is required", async () => {
    const input: ILogin = {
      email: "test@teste.com",
      password: "",
    }
    const response = await supertest(app).post("/register").send(input)
    const data = JSON.parse(response.text)
    delete data.data
    const output: ILoginResponse = {
      status: "400",
      message: "Invalid email or password",
    }
    expect(data).toEqual(output)
  })
})

describe("Login", () => {
  let app: any
  let tokenMock: string
  let httpClient: IHttpClient

  beforeAll(() => {
    const login = new Login()
    tokenMock = login.generateToken("teste@teste.com")
    httpClient = {
      get: async (): Promise<ILoginResponse> => {
        return {
          status: "200",
          message: "success",
          token: tokenMock,
          data: [
            {
              email: "teste@teste.com",
              password: "password",
            },
          ],
        }
      },
    }
    const logger = new LoggerPinoAdapter()
    const database = new LoginDatabase(httpClient, logger)
    const application = new LoginApplication(database, logger)
    const serverClient = ServerClientExpressAdapter.getInstance()
    const controller = new LoginController(application, serverClient)
    controller.execute()
    app = serverClient.app
  })

  test("Should be able login", async () => {
    const input: ILogin = {
      email: "teste@teste.com",
      password: "password",
    }
    const response = await supertest(app).post("/login").send(input)
    const data = JSON.parse(response.text)
    const database: ILoginResponse = await httpClient.get()
    const output: ILoginResponse = {
      status: database.status,
      message: database.message,
      token: database.token,
      data: database.data?.map((item) => ({ email: item.email })),
    }
    expect(data).toEqual(output)
  })

  test("Should be able invalid login", async () => {
    const input: ILogin = {
      email: "teste@teste.com",
      password: "password1",
    }
    const response = await supertest(app).post("/login").send(input)
    const data = JSON.parse(response.text)
    const output: ILoginResponse = {
      status: "400",
      message: "Invalid login",
    }
    expect(data).toEqual(output)
  })

  test("Should be able invalid login e-mail is incorrect", async () => {
    const input: ILogin = {
      email: "test@123",
      password: "password",
    }
    const response = await supertest(app).post("/login").send(input)
    const data = JSON.parse(response.text)
    delete data.data
    const output: ILoginResponse = {
      status: "400",
      message: "Invalid email",
    }
    expect(data).toEqual(output)
  })

  test("Should be able invalid login e-mail is required", async () => {
    const input: ILogin = {
      email: "",
      password: "password",
    }
    const response = await supertest(app).post("/login").send(input)
    const data = JSON.parse(response.text)
    delete data.data
    const output: ILoginResponse = {
      status: "400",
      message: "Invalid email or password",
    }
    expect(data).toEqual(output)
  })

  test("Should be able invalid login password is required", async () => {
    const input: ILogin = {
      email: "teste@teste.com",
      password: "",
    }
    const response = await supertest(app).post("/login").send(input)
    const data = JSON.parse(response.text)
    delete data.data
    const output: ILoginResponse = {
      status: "400",
      message: "Invalid email or password",
    }
    expect(data).toEqual(output)
  })
})

describe("GetFoods", () => {
  const mockData: IFoodsGetAllResponse = {
    status: "200",
    message: "success",
    data: [
      { id: "1", name: "Macarronada", price: 13.75, category: "main" },
      { id: "2", name: "File de frango", price: 11, category: "main" },
      { id: "3", name: "Sorvete", price: 22, category: "secondary" },
    ],
  }
  let app: any

  beforeAll(() => {
    const httpClient: IHttpClient = {
      get: async (): Promise<IFoodsGetAllResponse> => {
        return {
          status: "200",
          message: "success",
          data: [
            { id: "1", name: "Macarronada", price: 12.5, category: "main" },
            { id: "2", name: "File de frango", price: 10, category: "main" },
            { id: "3", name: "Sorvete", price: 20, category: "secondary" },
          ],
        }
      },
    }
    const logger = new LoggerPinoAdapter()
    const database = new FoodsDatabase(httpClient, logger)
    const application = new GetFoodsApplication(database, logger)
    const serverClient = ServerClientExpressAdapter.getInstance()
    const controller = new GetFoodsController(application, serverClient)
    controller.execute()
    app = serverClient.app
  })

  test("Should be able get all foods", async () => {
    const response = await supertest(app).get("/foods")
    const data = JSON.parse(response.text)
    const output: IFoodsGetAllResponse = mockData
    expect(data).toEqual(output)
  })

  test("Should be able get foods category main", async () => {
    const response = await supertest(app)
      .get("/foods")
      .query({ category: "main" })
    const data = JSON.parse(response.text)
    const output: IFoodsGetAllResponse = {
      ...mockData,
      data: mockData.data.filter((food) => food.category === "main"),
    }
    expect(data).toEqual(output)
  })

  test("Should be able get foods category secondary", async () => {
    const response = await supertest(app)
      .get("/foods")
      .query({ category: "secondary" })
    const data = JSON.parse(response.text)
    const output: IFoodsGetAllResponse = {
      ...mockData,
      data: mockData.data.filter((food) => food.category === "secondary"),
    }
    expect(data).toEqual(output)
  })
})

describe("CreateFoods", () => {
  let app: any

  beforeAll(() => {
    const httpClient = new HttpClientMemory()
    const logger = new LoggerPinoAdapter()
    const database = new FoodsDatabase(httpClient, logger)
    const application = new CreateFoodsApplication(database, logger)
    const serverClient = ServerClientExpressAdapter.getInstance()
    const controller = new CreateFoodsController(application, serverClient)
    controller.execute()
    app = serverClient.app
  })

  test("Should be able create food", async () => {
    const response = await supertest(app)
      .post("/foods")
      .send({ name: "Contra filé", price: 20, category: "main" })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")

    const data = response.body
    const output = {
      message: "Success",
      status: "201",
      data: [{ name: "Contra filé", price: 20, category: "main" }],
    }
    expect(data).toEqual(output)
  })

  test("Should be able error create food name is required", async () => {
    const response = await supertest(app)
      .post("/foods")
      .send({ name: "", price: 20, category: "main" })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")

    const data = response.body
    const output = {
      message: "Name is required",
      status: "400",
    }
    expect(data).toEqual(output)
  })

  test("Should be able error create food price is required", async () => {
    const response = await supertest(app)
      .post("/foods")
      .send({ name: "Salmão", category: "main" })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")

    const data = response.body
    const output = {
      message: "Price is required",
      status: "400",
    }
    expect(data).toEqual(output)
  })

  test("Should be able error create food category is required", async () => {
    const response = await supertest(app)
      .post("/foods")
      .send({ name: "Salmão", price: 50, category: "" })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")

    const data = response.body
    const output = {
      message: "Category is required",
      status: "400",
    }
    expect(data).toEqual(output)
  })
})

describe("DeleteFoods", () => {
  let app: any

  beforeAll(() => {
    const httpClient = new HttpClientMemory()
    const logger = new LoggerPinoAdapter()
    const database = new FoodsDatabase(httpClient, logger)
    const application = new DeleteFoodsApplication(database, logger)
    const serverClient = ServerClientExpressAdapter.getInstance()
    const controller = new DeleteFoodsController(application, serverClient)
    controller.execute()
    app = serverClient.app
  })

  test("Should be able error delete food id is required", async () => {
    const response = await supertest(app).delete("/foods").query({ id: "test" })

    const data = response.body
    const output: IDeleteResponse = {
      message: "OK",
      status: "200",
    }
    expect(data).toEqual(output)
  })

  test("Should be able error delete food id is required", async () => {
    const response = await supertest(app)
      .delete("/foods")
      .query({ id: "" })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")

    const data = response.body
    const output: IDeleteResponse = {
      message: "ID is required",
      status: "400",
    }
    expect(data).toEqual(output)
  })
})
