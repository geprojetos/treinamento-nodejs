// https://api.github.com/users/geprojetos
// https://api.github.com/users/geprojetos/repos
// https://api.github.com/emojis

/*
  implementation prod version
*/

import request from "supertest"
import useGithubModel, { IGetUserInformationAPI } from "./model"
import useInitialize from "./initialize"
import { mockAPI } from "./mock"
import useRepository from "./repository"
import { IHttpClient } from "./httpClient"

const { app } = useInitialize()

describe("[Integration] Controller GITHUB", () => {
  it("should be able GET /users/:userName", async () => {
    await request(app)
      .get("/users/:userName")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
  })

  it("should be able GET /users/:userName/repos", async () => {
    await request(app)
      .get("/users/:userName/repos")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
  })
})

describe("[Unit] Model GITHUB", () => {
  test("Should be able get user information", async () => {
    const { getUserInformation } = useGithubModel(mockAPI)
    const input = "test"
    await getUserInformation({ input }).then((user: IGetUserInformationAPI) => {
      expect(Object.keys(user)).toContain("login")
      expect(user.login).toBe("login")
    })
  })

  test("Should be able get user repositories", async () => {
    const { getUserRepositories } = useGithubModel(mockAPI)
    const input = "test"
    await getUserRepositories({ input }).then((user) => {
      expect(Object.keys(user[0])).toContain("id")
    })
  })
})

describe("[Unit] Repository GITHUB", () => {
  test("Should be able get user information", async () => {
    const input: IHttpClient = {
      get: async function (url: string): Promise<any> {
        return mockAPI.getUserInformationAPI(url)
      },
    }
    const { getUserInformationAPI } = useRepository(input)
    await getUserInformationAPI("test").then((user: IGetUserInformationAPI) => {
      expect(Object.keys(user)).toContain("login")
      expect(user.login).toBe("login")
    })
  })

  test("Should be able get user repositories", async () => {
    const input: IHttpClient = {
      get: async function (url: string): Promise<any> {
        return mockAPI.getUserRepositoriesAPI(url)
      },
    }
    const { getUserRepositoriesAPI } = useRepository(input)
    await getUserRepositoriesAPI("test").then((user) => {
      expect(Object.keys(user[0])).toContain("id")
      expect(user[0].id).toBe(123)
    })
  })
})
