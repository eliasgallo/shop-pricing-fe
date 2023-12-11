export const findWithId = <T extends { id?: number }>(
  list: T[],
  findId: number
): T | undefined => list.find((e) => e.id === findId)

export const concatDistinct = <T>(arr1: Array<T>, arr2: Array<T>): Array<T> => {
  return arr1
    .concat(arr2)
    .filter((value, index, array) => array.indexOf(value) === index)
}

export const distinct = <T>(list: T[]) =>
  list.filter((value, index, array) => array.indexOf(value) === index)

type ReturnList<T> = { [key: string]: T[] }
export const keyList = <Type, Key extends keyof Type>(
  list: Type[],
  key: Key
): ReturnList<Type> => {
  const result: ReturnList<Type> = {}
  list.forEach((item: Type) => {
    const store = (item[key] as keyof string).toString()
    result[store] = (result[store] || []).concat([item])
  })
  return result
}

export const replaceItemInKeyList = <T extends { id?: number }>(
  keyList: { [key: string]: T[] },
  oldItemKey: string | undefined,
  newItem: T,
  newItemKey: string,
  sorting: (a: T, b: T) => number
): { [key: string]: T[] } => {
  const listAfterRemoval = oldItemKey
    ? {
        ...keyList,
        [oldItemKey]: sliceItemId(keyList[oldItemKey], newItem.id!),
      }
    : { ...keyList }

  const newPriceList = (listAfterRemoval[newItemKey] || [])
    .concat([newItem])
    .sort(sorting)

  return { ...listAfterRemoval, [newItemKey]: newPriceList }
}

export const sliceItemId = <T extends { id?: number }>(
  list: T[],
  removeId: number
): T[] => list.filter((i) => i.id !== removeId)
