const LANGUAGE_STORAGE_KEY = 'i18nextLng' as const

export const storeLanguage = (language: string): void => {
  storageAvailable() && localStorage.setItem(LANGUAGE_STORAGE_KEY, language)
}

const getLanguage = (): string | null => {
  if (storageAvailable()) {
    const item = localStorage.getItem(LANGUAGE_STORAGE_KEY)
    if (item) return item
  }
  return null
}

export const retrieveLanguage = (): string | null => {
  const retrievedData = getLanguage()
  if (retrievedData) {
    return retrievedData
  }
  clearLanguage()
  return null
}

export const clearLanguage = (): void => {
  storageAvailable() && localStorage.removeItem(LANGUAGE_STORAGE_KEY)
}

const storageAvailable = (): boolean => {
  return typeof Storage !== 'undefined'
}
