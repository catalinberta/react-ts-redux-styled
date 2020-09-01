import { AxiosRequestConfig } from 'axios';

export interface RequestModel {}

export interface ResponseModel {}

export interface MediaAPIList<T extends ResponseModel> {
	items: T[];
}

export interface MediaAPIResponse<T extends ResponseModel> {
	success: boolean;
	data: T;
}

export interface AxiosRequestConfigProps extends AxiosRequestConfig {
	requestId?: string;
}
