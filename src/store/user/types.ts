import { ThunkAction } from 'redux-thunk';
import { ActionCreator, AnyAction } from 'redux';
import { RequestModel, ResponseModel } from '../../services/API/types';

export interface UserState {}

export enum UserActionTypes {
	REGISTER = 'REGISTER',
	LOGOUT = 'LOGOUT'
}

export interface IRegisterAction {
	type: UserActionTypes.REGISTER;
	payload: {
		email: string;
	};
}
export interface ILogoutAction {
	type: UserActionTypes.LOGOUT;
}

export type UserActions = IRegisterAction | ILogoutAction;

export type ThunkResult<R> = ActionCreator<
	ThunkAction<R, Promise<void>, unknown, AnyAction>
>;

// Request Models
export interface RegisterRequestModel extends RequestModel {
	email: string;
}

// Response Models
export interface RegisterResponseModel extends ResponseModel {
	uid: string;
}
