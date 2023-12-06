import { dateInFuture } from './dateUtils'

const LOGIN_STORAGE_KEY = 'SHOP_PRICE_LOGIN_STORAGE_KEY' as const

export const storeUser = (user: User): void => {
  // TODO: encrypt info
  storageAvailable() &&
    localStorage.setItem(LOGIN_STORAGE_KEY, JSON.stringify(user))
}

export const retrieveUser = (): User | undefined => {
  const retrievedData = getUser()
  if (isUser(retrievedData) && dateInFuture(retrievedData.expiry)) {
    return { ...retrievedData }
  }
  clearUser()
}

export const clearUser = (): void => {
  storageAvailable() && localStorage.removeItem(LOGIN_STORAGE_KEY)
}

type User = {
  username: string
  expiry: string
  token: string
}

const isUser = (data: User | Record<string, never>): data is User =>
  typeof data.expiry === 'string' &&
  typeof data.username === 'string' &&
  typeof data.token === 'string'

const storageAvailable = (): boolean => {
  return typeof Storage !== 'undefined'
}

const getUser = (): User | Record<string, never> => {
  if (storageAvailable()) {
    const jsonUser: User | Record<string, never> = JSON.parse(
      localStorage.getItem(LOGIN_STORAGE_KEY) || '{}'
    )
    return { ...jsonUser }
  }
  return {}
}
