// Usecase - Criar rota para cadastro usuário (email, senha)   [ok]
// Domain - Validação email                                    [ok]
// Domain - Validação senha (min 4)                            [ok]
// Driver - Salvar base dados                                  [ok]
// Não permitir salvar com email repetido                      [ok]
// Usecase - Criar roda para login                             [ok]
// Domain - Validar na base (email, senha)                     [ok]

import CreateUserUseCase from "./CreateUserUseCase"
import EmailDomain from "./EmailDomain"
import GetUSerRepository from "./GetUserRepository"
import IUserDTO from "./IUserDTO"
import LoginUserUserCase from "./LoginUserUserCase"
import PasswordDomain from "./PasswordDomain"
import { randomUUID } from "crypto"
import UserDatabase from "./UserDatabase"
import IHttpClient from "./IHttpClient"

describe("V15", () => {
  const userExisting: IUserDTO = {
    email: "test123@test.com",
    password: "1234",
    id: "1",
  }
  const fakeData: IHttpClient = {
    get: async (url: string): Promise<any> => {
      return [userExisting]
    },
    create: async (url: string, data: IUserDTO): Promise<any> => {
      const users: IUserDTO[] = [userExisting]
      users.push({ ...data })
      return users
    },
  }
  const database = new UserDatabase(fakeData)
  const repository = new GetUSerRepository(database)
  const createUserUseCase = new CreateUserUseCase(repository)

  // USE_CASE
  test("Deve criar usuário na base de dados", async () => {
    const input: IUserDTO = {
      email: `test${randomUUID()}@test.com`,
      password: "1234",
    }
    const response = await createUserUseCase.execute(input)
    delete response?.user?.id
    const output = {
      status: "201",
      message: "Success",
      user: {
        email: input.email,
      },
    }
    expect(response).toEqual(output)
  })

  test("Deve retornar erro ao tentar criar usuário com email inválido", async () => {
    const input: IUserDTO = {
      email: "test1test.com",
      password: "1234",
    }
    const response = await createUserUseCase.execute(input)
    const output = {
      status: "400",
      message: "Invalid e-mail",
    }
    expect(response).toEqual(output)
  })

  test("Deve retornar erro ao tentar criar usuário com senha menor de 4 caracteres", async () => {
    const input: IUserDTO = {
      email: `test${randomUUID()}@test.com`,
      password: "123",
    }
    const response = await createUserUseCase.execute(input)
    const output = {
      status: "400",
      message: "Invalid password",
    }
    expect(response).toEqual(output)
  })

  test("Deve retornar erro ao tentar criar usuário com email existente", async () => {
    const input: IUserDTO = {
      email: userExisting.email,
      password: userExisting.password,
    }
    await createUserUseCase.execute(input)
    const response = await createUserUseCase.execute(input)
    const output = {
      status: "400",
      message: "User already existing",
    }
    expect(response).toEqual(output)
  })

  test("Deve retornar sucesso ao efetuar o login", async () => {
    const database = new UserDatabase(fakeData)
    const repository = new GetUSerRepository(database)
    const loginUserUseCase = new LoginUserUserCase(repository)
    const input: IUserDTO = {
      email: userExisting.email,
      password: userExisting.password,
    }
    await loginUserUseCase.execute(input)
    const response = await loginUserUseCase.execute(input)
    const output = {
      status: "200",
      message: "Success",
      user: {
        email: input.email,
      },
    }
    expect(response).toEqual(output)
  })

  test("Deve retornar erro ao efetuar o login", async () => {
    const database = new UserDatabase(fakeData)
    const repository = new GetUSerRepository(database)
    const loginUserUseCase = new LoginUserUserCase(repository)
    const input: IUserDTO = {
      email: "1test@test.com",
      password: "1234",
    }
    await loginUserUseCase.execute(input)
    const response = await loginUserUseCase.execute(input)
    const output = {
      status: "400",
      message: "Invalid user or password",
    }
    expect(response).toEqual(output)
  })

  // DOMAIN
  test("Deve verificar se é um email válido", async () => {
    const input = "test1@test.com"
    const response = EmailDomain.isValidEmail(input)
    const output = true
    expect(response).toEqual(output)
  })

  test("Deve verificar se é um email inválido", async () => {
    const input = "test1test.com"
    const response = EmailDomain.isValidEmail(input)
    const output = false
    expect(response).toEqual(output)
  })

  test("Deve verificar se é uma senha inválida", async () => {
    const input = "123"
    const response = PasswordDomain.isInValidPassword(input)
    const output = true
    expect(response).toEqual(output)
  })

  test("Deve verificar se é uma senha válida", async () => {
    const input = "1234"
    const response = PasswordDomain.isInValidPassword(input)
    const output = false
    expect(response).toEqual(output)
  })
})
