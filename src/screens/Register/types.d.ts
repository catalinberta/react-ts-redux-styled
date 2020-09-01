import { RegisterRequestModel, UserState } from '../../store/user/types';

export interface RegisterProps {
	user: UserState;
	register: (userObj: RegisterRequestModel) => void;
}

export interface MapStateToProps {
	user: UserState;
}
