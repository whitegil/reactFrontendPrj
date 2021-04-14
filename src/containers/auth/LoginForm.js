import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {changeField, initializeForm, login, googleLogin} from "../../modules/auth";
import AuthForm from "../../component/auth/AuthForm";
import {check} from "../../modules/user";
import {withRouter} from "react-router-dom";

const LoginForm = ({history}) => {

    const [error, setError] = useState(null);

    const dispatch = useDispatch();
    const {form, auth, authError, user} = useSelector(({auth, user}) => ({
        form: auth.login,
        auth: auth.auth,
        authError: auth.authError,
        user: user.user,
        userInfo: user.userInfo
    }));

    //인풋 변경 이벤트 핸들러
    const onChange = e => {
        const {value, name} = e.target;
        dispatch(
            changeField({
                form: "login",
                key: name,
                value
            })
        );
    };

    //폼 등록 이벤트 핸들러
    const onSubmit = e => {
        e.preventDefault();
        const{username, password} = form;
        dispatch(login({username, password}));
    }

    //구글로그인시 처리
    const googleLoginSucess = e => {
        const userInfo = e;
        dispatch(googleLogin({userInfo}));
    }

    //네이버 로그인시 처리
    const { naver } = window;

    const naverLogin = () => {
        Naver();
        UserProfile();
    }

    const Naver = () => {
        const naverLogin = new naver.LoginWithNaverId({
            clientId: "e1KwXNIuObvulqlt0B_d",
            callbackUrl: "http://localhost:8080/api/auth/naverLogin?naverLogin=true",
            isPopup: true,
            loginButton: { color: 'green', type: 3, height: '50' }
        });
        naverLogin.init();
    };

    const UserProfile = () => {
        window.location.href.includes('access_token') && GetUser();
        function GetUser() {
          const location = window.location.href.split('=')[1];
          const token = location.split('&')[0];
          console.log("token: ", token);
        }
    };

    useEffect(naverLogin, []);


    //컴포넌트가 처음 렌더링될 때 form을 초기화함
    useEffect(()=>{
        dispatch(initializeForm("login"));
    }, [dispatch])

    useEffect(()=>{
        if (authError) {
            console.log("오류 발생");
            console.log(authError);
            setError("로그인 실패");
            return;
        }

        if (auth) {
            console.log("로그인 성공");
            dispatch(check());
        }
    },[auth, authError, dispatch])

    useEffect(()=>{
        if (user) {
            history.push("/");
            try {
                localStorage.setItem("user", JSON.stringify(user));
            } catch (e) {
                console.log("localstorage is not working");
            }
        }
    }, [history, user])

    return (
        <AuthForm
            type="login"
            form={form}
            onChange={onChange}
            onSubmit={onSubmit}
            error={error}
            googleLogin={googleLoginSucess}
            naverLogin={naverLogin}>
        </AuthForm>
    )
}

export default withRouter(LoginForm);
