import { describe, expect, it } from '@jest/globals'
import { findWithId } from './listUtils'

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
