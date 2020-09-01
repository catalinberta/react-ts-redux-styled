import { ITokenService } from './types.d';

const Index = (function (): ITokenService {
	function setToken(token: string): void {
		localStorage.setItem('token', token);
	}
	function getToken(): string | null {
		return localStorage.getItem('token');
	}
	function clearToken(): void {
		localStorage.removeItem('token');
	}
	return {
		setToken,
		getToken,
		clearToken
	};
})();
export default Index;
