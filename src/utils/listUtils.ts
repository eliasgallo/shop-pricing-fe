export const findWithId = <T extends { id?: number }>(
  list: T[],
  findId: number
): T | undefined => list.find((e) => e.id === findId)

export const concatDistinct = <T>(arr1: Array<T>, arr2: Array<T>): Array<T> => {
  return arr1
    .concat(arr2)
    .filter((value, index, array) => array.indexOf(value) === index)
}
