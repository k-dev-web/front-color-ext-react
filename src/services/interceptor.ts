import {useState, useCallback} from 'react'
import {useIonToast} from "@ionic/react";

export const useHttp = () => {
    const [loading, setLoading] = useState(false);
    const [present] = useIonToast();
    const request = useCallback(async (url: string, method = 'GET', body: any = null,) => {
        setLoading(true);
        try {
            let token:string = '';
            token += localStorage.getItem('token')||'';
            let headers = {
                "Content-Type": 'application/json',
                "Authorization": 'bearer '+ token,
                "Accept": 'Access-Control-Allow-Origin'
            }

            if (body) {
                body = JSON.stringify(body);
            }

            const response = await fetch(process.env.REACT_APP_API_URL + url, {method, body, headers});
            const data = await response.json();
            if (data.statusCode&&(data.statusCode !== 200||data.statusCode !== 201)) {
                await present({
                    message: data.message,
                    duration: 2000,
                    position: "top",
                    color: "danger"
                });
            }
            setLoading(false);
            return data;

        } catch (e: any) {
            setLoading(false);
            await present({
                message: e.error.message,
                duration: 2000,
                position: "top",
                color: "danger"
            });

            throw e;
        }
    }, [])


    return {loading, request}
}
