export const dateInFuture = (first: string): boolean =>
  Date.parse(first).valueOf() - Date.now() > 0
