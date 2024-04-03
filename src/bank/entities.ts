import { IClientAccount, IDeposit, IUseBank } from "."

const useBankCreateAccountEntities = ({ client, getClientsAPI }: IUseBank) => {
  const _isInvalidName = !client.name
  const _isInvalidPassword = !client.password
  const isInvalidAccount = _isInvalidName || _isInvalidPassword
  const isValidAccount = !isInvalidAccount

  let result: IClientAccount = {
    client: "",
    account: "",
    agency: "",
    message: "",
    value: 0,
  }

  const rulesInvalidAccount = () => {
    _invalidName()
    _invalidPassword()
    return result
  }

  const rulesValidAccount = async () => {
    await _alreadyExisting()
    await _successCreate()
    return result
  }

  const _invalidName = () => {
    if (_isInvalidName) {
      _keepMessage()
      result.message = "Name is required"
    }
  }

  const _invalidPassword = () => {
    if (_isInvalidPassword) {
      _keepMessage()
      result.message = "Password is required"
    }
  }

  const _alreadyExisting = async () => {
    const isExisting = await _isExisting()
    if (isValidAccount && isExisting) {
      _keepMessage()
      result.message = "Client already existing!"
    }
  }

  const _keepMessage = () => {
    delete result.client
    delete result.account
    delete result.agency
    delete result.value
  }

  const _successCreate = async () => {
    const isExisting = await _isExisting()
    if (isValidAccount && !isExisting) {
      delete result.message
      result = {
        client: client.name,
        agency: String(_generateNumber(9999)),
        account: `${String(_generateNumber(99999))}-${String(
          _generateNumber(9)
        )}`,
        value: 0,
      }
    }
  }

  const _isExisting = async () => {
    const response = await getClientsAPI()
    return response?.some((user) => user.client === client.name)
  }

  const _generateNumber = (input: number) => {
    return Math.floor(Math.random() * input)
  }

  return {
    rulesInvalidAccount,
    rulesValidAccount,
    isInvalidAccount,
  }
}

const useBankDepositAccountEntities = ({
  client,
  getClientsAPI,
  depositAPI,
}: IUseBank) => {
  let result: IDeposit = {
    message: "",
  }

  const rulesInvalidDeposit = async () => {
    await _notFound()
    return result
  }

  const rulesValidDeposit = async () => {
    await _successDeposit()
    return result
  }

  const _notFound = async () => {
    result.message = "Client is not found"
  }

  const _successDeposit = async () => {
    const response = await depositAPI(client)
    if (response?.message) {
      result.message = response.message
    }
  }

  const getClient = async () => {
    const response = await getClientsAPI()
    return response?.filter((user) => user.client === client.name)
  }

  return {
    rulesInvalidDeposit,
    rulesValidDeposit,
    getClient,
  }
}

const useBankTakeAccountEntities = ({ client, takeAPI }: IUseBank) => {
  let result: IDeposit = {
    message: "",
  }

  const rulesInvalidTake = async () => {
    await _notFound()
    return result
  }

  const rulesValidTake = async () => {
    await _successTake()
    return result
  }

  const _notFound = async () => {
    result.message = "Client is not found for take"
  }

  const _successTake = async () => {
    const response = await takeAPI(client)
    if (response?.message) {
      result.message = response.message
    }
  }

  return {
    rulesInvalidTake,
    rulesValidTake,
  }
}

export {
  useBankCreateAccountEntities,
  useBankDepositAccountEntities,
  useBankTakeAccountEntities,
}
