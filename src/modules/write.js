import {createAction, handleActions} from "redux-actions";
import createRequestSaga from "../lib/createRequestSaga"
import * as postsAPI from "../lib/api/posts";
import {takeLatest} from "redux-saga/effects";

// 모든내용 초기화
const INITIALIZE = "write/INITIALIZE"; 
//특정 KEY 값 바꾸기
const CHANGE_FIELD = "write/CHANGE_FIELD";

export const changeField = createAction(CHANGE_FIELD, ({key, value}) => ({
    key,
    value
}))


const WRITE_POST = "write/WRITE_POST";
const WRITE_POST_SUCCESS = "write/WRITE_POST_SUCCESS";
const WRITE_POST_FAILURE = "write/WRITE_POST_FAILURE";

export const writePost = createAction(WRITE_POST, ({title, body, tags}) => ({
    title,
    body,
    tags,
}))

const UPDATE_POST = "write/UPDATE_POST";
const UPDATE_POST_SUCCESS = "write/UPDATE_POST_SUCCESS";
const UPDATE_POST_FAILURE = "write/UPDATE_POST_FAILURE";

export const updatePost = createAction(UPDATE_POST, ({id, title, body, tags}) => ({
    id,
    title,
    body,
    tags
}))

//사가 생성 
const writePostSaga = createRequestSaga(WRITE_POST, postsAPI.writePost);
const updatePostSaga = createRequestSaga(UPDATE_POST, postsAPI.updatePost);

export function* writeSaga() {
    yield takeLatest(WRITE_POST, writePostSaga);
    yield takeLatest(UPDATE_POST, updatePostSaga);
}



const SET_ORIGINAL_POST = "write/SET_ORIGINAL_POST";
export const setOriginalPost = createAction(SET_ORIGINAL_POST, post => post);







export const initialize = createAction(INITIALIZE);

const initialState = {
    title: "",
    body: "",
    tags: [],
    post: null,
    postError: null,
    originalPostId: null,
}

const write = handleActions(
    {
        [INITIALIZE]: state => initialState, // initialState를 넣으면 초기 상태로 변경
        [CHANGE_FIELD]: (state, {payload: {key, value}}) => ({
            ...state,
            [key]: value // 특정 key값을 업데이트
        }),
        [WRITE_POST]: state => ({
            ...state,
            //post와 postError를 초기화
            post: null,
            postError: null
        }),
        //포스트 작성 성공 
        [WRITE_POST_SUCCESS]: (state, {payload: post}) => ({
            ...state,
            post
        }),
        //포스트 작성 실패
        [WRITE_POST_FAILURE]: (state, {payload: postError}) =>({
            ...state,
            postError
        }),
        [SET_ORIGINAL_POST]: (state, {payload:post}) => ({
            ...state,
            title: post.title,
            body: post.body,
            tags: post.tags,
            originalPostId: post._id
        }),
        [UPDATE_POST_SUCCESS]: (state, {payload: post}) => ({
            ...state,
            post,
        }),
        [UPDATE_POST_FAILURE]: (state, {payload: postError}) => ({
            ...state,
            postError
        })
    },
    initialState
)

export default write;