import { describe, expect, it } from '@jest/globals'
import {
  findWithId,
  concatDistinct,
  keyList,
  replaceItemInKeyList,
} from './listUtils'

type TestType = {
  id?: number
  name: string
  ok: boolean
}

const list: TestType[] = [
  { name: 'a', ok: true },
  { id: 1, name: 'b', ok: true },
  { id: 2, name: 'c', ok: false },
  { name: 'd', ok: false },
]

describe('findWithId', () => {
  it('finds with a known id', () => {
    expect(findWithId(list, 1)).toEqual({ id: 1, name: 'b', ok: true })
  })

  it('returns undefined with an unkown id', () => {
    expect(findWithId(list, 0) || findWithId(list, 3)).toBeUndefined()
  })
})

describe('concatDistinct', () => {
  const listA = [1, 2, 3, 4, 5]
  const listB = [4, 5, 6, 7, 8]
  it('puts lists together and make result list unique', () => {
    expect(concatDistinct(listA, listB)).toEqual([1, 2, 3, 4, 5, 6, 7, 8])
    expect(concatDistinct([], listB)).toEqual(listB)
  })
})

describe('keyList', () => {
  it('changes list to a key-value list with wanted key', () => {
    expect(keyList(list, 'ok')).toEqual({
      true: [
        { name: 'a', ok: true },
        { id: 1, name: 'b', ok: true },
      ],
      false: [
        { id: 2, name: 'c', ok: false },
        { name: 'd', ok: false },
      ],
    })
  })
})

describe('replaceItemInKeyList', () => {
  const keyList = {
    a: [
      { name: 'a', ok: true },
      { id: 1, name: 'a', ok: true },
    ],
    b: [
      { id: 2, name: 'b', ok: false },
      { name: 'b', ok: false },
    ],
  }

  it('replaces old item properties with new item', () => {
    const newItem = { ...keyList['b'][0], ok: true }
    const result = replaceItemInKeyList(keyList, 'b', newItem, 'b', () => 0)
    expect(result['b']).toEqual([keyList['b'][1], newItem])
  })

  it('new item moves to different key/list', () => {
    const newItem = { id: 1, name: 'b', ok: false }
    const result = replaceItemInKeyList(keyList, 'a', newItem, 'b', () => 0)
    expect(result['a']).toEqual([keyList.a[0]])
    expect(result['b']).toHaveLength(3)
    expect(result['b']).toContain(newItem)
  })
})
