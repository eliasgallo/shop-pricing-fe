export const concatDistinct = <T, U extends T>(
  arr1: Array<T>,
  arr2: Array<U>
): Array<T | U> => {
  return arr1
    .concat(arr2)
    .filter((value, index, array) => array.indexOf(value) === index)
}
