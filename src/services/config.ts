/**
 * You can modify this file
 *
 * @version 6
 *
 */
import Axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
// @ts-ignore
import qs from 'qs';
import { getHasToken, getToken } from '../utils/token';

const baseConfig: AxiosRequestConfig = {
  baseURL: process.env.API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json-patch+json',
    Authorization: getHasToken() ? `Bearer ${getToken()}` : undefined,
  },
  paramsSerializer: (param) => qs.stringify(param, { indices: false }),
};

let axiosInstance: AxiosInstance;

class RequestError extends Error {
  constructor(
    public message: string,
    public status?: number,
    public response?: AxiosResponse,
  ) {
    super(message);
  }

  isApiException = true;

  static isRequestError(error: any): error is RequestError {
    return error.isApiException;
  }
}

function getAxiosInstance(security: Security): AxiosInstance {
  if (!axiosInstance) {
    axiosInstance = Axios.create(baseConfig);

    // Response interceptor
    axiosInstance.interceptors.response.use(
      (async (response: AxiosResponse): Promise<SwaggerResponse<any>> => {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        /**
         * Example on response manipulation
         *
         * @example
         *   const swaggerResponse: SwaggerResponse = {
         *     ...response,
         *   };
         *   return swaggerResponse;
         */
        return response.data;
      }) as any,
      (error: AxiosError) => {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error

        if (error.response) {
          // Extract error message from response data
          let errorMessage = 'Something went wrong';
          const responseData = error.response.data;
          
          if (typeof responseData === 'string') {
            errorMessage = responseData;
          } else if (responseData && typeof responseData === 'object') {
            // Handle object responses like {message, error, statusCode}
            if ('message' in responseData && typeof responseData.message === 'string') {
              errorMessage = responseData.message;
            } else if ('error' in responseData && typeof responseData.error === 'string') {
              errorMessage = responseData.error;
            } else if (Array.isArray(responseData.message)) {
              errorMessage = responseData.message[0] || errorMessage;
            }
          }
          
          return Promise.reject(new RequestError(errorMessage, error.response.status, error.response));
        }

        if (error.isAxiosError) {
          return Promise.reject(new RequestError('noInternetConnection'));
        }
        return Promise.reject(error);
      },
    );
  }

  // ًًRequest interceptor
  axiosInstance.interceptors.request.use(
    async (requestConfig) => {
      // Do something before request is sent
      /** Example on how to add authorization based on security */
      if (security?.[0]) {
        // requestConfig.headers.authorization = "";
      }

      return requestConfig;
    },
    (error) => {
      // Do something with request error
      return Promise.reject(error);
    },
  );

  return axiosInstance;
}

export type Security = any[] | undefined;

// export interface SwaggerResponse<R> extends AxiosResponse<R> {}
export type SwaggerResponse<R> = R;

export { getAxiosInstance, RequestError };
