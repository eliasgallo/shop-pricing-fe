export const dateInFuture = (first: string): boolean =>
  Date.parse(first).valueOf() - Date.now() > 0

export const dateMinutesOffset = (date: Date, minutes: number): string =>
  new Date(date.getTime() + minutes * 60 * 1000).toISOString()
