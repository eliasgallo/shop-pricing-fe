import { TypedUseSelectorHook, useSelector } from 'react-redux'
import { RootState } from '../store'

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
// from https://react-redux.js.org/using-react-redux/usage-with-typescript#define-typed-hooks
