import axios, { AxiosError, AxiosInstance, RawAxiosRequestHeaders } from "axios";
import { ApiResponse, LoginResponse } from "../types/apiTypes";

export class APIRequest {
    protected baseUrl = "http://localhost:80/api"
    private static instance: APIRequest | null = null;
    private SECRET = "";
    constructor() {

    }

    static INSTANCE() {
        if (!this.instance) {
            this.instance = new APIRequest()
        }
        return this.instance;
    }

    axiosInstance(headers: RawAxiosRequestHeaders = {}): AxiosInstance {
        const defaultHeaders: RawAxiosRequestHeaders = {
            'Content-Type': 'application/json',
            Authorization: this.SECRET ? `Bearer ${this.SECRET}` : "",
        };
        const mergedHeaders = { ...defaultHeaders, ...headers };

        return axios.create({
            baseURL: this.baseUrl,
            timeout: 10000,
            headers: mergedHeaders,
        });
    }

    setSecret(token: string) {
        this.SECRET = token
    }

    async get<T = any, D = any>(
        url: string,
        params?: D,
        headers: RawAxiosRequestHeaders = {}
    ): Promise<ApiResponse<T> | undefined> {
        try {
            const axiosInstance = this.axiosInstance(headers);
            const response = await axiosInstance.get<ApiResponse<T>>(url, { params });
            return response.data;
        } catch (error) {
            const err = error as AxiosError;
            this.alertError(err);
        }
    }

    async loginPost(
        url: string,
        params: any,
        headers: RawAxiosRequestHeaders = {}
    ): Promise<LoginResponse | undefined> {
        try {
            const axiosInstance = this.axiosInstance(headers);
            const response = await axiosInstance.post<LoginResponse>(url, params);
            return response.data;
        } catch (error) {
            const err = error as AxiosError;
            this.alertError(err);
        }
    }

    async post<T = any>(
        url: string,
        params: any,
        headers: RawAxiosRequestHeaders = {}
    ): Promise<ApiResponse<T> | undefined> {
        try {
            const axiosInstance = this.axiosInstance(headers);
            const response = await axiosInstance.post<ApiResponse<T>>(url, params);
            return response.data;
        } catch (error) {
            const err = error as AxiosError;
            this.alertError(err);
        }
    }

    alertError = (err: AxiosError) => {
        if (err.response) {
            if (err.response.status === 429) {
                alert("Çok fazla istek attınız. 2 dakika bekleyiniz.")
            } else if (err.response.status === 422) {
                alert("Kullanıcı bilgilerini kontrol ediniz.")
            } else if (err.response.status === 500) {
                alert("Sunucuda bir hata var. Yetkili kişiyle irtibata geçiniz.")
            } else if (err.response.status !== 401) {
                alert(err.message)
            }
        }
    }
}