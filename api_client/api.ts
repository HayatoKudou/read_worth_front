/* tslint:disable */
/* eslint-disable */
/**
 * Read Worth API
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import { Configuration } from './configuration';
import globalAxios, { AxiosPromise, AxiosInstance, AxiosRequestConfig } from 'axios';
// Some imports not used depending on template conditions
// @ts-ignore
import { DUMMY_BASE_URL, assertParamExists, setApiKeyToObject, setBasicAuthToObject, setBearerAuthToObject, setOAuthToObject, setSearchParams, serializeDataIfNeeded, toPathString, createRequestFunction } from './common';
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, RequestArgs, BaseAPI, RequiredError } from './base';

/**
 * 
 * @export
 * @interface ApiClientIdClientGet200Response
 */
export interface ApiClientIdClientGet200Response {
    /**
     * 
     * @type {number}
     * @memberof ApiClientIdClientGet200Response
     */
    'id': number;
    /**
     * 
     * @type {string}
     * @memberof ApiClientIdClientGet200Response
     */
    'name': string;
    /**
     * 
     * @type {string}
     * @memberof ApiClientIdClientGet200Response
     */
    'plan': string;
}
/**
 * 
 * @export
 * @interface ApiClientIdMeGet200Response
 */
export interface ApiClientIdMeGet200Response {
    /**
     * 
     * @type {number}
     * @memberof ApiClientIdMeGet200Response
     */
    'id': number;
    /**
     * 
     * @type {string}
     * @memberof ApiClientIdMeGet200Response
     */
    'name': string;
    /**
     * 
     * @type {string}
     * @memberof ApiClientIdMeGet200Response
     */
    'email': string;
    /**
     * 
     * @type {string}
     * @memberof ApiClientIdMeGet200Response
     */
    'apiToken': string;
    /**
     * 
     * @type {ApiClientIdMeGet200ResponseRole}
     * @memberof ApiClientIdMeGet200Response
     */
    'role': ApiClientIdMeGet200ResponseRole;
    /**
     * 
     * @type {Array<ApiClientIdMeGet200ResponseClientsInner>}
     * @memberof ApiClientIdMeGet200Response
     */
    'clients': Array<ApiClientIdMeGet200ResponseClientsInner>;
}
/**
 * 
 * @export
 * @interface ApiClientIdMeGet200ResponseClientsInner
 */
export interface ApiClientIdMeGet200ResponseClientsInner {
    /**
     * 
     * @type {number}
     * @memberof ApiClientIdMeGet200ResponseClientsInner
     */
    'id': number;
    /**
     * 
     * @type {string}
     * @memberof ApiClientIdMeGet200ResponseClientsInner
     */
    'name': string;
}
/**
 * 
 * @export
 * @interface ApiClientIdMeGet200ResponseRole
 */
export interface ApiClientIdMeGet200ResponseRole {
    /**
     * 
     * @type {boolean}
     * @memberof ApiClientIdMeGet200ResponseRole
     */
    'isAccountManager': boolean;
    /**
     * 
     * @type {boolean}
     * @memberof ApiClientIdMeGet200ResponseRole
     */
    'isBookManager': boolean;
    /**
     * 
     * @type {boolean}
     * @memberof ApiClientIdMeGet200ResponseRole
     */
    'isClientManager': boolean;
}
/**
 * 
 * @export
 * @interface ApiClientIdUserPostRequest
 */
export interface ApiClientIdUserPostRequest {
    /**
     * 
     * @type {string}
     * @memberof ApiClientIdUserPostRequest
     */
    'name': string;
    /**
     * 
     * @type {string}
     * @memberof ApiClientIdUserPostRequest
     */
    'email': string;
    /**
     * 
     * @type {Array<string>}
     * @memberof ApiClientIdUserPostRequest
     */
    'roles': Array<string>;
}
/**
 * 
 * @export
 * @interface ApiClientIdUsersGet200Response
 */
export interface ApiClientIdUsersGet200Response {
    /**
     * 
     * @type {Array<ApiClientIdUsersGet200ResponseUsersInner>}
     * @memberof ApiClientIdUsersGet200Response
     */
    'users': Array<ApiClientIdUsersGet200ResponseUsersInner>;
}
/**
 * 
 * @export
 * @interface ApiClientIdUsersGet200ResponseUsersInner
 */
export interface ApiClientIdUsersGet200ResponseUsersInner {
    /**
     * 
     * @type {number}
     * @memberof ApiClientIdUsersGet200ResponseUsersInner
     */
    'id': number;
    /**
     * 
     * @type {string}
     * @memberof ApiClientIdUsersGet200ResponseUsersInner
     */
    'name': string;
    /**
     * 
     * @type {string}
     * @memberof ApiClientIdUsersGet200ResponseUsersInner
     */
    'email': string;
    /**
     * 
     * @type {string}
     * @memberof ApiClientIdUsersGet200ResponseUsersInner
     */
    'apiToken': string;
    /**
     * 
     * @type {ApiClientIdMeGet200ResponseRole}
     * @memberof ApiClientIdUsersGet200ResponseUsersInner
     */
    'role': ApiClientIdMeGet200ResponseRole;
}
/**
 * 
 * @export
 * @interface ApiClientIdUsersGet403Response
 */
export interface ApiClientIdUsersGet403Response {
    /**
     * 
     * @type {Array<string>}
     * @memberof ApiClientIdUsersGet403Response
     */
    'name'?: Array<string>;
    /**
     * 
     * @type {Array<string>}
     * @memberof ApiClientIdUsersGet403Response
     */
    'email'?: Array<string>;
    /**
     * 
     * @type {Array<string>}
     * @memberof ApiClientIdUsersGet403Response
     */
    'roles'?: Array<string>;
}

/**
 * DefaultApi - axios parameter creator
 * @export
 */
export const DefaultApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @summary 組織情報
         * @param {number} clientId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiClientIdClientGet: async (clientId: number, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'clientId' is not null or undefined
            assertParamExists('apiClientIdClientGet', 'clientId', clientId)
            const localVarPath = `/api/{clientId}/client`
                .replace(`{${"clientId"}}`, encodeURIComponent(String(clientId)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication Bearer required


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary 自分の情報
         * @param {number} clientId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiClientIdMeGet: async (clientId: number, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'clientId' is not null or undefined
            assertParamExists('apiClientIdMeGet', 'clientId', clientId)
            const localVarPath = `/api/{clientId}/me`
                .replace(`{${"clientId"}}`, encodeURIComponent(String(clientId)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication Bearer required


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary ユーザー追加
         * @param {number} clientId 
         * @param {ApiClientIdUserPostRequest} [apiClientIdUserPostRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiClientIdUserPost: async (clientId: number, apiClientIdUserPostRequest?: ApiClientIdUserPostRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'clientId' is not null or undefined
            assertParamExists('apiClientIdUserPost', 'clientId', clientId)
            const localVarPath = `/api/{clientId}/user`
                .replace(`{${"clientId"}}`, encodeURIComponent(String(clientId)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication Bearer required


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(apiClientIdUserPostRequest, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary 組織に所属しているユーザー情報
         * @param {number} clientId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiClientIdUsersGet: async (clientId: number, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'clientId' is not null or undefined
            assertParamExists('apiClientIdUsersGet', 'clientId', clientId)
            const localVarPath = `/api/{clientId}/users`
                .replace(`{${"clientId"}}`, encodeURIComponent(String(clientId)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication Bearer required


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * DefaultApi - functional programming interface
 * @export
 */
export const DefaultApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = DefaultApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @summary 組織情報
         * @param {number} clientId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiClientIdClientGet(clientId: number, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ApiClientIdClientGet200Response>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.apiClientIdClientGet(clientId, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary 自分の情報
         * @param {number} clientId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiClientIdMeGet(clientId: number, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ApiClientIdMeGet200Response>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.apiClientIdMeGet(clientId, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary ユーザー追加
         * @param {number} clientId 
         * @param {ApiClientIdUserPostRequest} [apiClientIdUserPostRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiClientIdUserPost(clientId: number, apiClientIdUserPostRequest?: ApiClientIdUserPostRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.apiClientIdUserPost(clientId, apiClientIdUserPostRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary 組織に所属しているユーザー情報
         * @param {number} clientId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiClientIdUsersGet(clientId: number, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ApiClientIdUsersGet200Response>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.apiClientIdUsersGet(clientId, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * DefaultApi - factory interface
 * @export
 */
export const DefaultApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = DefaultApiFp(configuration)
    return {
        /**
         * 
         * @summary 組織情報
         * @param {number} clientId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiClientIdClientGet(clientId: number, options?: any): AxiosPromise<ApiClientIdClientGet200Response> {
            return localVarFp.apiClientIdClientGet(clientId, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary 自分の情報
         * @param {number} clientId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiClientIdMeGet(clientId: number, options?: any): AxiosPromise<ApiClientIdMeGet200Response> {
            return localVarFp.apiClientIdMeGet(clientId, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary ユーザー追加
         * @param {number} clientId 
         * @param {ApiClientIdUserPostRequest} [apiClientIdUserPostRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiClientIdUserPost(clientId: number, apiClientIdUserPostRequest?: ApiClientIdUserPostRequest, options?: any): AxiosPromise<void> {
            return localVarFp.apiClientIdUserPost(clientId, apiClientIdUserPostRequest, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary 組織に所属しているユーザー情報
         * @param {number} clientId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiClientIdUsersGet(clientId: number, options?: any): AxiosPromise<ApiClientIdUsersGet200Response> {
            return localVarFp.apiClientIdUsersGet(clientId, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * DefaultApi - object-oriented interface
 * @export
 * @class DefaultApi
 * @extends {BaseAPI}
 */
export class DefaultApi extends BaseAPI {
    /**
     * 
     * @summary 組織情報
     * @param {number} clientId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApi
     */
    public apiClientIdClientGet(clientId: number, options?: AxiosRequestConfig) {
        return DefaultApiFp(this.configuration).apiClientIdClientGet(clientId, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary 自分の情報
     * @param {number} clientId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApi
     */
    public apiClientIdMeGet(clientId: number, options?: AxiosRequestConfig) {
        return DefaultApiFp(this.configuration).apiClientIdMeGet(clientId, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary ユーザー追加
     * @param {number} clientId 
     * @param {ApiClientIdUserPostRequest} [apiClientIdUserPostRequest] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApi
     */
    public apiClientIdUserPost(clientId: number, apiClientIdUserPostRequest?: ApiClientIdUserPostRequest, options?: AxiosRequestConfig) {
        return DefaultApiFp(this.configuration).apiClientIdUserPost(clientId, apiClientIdUserPostRequest, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary 組織に所属しているユーザー情報
     * @param {number} clientId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApi
     */
    public apiClientIdUsersGet(clientId: number, options?: AxiosRequestConfig) {
        return DefaultApiFp(this.configuration).apiClientIdUsersGet(clientId, options).then((request) => request(this.axios, this.basePath));
    }
}


