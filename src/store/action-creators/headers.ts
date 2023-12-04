export const commonHeaders = { 'Content-Type': 'application/json' }

export const withAuthHeader = (auth: string = '') => ({
  ...commonHeaders,
  Authorization: auth,
})
