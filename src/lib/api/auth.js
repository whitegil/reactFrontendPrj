import client from "./client"


//로그인 
export const login = ({username, password}) => 
    client.post("/api/auth/login", {username, password});

//구글 로그인 
export const googleLogin = ({userInfo}) => 
    client.post("/api/auth/googleLogin", {userInfo});

//회원가입
export const register = ({username, password}) => 
    client.post("/api/auth/register", {username, password});


//로그인 상태 확인
export const check = () => client.get("/api/auth/check");

//로그아웃
export const logout = () => client.post("/api/auth/logout");



