import { generateAuthToken } from "@/common/facade/encryption";
import type { BaseResponse } from "@/model/BaseResponse";

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";


abstract class ApiHandler {
  private getApiUri(): string {
    const apiFromEnv = import.meta.env.VITE_API_URI;

    if (!apiFromEnv) {
      throw new Error('API_URI not found in environment. Set API_URI.');
    }
    return apiFromEnv.replace(/\/+$/, '');
  }

  /**
   * Template method for all API requests.
   */
  protected async request<T>(
    method: HttpMethod,
    uri: string,
    requestBody?: any,
    requestHeader: Record<string, string> = {}
  ): Promise<BaseResponse<T>> {
    const baseUrl = this.getApiUri();
    const url = `${baseUrl}${uri}`;

    try {
      const resp = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...requestHeader,
        },
        body: method !== 'GET' ? JSON.stringify(requestBody ?? {}) : undefined,
      });

      const parsed: BaseResponse<T> = await resp.json().catch(() => ({
        status: false,
        code: String(resp.status),
        message: resp.statusText,
        data: null,
      }));

      // If fetch itself was ok but backend sends code, respect it
      return {
        status: parsed.status ?? resp.ok,
        code: parsed.code ?? String(resp.status),
        message: parsed.message ?? resp.statusText,
        data: parsed.data ?? null,
      };
    } catch (err: any) {
      return {
        status: false,
        code: 'INTERNAL_ERROR',
        message: err?.message || 'Unknown error occurred',
        data: null,
      };
    }
  }

  /**
   * Request with HMAC-based access token header.
   */
  protected async requestWithAccessToken<T>(
    method: HttpMethod,
    uri: string,
    requestBody?: any,
    requestHeader: Record<string, string> = {}
  ): Promise<BaseResponse<T>> {
    const token = await generateAuthToken(requestBody ?? {});
    return this.request<T>(method, uri, requestBody, {
      ...requestHeader,
      'X-AUTH-TOKEN': token,
    });
  }

  /**
   * Request without access token header.
   */
  protected async requestWithoutAccessToken<T>(
    method: HttpMethod,
    uri: string,
    requestBody?: any,
    requestHeader: Record<string, string> = {}
  ): Promise<BaseResponse<T>> {
    return this.request<T>(method, uri, requestBody, {
      ...requestHeader,
    });
  }
}

export default ApiHandler;