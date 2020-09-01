import {
	RegisterRequestModel,
	RegisterResponseModel,
	UserActions,
	UserActionTypes
} from './types';
import API from '../../services/API';
import TokenService from '../../services/TokenService';
import ApiPaths from '../../constants/ApiPaths';
import { AppThunk } from '../../types.d';

export const register = (userObj: RegisterRequestModel): AppThunk => async (
	dispatch
): Promise<void> => {
	await API.post<RegisterRequestModel, RegisterResponseModel>(
		ApiPaths.UserRegister,
		userObj
	);
	dispatch({
		type: UserActionTypes.REGISTER,
		payload: userObj
	});
};

export const logoutUser = (): UserActions => {
	TokenService.clearToken();
	return {
		type: UserActionTypes.LOGOUT
	};
};
