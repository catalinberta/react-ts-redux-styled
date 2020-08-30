import axios, {
	AxiosError,
	AxiosInstance,
	AxiosPromise,
	AxiosRequestConfig,
	AxiosResponse, Canceler
} from 'axios';
import CONFIG from '../config/config.json';
import {
	AxiosRequestConfigProps,
	RequestModel,
	ResponseModel
} from './types';
import {APIResponse} from './types';

const BASE_URL =
		process.env.NODE_ENV === 'development' ? CONFIG.DEV.BASE_URL : CONFIG.PRODUCTION.BASE_URL,
	client: AxiosInstance = axios.create({
		baseURL: BASE_URL,
		responseType: 'json',
		headers: {
			'Content-Type': 'application/json'
		},
		withCredentials: true,
		transformResponse: <T extends ResponseModel>(response: {}) => response
	});

let requestCancelFunctions:any = {};
const storeRequestCancelFc = (requestId:string, cancelFc:Canceler) => {
	requestCancelFunctions[requestId] = cancelFc;
};

interface AxiosRequestConfigCustom extends Partial<AxiosRequestConfig> {
	requestId?: string
}

client.interceptors.request.use(
	(config: AxiosRequestConfigCustom) => {
		const {requestId} = config;
		if(requestId) {
			requestCancelFunctions[requestId] && requestCancelFunctions[requestId]();
			config.cancelToken = new axios.CancelToken(storeRequestCancelFc.bind(null, requestId));
		}
		// set token
		return config;
	},
	(error: AxiosError) => {
		return Promise.reject(error);
	}
);

client.interceptors.response.use(
	response => {
		return response;
	},
	error => {
		// const errorResponse: AxiosResponse = error.response;
		// if (errorResponse.status === 401) {
			// return reset token
		// }
		return Promise.reject(error);
	}
);

const GET = <T extends RequestModel, U extends ResponseModel>(
	url: string,
	data?: T
): AxiosPromise<APIResponse<U>> => {
	return client.get<typeof data, AxiosResponse<APIResponse<U>>>(url, data);
};

const POST = <T extends RequestModel, U extends ResponseModel>(
	url: string,
	data?: T,
	config?: AxiosRequestConfigProps
): AxiosPromise<APIResponse<U>> => {
	return client.post<typeof data, AxiosResponse<APIResponse<U>>>(url, data, config);
};

export default {
	get: GET,
	post: POST
};
