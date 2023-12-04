const LOGIN_STORAGE_KEY = 'SHOP_PRICE_LOGIN_STORAGE_KEY' as const

export const storeUser = (user: User): void => {
  // TODO: encrypt info
  storageAvailable() &&
    localStorage.setItem(LOGIN_STORAGE_KEY, JSON.stringify(user))
}

export const retrieveUser = (): User | undefined => {
  const retrievedData = getUser()
  if (
    isUser(retrievedData) &&
    new Date(retrievedData.expiry).getTime() > new Date().getTime()
  ) {
    return { ...retrievedData }
  }
  clearUser()
}

const clearUser = (): void => {
  storageAvailable() && localStorage.removeItem(LOGIN_STORAGE_KEY)
}

type User = {
  username: string
  expiry: string
  token: string
}

const isUser = (data: any): data is User => {
  return (
    typeof data.expiry === 'string' &&
    typeof data.username === 'string' &&
    typeof data.token === 'string'
  )
}

const storageAvailable = (): boolean => {
  return typeof Storage !== 'undefined'
}

const getUser = (): User | {} => {
  if (storageAvailable()) {
    const jsonUser = JSON.parse(localStorage.getItem(LOGIN_STORAGE_KEY) || '{}')
    if (jsonUser['token']) {
      return { ...jsonUser }
    }
  }
  return {}
}
