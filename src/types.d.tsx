import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { RootState } from './store/store';

// generic thunk action return type (thunk action is any action that does not return a simple object but a function)
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	null,
	Action<string>
>;

// generic dispatch type for thunk actions
export type AppThunkDispatch = ThunkDispatch<RootState, null, Action<string>>;
