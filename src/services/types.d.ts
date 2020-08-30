// initial API types
import { AxiosRequestConfig } from 'axios';

export interface RequestModel {
	campaignUuid: string;
	data: {
		email: string;
	}
}

export interface ResponseModel {
	status: string;
}

export interface APIResponse<T extends ResponseModel> {
	data: T;
}
export interface AxiosRequestConfigProps extends AxiosRequestConfig {
	requestId?: string;
}