import {useCallback} from "react";
import {useHttp} from "../services/interceptor";

export const Api = () => {
    const {request} = useHttp();
    const get = useCallback(async (endpoint: string, params?: any) => {
        let sendParams = '';
        if (params) {
            sendParams = '?';
            for (let k in params) {
                sendParams += `${k}=${params[k]}`;
            }
        }
        try {
            const req = await request(endpoint + sendParams, 'GET')
            return req
        } catch (e) {
            return {error: e}
        }
    }, [request])


    const post = useCallback(async (endpoint: string, body: any) => {
        try {
            const req = await request(endpoint, 'POST', body)
            return req
        } catch (e) {
            return {error: e}
        }
    }, [request])

    return {post, get}
}
