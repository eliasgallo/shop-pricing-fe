export const findWithId = <T extends { id?: number }>(
  list: T[],
  findId: number
): T | undefined => list.find((e) => e.id === findId)

export const distinct = <T>(list: T[]) =>
  list.filter((value, index, array) => array.indexOf(value) === index)

export const sliceItemId = <T extends { id?: number }>(
  list: T[],
  removeId: number
): T[] => list.filter((i) => i.id !== removeId)
