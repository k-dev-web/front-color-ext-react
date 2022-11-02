import {Api} from "./api";
import {useHistory} from "react-router";


export const Auth = () => {
    const {post} = Api()
    const history = useHistory();
    const login = async (accountInfo: any) => {
        let seq = await post('auth/login', accountInfo);
        if (seq.token) {
            _loggedIn(seq.token);
            history.push('colors');
        }
    }

    const signup = async (accountInfo: any) => {
        let seq = await post('auth/signup', accountInfo);
        if (seq.token) {
            _loggedIn(seq.token);
            history.push('colors');
        }
    }

    const logout = () => {
        localStorage.removeItem('token');
        history.push('login');
    }


    function _loggedIn(token: string) {
        localStorage.setItem('token', token);
    }

    return {signup, logout, login}
}
