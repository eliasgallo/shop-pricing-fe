import { describe, expect, it } from '@jest/globals'
import { loginReducer as reducer, selectors } from './loginReducer'
import { LoginAction } from '../actions/login'
import { RootState } from '../store'

describe('loginReducer', () => {
  it('LOADING sets a loading state', (): void => {
    const action: LoginAction = { type: 'login/loginLoading' }
    const state = { loading: false, error: 'error', loginSuccessful: true }
    const expected = { loading: true, error: null, loginSuccessful: false }
    expect(reducer(state, action)).toEqual(expected)
  })

  it('LOGIN_ERROR sets state with error', (): void => {
    const action: LoginAction = { type: 'login/loginError', payload: 'error' }
    const state = { loading: true, error: null, loginSuccessful: false }
    const expected = {
      loading: false,
      error: 'error',
      loginSuccessful: false,
    }
    expect(reducer(state, action)).toEqual(expected)
  })

  it('LOGIN_SUCCESS sets successful login state', (): void => {
    const action: LoginAction = { type: 'login/loginSuccess' }
    const state = { loading: true, error: null, loginSuccessful: false }
    const expected = { loading: false, error: null, loginSuccessful: true }
    expect(reducer(state, action)).toEqual(expected)
  })

  it('RESET_LOGIN_SUCCESSFUL resets loginSuccessful state', (): void => {
    const action: LoginAction = { type: 'login/resetFlagLoginSuccessful' }
    const state = { loading: false, error: null, loginSuccessful: true }
    const expected = { loading: false, error: null, loginSuccessful: false }
    expect(reducer(state, action)).toEqual(expected)
  })

  it('resets the state', (): void => {
    const action = { type: 'login/loginResetState' }
    const state = { loading: true, error: 'error', loginSuccessful: true }
    const expected = { loading: false, error: null, loginSuccessful: false }
    expect(reducer(state, action)).toEqual(expected)
  })
})

describe('selectors', () => {
  const state = {
    login: {
      error: 'error',
      loading: true,
      loginSuccessful: true,
    },
  } as RootState
  it('getError', () => {
    expect(selectors.getError(state)).toBe('error')
  })
  it('getLoading', () => {
    expect(selectors.getLoading(state)).toBe(true)
  })
  it('getLoginSuccessful', () => {
    expect(selectors.getLoginSuccessful(state)).toBe(true)
  })
})
