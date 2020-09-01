import { UserState, UserActions, UserActionTypes } from './types';

const initialState: UserState = {};

export default function userReducer(
	state = initialState,
	action: UserActions
): UserState {
	switch (action.type) {
		case UserActionTypes.REGISTER: {
			return {
				...state,
				email: action.payload.email
			};
		}
		default:
			return state;
	}
}
