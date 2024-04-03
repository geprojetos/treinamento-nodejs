import useBank, { IClient, IClientAccount, IDeposit } from "."

describe("Bank", () => {
  const firstClient: IClientAccount = {
    client: "test-1",
    account: "0000",
    agency: "00000-0",
    value: 0,
  }
  const secondClient: IClientAccount = {
    client: "test-2",
    account: "0001",
    agency: "00000-1",
    value: 100,
  }
  let mockGetClients: () => Promise<IClientAccount[]>
  let mockDepositAPI: (input: IClient) => Promise<IDeposit>
  let mockTakeAPI: (input: IClient) => Promise<IDeposit>

  beforeAll(() => {
    mockGetClients = async (): Promise<IClientAccount[]> => {
      return [firstClient, secondClient]
    }
    mockDepositAPI = async (input: IClient): Promise<IDeposit> => {
      return {
        message: `Deposit is success ${input.value}`,
      }
    }
    mockTakeAPI = async (input: IClient): Promise<IDeposit> => {
      return {
        message: `Take is success ${input.value}`,
      }
    }
  })

  test("Should be able create account", async () => {
    const input: IClient = {
      name: "client-create-account",
      password: "123",
    }
    const { createAccount } = useBank({
      client: input,
      getClientsAPI: mockGetClients,
      depositAPI: mockDepositAPI,
      takeAPI: mockTakeAPI,
    })
    const output = {
      client: input.name,
      agency: "1111",
      account: "11111-1",
      value: 0,
    }
    await createAccount().then((client) => {
      expect(Object.keys(client)).toEqual(Object.keys(output))
      expect(client.client).toBe(input.name)
      expect(client.agency.length).toBe(output.agency.length)
      expect(client.account.length).toBe(output.account.length)
      expect(client.value).toBe(output.value)
    })
  })

  test("Should be able is not create account, name is required", async () => {
    const input: IClient = {
      name: "",
      password: "123",
    }
    const { createAccount } = useBank({
      client: input,
      getClientsAPI: mockGetClients,
      depositAPI: mockDepositAPI,
      takeAPI: mockTakeAPI,
    })
    const output = {
      message: "Name is required",
    }
    await createAccount().then((client) => {
      expect(client).toEqual(output)
    })
  })

  test("Should be able is not create account, password is required", async () => {
    const input: IClient = {
      name: "client-password-required",
      password: "",
    }
    const { createAccount } = useBank({
      client: input,
      getClientsAPI: mockGetClients,
      depositAPI: mockDepositAPI,
      takeAPI: mockTakeAPI,
    })
    const output = {
      message: "Password is required",
    }
    await createAccount().then((client) => {
      expect(client).toEqual(output)
    })
  })

  test("Should be able is not create account, client already existing", async () => {
    const input: IClient = {
      name: firstClient.client,
      password: "123",
    }
    const { createAccount } = useBank({
      client: input,
      getClientsAPI: mockGetClients,
      depositAPI: mockDepositAPI,
      takeAPI: mockTakeAPI,
    })
    const output = {
      message: "Client already existing!",
    }
    await createAccount().then((client) => {
      expect(client).toEqual(output)
    })
  })

  test("Should be able deposit", async () => {
    const input: IClient = {
      name: firstClient.client,
      agency: firstClient.agency,
      account: firstClient.account,
      value: 100,
    }
    const { depositAccount } = useBank({
      client: input,
      getClientsAPI: mockGetClients,
      depositAPI: mockDepositAPI,
      takeAPI: mockTakeAPI,
    })
    const output = {
      message: `Deposit is success ${input.value}`,
    }
    await depositAccount().then((client) => {
      expect(client).toEqual(output)
    })
  })

  test("Should be able is not deposit, client is not found", async () => {
    const input: IClient = {
      name: "client-not-found",
      agency: firstClient.agency,
      account: firstClient.account,
      value: 100,
    }
    const { depositAccount } = useBank({
      client: input,
      getClientsAPI: mockGetClients,
      depositAPI: mockDepositAPI,
      takeAPI: mockTakeAPI,
    })
    const output = {
      message: "Client is not found",
    }
    await depositAccount().then((client) => {
      expect(client).toEqual(output)
    })
  })

  test("Should be able take", async () => {
    const input: IClient = {
      name: secondClient.client,
      agency: secondClient.agency,
      account: secondClient.account,
      value: 90,
    }
    const { takeAccount } = useBank({
      client: input,
      getClientsAPI: mockGetClients,
      depositAPI: mockDepositAPI,
      takeAPI: mockTakeAPI,
    })
    const output = {
      message: `Take is success ${input.value}`,
    }
    await takeAccount().then((client) => {
      expect(client).toEqual(output)
    })
  })

  test("Should be able not take, client is not found", async () => {
    const input: IClient = {
      name: "take-client-not-found",
      agency: secondClient.agency,
      account: secondClient.account,
      value: 90,
    }
    const { takeAccount } = useBank({
      client: input,
      getClientsAPI: mockGetClients,
      depositAPI: mockDepositAPI,
      takeAPI: mockTakeAPI,
    })
    const output = {
      message: "Client is not found for take",
    }
    await takeAccount().then((client) => {
      expect(client).toEqual(output)
    })
  })
})
