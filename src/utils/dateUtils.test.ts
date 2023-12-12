import { describe, expect, it } from '@jest/globals' // https://jestjs.io/docs/getting-started#type-definitions
import { dateInFuture } from './dateUtils'

describe('dateInFuture', () => {
  it('date should be in past', () => {
    expect(dateInFuture('2022-01-01 11:11:11')).toBe(false)
    expect(dateInFuture(new Date().toISOString())).toBe(false)
  })
})
