import {IonContent, IonHeader, IonPage, IonRow, IonTitle, IonInput, IonButton, IonCard} from '@ionic/react';
import './Login.scss';
import {Auth} from "../../providers";
import {useEffect, useState} from "react";

const Login: React.FC = () => {
    const {login, signup} = Auth();
    const [loginValue, setLoginValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [errors, setErrors] = useState({login: {message: ''}, password: {message: ''}});
    const [isValid, setIsValid] = useState(false);
    const [inFocus,setInFocus] = useState(false);


    const loginIn = () => {
        login({login: loginValue, username: loginValue, password: passwordValue});
    }

    const signupIn = () => {
        signup({login: loginValue, username: loginValue, password: passwordValue});
    }
    const onInput = async (e?: any, type?: string) => {
        if (type === 'login') {

             setLoginValue(e.target.value)
        }
        if (type === 'password') {
             setPasswordValue(e.target.value)
        }
    }
    useEffect(()=>{
        if(inFocus)
        isFormValid();
    },[loginValue,passwordValue,inFocus])


    const isFormValid = () => {
       let e= {login: {message: ''}, password: {message: ''}}
        if (!loginValue) {
            e.login.message ='Login is required';
        }
        else if (loginValue.length < 4) {
            e.login.message='Login min length 4';

        }

        if (!passwordValue) {
            e.password.message= 'Password is required';
        }
        else if (passwordValue.length < 4) {
            e.password.message= 'Password min length 4';
        }

        if(e.password.message||e.login.message){
            setIsValid(false);
        }
        else {
            setIsValid(true);
        }
        setErrors(e);
    }

    return (
        <IonPage>
            <IonHeader>
                <IonTitle>{'LOGIN'}</IonTitle>
            </IonHeader>
            <IonContent fullscreen>
                <IonCard className='center'>
                    <form>
                        <IonRow className="input">
                            <IonInput
                                value={loginValue}
                                name="login"
                                placeholder="Login"
                                onIonInput={(e: any) => onInput(e, 'login')}
                                onIonFocus ={(e: any) =>setInFocus(true)}

                            ></IonInput>
                            {errors.login.message && <span> {errors.login.message}</span>}

                        </IonRow>

                        <IonRow className="input">
                            <IonInput
                                value={passwordValue}
                                name="password"
                                placeholder="Password"
                                onIonInput={(e: any) => onInput(e, 'password')}
                                onIonFocus ={(e: any) =>setInFocus(true)}

                            ></IonInput>
                            {errors.password.message && <span> {errors.password.message}</span>}

                        </IonRow>
                        <IonRow className="buttons">
                            <IonButton
                                color="primary"
                                onClick={loginIn}
                                disabled={!isValid}
                            >{'LOGIN'}</IonButton>
                            <IonButton
                                color="primary"
                                onClick={signupIn}
                                disabled={!isValid}

                            >{'SIGNUP'}</IonButton>

                        </IonRow>
                    </form>
                </IonCard>
            </IonContent>
        </IonPage>
    )
        ;
};

export default Login;
