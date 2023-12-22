const THEME_STORAGE_KEY = 'SHOP_PRICE_THEME_STORAGE_KEY' as const

export const storeTheme = (theme: string): void => {
  storageAvailable() && localStorage.setItem(THEME_STORAGE_KEY, theme)
}

const getTheme = (): string | null => {
  if (storageAvailable()) {
    const item = localStorage.getItem(THEME_STORAGE_KEY)
    if (item) {
      const theme: string = item
      return theme
    }
  }
  return null
}

export const retrieveTheme = (): string | null => {
  const retrievedData = getTheme()
  if (retrievedData) {
    return retrievedData
  }
  clearTheme()
  return null
}

export const clearTheme = (): void => {
  storageAvailable() && localStorage.removeItem(THEME_STORAGE_KEY)
}

const storageAvailable = (): boolean => {
  return typeof Storage !== 'undefined'
}
