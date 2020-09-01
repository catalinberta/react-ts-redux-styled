import axios, {
	AxiosError,
	AxiosInstance,
	AxiosPromise,
	AxiosRequestConfig,
	AxiosResponse,
	Canceler
} from 'axios';
import CONFIG from '../../config/config.json';
import {
	AxiosRequestConfigProps,
	RequestModel,
	ResponseModel,
	MediaAPIResponse
} from './types';

const BASE_URL =
	process.env.NODE_ENV === 'development'
		? CONFIG.DEV.BASE_URL
		: CONFIG.PRODUCTION.BASE_URL;
const client: AxiosInstance = axios.create({
	baseURL: BASE_URL,
	responseType: 'json',
	headers: {
		'Content-Type': 'application/json'
	},
	withCredentials: true,
	transformResponse: (response: AxiosResponse) => response
});

const requestCancelFunctions: any = {};
const storeRequestCancelFc = (requestId: string, cancelFc: Canceler) => {
	requestCancelFunctions[requestId] = cancelFc;
};

interface AxiosRequestConfigCustom extends Partial<AxiosRequestConfig> {
	requestId?: string;
}

client.interceptors.request.use(
	(config: AxiosRequestConfigCustom) => {
		const { requestId } = config;
		if (requestId) {
			// eslint-disable-next-line no-unused-expressions
			requestCancelFunctions[requestId] && requestCancelFunctions[requestId]();
			config.cancelToken = new axios.CancelToken(
				storeRequestCancelFc.bind(null, requestId)
			);
		}
		// set token
		return config;
	},
	(error: AxiosError) => Promise.reject(error)
);

client.interceptors.response.use(
	(response) => response,
	(error) =>
		// const errorResponse: AxiosResponse = error.response;
		// if (errorResponse.status === 401) {
		// return reset token
		// }
		Promise.reject(error)
);

const GET = <T extends RequestModel, U extends ResponseModel>(
	url: string,
	data?: T
): AxiosPromise<MediaAPIResponse<U>> =>
	client.get<typeof data, AxiosResponse<MediaAPIResponse<U>>>(url, data);

const POST = <T extends RequestModel, U extends ResponseModel>(
	url: string,
	data?: T,
	config?: AxiosRequestConfigProps
): any =>
	client.post<typeof data, AxiosResponse<MediaAPIResponse<U>>>(
		url,
		data,
		config
	);

export default {
	get: GET,
	post: POST
};
