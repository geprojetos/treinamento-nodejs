import {
  useBankCreateAccountEntities,
  useBankDepositAccountEntities,
  useBankTakeAccountEntities,
} from "./entities"

interface IUseBank {
  client: IClient
  getClientsAPI: () => Promise<IClientAccount[]>
  depositAPI: (input: IClient) => Promise<IDeposit>
  takeAPI: (input: IClient) => Promise<IDeposit>
}

interface IClient extends IClientAccount {
  name: string
  password?: string
}

interface IClientAccount {
  client?: string
  account?: string
  agency?: string
  message?: string
  value?: number
}

interface IDeposit {
  message: string
}

const useBank = ({ client, getClientsAPI, depositAPI, takeAPI }: IUseBank) => {
  const { rulesValidAccount, isInvalidAccount, rulesInvalidAccount } =
    useBankCreateAccountEntities({ client, getClientsAPI, depositAPI, takeAPI })
  const { rulesValidDeposit, rulesInvalidDeposit, getClient } =
    useBankDepositAccountEntities({
      client,
      getClientsAPI,
      depositAPI,
      takeAPI,
    })
  const { rulesInvalidTake, rulesValidTake } = useBankTakeAccountEntities({
    client,
    getClientsAPI,
    depositAPI,
    takeAPI,
  })

  const createAccount = async (): Promise<IClientAccount> => {
    if (isInvalidAccount) {
      return rulesInvalidAccount()
    }
    return rulesValidAccount()
  }

  const depositAccount = async () => {
    if (!(await getClient()).length) {
      return rulesInvalidDeposit()
    }
    return rulesValidDeposit()
  }

  const takeAccount = async () => {
    if (!(await getClient()).length) {
      return rulesInvalidTake()
    }
    return rulesValidTake()
  }

  return {
    createAccount,
    depositAccount,
    takeAccount,
  }
}

export default useBank
export type { IClient, IUseBank, IClientAccount, IDeposit }
