import {createAction, handleActions} from "redux-actions";
import {takeLatest, call} from "redux-saga/effects";
import * as authAPI from "../lib/api/auth"
import createRequestSaga from "../lib/createRequestSaga";


//새로고침 이후 임시 로그인 처리
const TEMP_SET_USER = "auth/TEMP_SET_USER";

//회원 정보 확인
// const [CHECK, CHECK_SUCCESS, CHECK_FAILURE] = createRequestActionTypes(
//     "user/CHECK",
// );

const CHECK = "user/CHECK";
const CHECK_SUCCESS = "user/CHECK_SUCCESS";
const CHECK_FAILURE = "user/CHECK_FAILURE";

const LOGOUT = "user/LOGOUT";

// const LOGIN = "auth/LOGIN"
// const LOGIN_SUCCESS = "auth/LOGIN_SUCCESS";
// const LOGIN_FAILURE = "auth/LOGIN_FAILURE";

export const tempSetUser = createAction(TEMP_SET_USER, user => user);
export const check = createAction(CHECK);
export const logout = createAction(LOGOUT);


const checkSaga = createRequestSaga(CHECK, authAPI.check);

function checkFailureSaga(){
    try {
        localStorage.removeItem("user"); //localStoreage에서 user를 제거
    } catch(e) {
        console.log("localStorage is err");
    }
}

function* logoutSaga(){
    try {
        //logout API 호출
        yield call(authAPI.logout);
        //localStorage에서 user를 제거
        localStorage.removeItem("user");
    } catch (e) {
        console.log(e);
    }
}

export function* userSaga() {
    yield takeLatest(CHECK, checkSaga);
    yield takeLatest(CHECK_FAILURE, checkFailureSaga);
    yield takeLatest(LOGOUT, logoutSaga);
}

const initialState = {
    user: null,
    checkError: null
}

export default handleActions(
    {
        [TEMP_SET_USER]: (state, {payload: user}) => ({
            ...state,
            user,
        }),
        [CHECK_SUCCESS]: (state, {payload: user}) => ({
            ...state,
            user,
            checkError: null
        }),
        [CHECK_FAILURE]: (state, {payload: error}) => ({
            ...state,
            checkError: null,
        }),
        [LOGOUT]: state => ({
            ...state,
            user: null
        })
    },
    initialState,
)



