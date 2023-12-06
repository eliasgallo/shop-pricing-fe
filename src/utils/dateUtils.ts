export const dateInFuture = (first: string): boolean =>
  Date.parse(first).valueOf() - Date.now() > 0

export const dateMinutesOffset = (minutes: number): string =>
  new Date(Date.now() + minutes * 60 * 1000).toISOString()
