import { describe, expect, it } from '@jest/globals'
import { loginReducer as reducer } from './loginReducer'
import { LoginActionType } from '../action-types'
import { LoginAction } from '../actions/login'

describe('loginReducer', () => {
  it('LOADING sets a loading state', (): void => {
    const action: LoginAction = { type: LoginActionType.LOADING }
    const state = { loading: false, error: 'error', loginSuccessful: true }
    const expected = { loading: true, error: null, loginSuccessful: false }
    expect(reducer(state, action)).toEqual(expected)
  })

  it('LOGIN_ERROR sets state with error', (): void => {
    const action = { type: LoginActionType.LOGIN_ERROR, error: 'error' }
    const state = { loading: true, error: null, loginSuccessful: false }
    const expected = { loading: false, error: 'error', loginSuccessful: false }
    expect(reducer(state, action)).toEqual(expected)
  })

  it('LOGIN_SUCCESS sets successful login state', (): void => {
    const action: LoginAction = { type: LoginActionType.LOGIN_SUCCESS }
    const state = { loading: true, error: null, loginSuccessful: false }
    const expected = { loading: false, error: null, loginSuccessful: true }
    expect(reducer(state, action)).toEqual(expected)
  })

  it('RESET_LOGIN_SUCCESSFUL resets loginSuccessful state', (): void => {
    const action: LoginAction = { type: LoginActionType.RESET_LOGIN_SUCCESSFUL }
    const state = { loading: false, error: null, loginSuccessful: true }
    const expected = { loading: false, error: null, loginSuccessful: false }
    expect(reducer(state, action)).toEqual(expected)
  })
})
