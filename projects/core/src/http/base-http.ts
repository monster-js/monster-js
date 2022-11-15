import { CustomRequestInitInterface } from "./interfaces/custom-request-init.interface";
import { HttpResponse } from "./types/http-response.type";

export class BaseHttp {

    protected baseUrl: string = null;

    protected get<T = any>(url: string, params: { [key: string]: any; } = {}, config: RequestInit = {}): HttpResponse<T> {
        return this.senderMethod(this.addUrlParams(url, params), 'GET', null, config);
    }

    protected delete<T = any>(url: string, params: { [key: string]: any; } = {}, config: RequestInit = {}): HttpResponse<T> {
        url = this.addUrlParams(url, params);
        return this.senderMethod(url, 'DELETE', null, config);
    }

    protected put<T = any>(url: string, body: { [key: string]: any; }, config: CustomRequestInitInterface = {}): HttpResponse<T> {
        const { params, ...newConfig } = config;
        if (params) url = this.addUrlParams(url, params);
        return this.senderMethod(url, 'PUT', body, newConfig);
    }

    protected post<T = any>(url: string, body: { [key: string]: any; }, config: CustomRequestInitInterface = {}): HttpResponse<T> {
        const { params, ...newConfig } = config;
        if (params) url = this.addUrlParams(url, params);
        return this.senderMethod(url, 'POST', body, newConfig);
    }

    protected patch<T = any>(url: string, body: { [key: string]: any; }, config: CustomRequestInitInterface = {}): HttpResponse<T> {
        const { params, ...newConfig } = config;
        if (params) url = this.addUrlParams(url, params);
        return this.senderMethod(url, 'PATCH', body, newConfig);
    }

    protected modifyConfig(config: RequestInit): RequestInit {
        return config;
    }

    protected modifyResponse(response: Promise<Response>): any {
        return response;
    }

    protected setHeader(config: RequestInit, header: string, value: string): RequestInit {
        if (!config.headers) {
            config.headers = {};
        }
        (config.headers as any)[header] = value;
        return config;
    }

    private senderMethod(url: string, method: 'PATCH' | 'PUT' | 'POST' | 'GET' | 'DELETE', body: any, config: RequestInit) {
        return this.send(this.formatUrl(this.baseUrl, url), method, body, config);
    }

    private send(url: string, method: 'PATCH' | 'PUT' | 'POST' | 'GET' | 'DELETE', body: { [key: string]: any; }, config: RequestInit = {}) {
        const headers: { [key: string]: any; } = this.formatHeaders(config);

        let fetchConfig = {
            method: method,
            ...config,
            headers,
        };

        if (!!body) fetchConfig.body = JSON.stringify(body);

        const newConfig = this.modifyConfig(fetchConfig);
        newConfig.headers = new Headers(newConfig.headers);
        return this.modifyResponse(fetch(url, newConfig));
    }

    private formatUrl(baseUrl: string, url: string) {
        return baseUrl ? `${baseUrl}${url}` : url;
    }

    private formatHeaders(config: RequestInit) {
        const headers: { [key: string]: any; } = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            ...(config.headers || {})
        };
        return headers;
    }

    private addUrlParams(url: string, params: { [key: string]: any; }): string {

        let hasOrigin = false;

        if (url.indexOf('http://') === 0 || url.indexOf('https://') === 0) hasOrigin = true;

        const dummyUrl = !hasOrigin ? 'http://dummyurl.com' : '';
        const urlInstance = new URL(`${dummyUrl}${url}`);
        Object.keys(params).forEach(key => urlInstance.searchParams.append(key, params[key]));

        return urlInstance.href.replace(dummyUrl, '');
    }
}
