import { describe, expect, it } from '@jest/globals' // https://jestjs.io/docs/getting-started#type-definitions
import { dateInFuture, dateMinutesOffset } from './dateUtils'

describe('dateInFuture', () => {
  it('date should be in past', () => {
    expect(dateInFuture('2022-01-01 11:11:11')).toBe(false)
    expect(dateInFuture(new Date().toISOString())).toBe(false)
  })
})

describe('dateMinutesOffset', () => {
  it('result should be in the future', () => {
    const currentDate = new Date('2022-01-01 11:11:11')
    const result = dateMinutesOffset(currentDate, 3)
    expect(new Date(result).getMinutes()).toBe(14)
  })

  it('result should be in past', () => {
    const currentDate = new Date('2022-01-01 11:11:11')
    const result = dateMinutesOffset(currentDate, -3)
    expect(new Date(result).getMinutes()).toBe(8)
  })
})
