export interface ITokenService {
	setToken: (token: string) => void;
	getToken: () => string | null;
	clearToken: () => void;
}
