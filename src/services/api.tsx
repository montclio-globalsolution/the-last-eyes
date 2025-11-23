import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from "axios";

const DEFAULT_BASE_URL = "https://the-last-eyes-api.onrender.com";
const DEFAULT_TIMEOUT = 15000;

let api: AxiosInstance = createInstance(DEFAULT_BASE_URL);

function createInstance(baseURL: string): AxiosInstance {
    const instance = axios.create({
        baseURL,
        timeout: DEFAULT_TIMEOUT,
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
    });

    instance.interceptors.response.use(
        (response) => response.data,
        (error: AxiosError) => {
            const normalized = {
                message:
                    (error.response && (error.response as any).data && (error.response as any).data.message) ||
                    error.message ||
                    "Erro desconhecido na requisição",
                status: error.response ? error.response.status : null,
                original: error,
            };
            return Promise.reject(normalized);
        }
    );

    instance.interceptors.request.use(
        (config) => config,
        (err) => Promise.reject(err)
    );

    return instance;
}

export function getApiInstance(): AxiosInstance {
    return api;
}

export function setBaseURL(newBaseURL: string) {
    api = createInstance(newBaseURL);
}

export async function request<T = any>(config: AxiosRequestConfig): Promise<T> {
    return api.request<T>(config) as Promise<T>;
}

export default api;
