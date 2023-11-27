export const findWithId = <T extends { id?: number }>(
  list: T[],
  findId: number
): T | undefined => list.find((e) => e.id === findId)
