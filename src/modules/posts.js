import {createAction, handleActions} from "redux-actions";
import createRequestSaga, {
    createRequestActionTypes
} from "../lib/createRequestSaga";
import * as postAPI from "../lib/api/posts"
import {takeLatest} from "redux-saga/effects";


const LIST_POSTS = "posts/LIST_POSTS";
const LIST_POSTS_SUCCESS = "posts/LIST_POSTS_SUCCESS";
const LIST_POSTS_FAILURE = "posts/LIST_POSTS_FAILURE";

export const listPosts = createAction(
    LIST_POSTS,
    ({tag, username, page}) => ({tag, username, page}),
);

const listPostsSaga = createRequestSaga(LIST_POSTS, postAPI.listPosts);
export function* postsSaga() {
    yield takeLatest(LIST_POSTS, listPostsSaga);
}

const initialState = {
    posts: null,
    error: null,
    listPage: 1
}

export default handleActions(
    {
        [LIST_POSTS_SUCCESS]: (state, {payload: posts, meta: response}) => ({
            ...state,
            posts: posts.postlist,
            lastPage: posts.lastpage // 문자열을 숫자로 변환
        }),
        [LIST_POSTS_FAILURE]: (state, {payload: error}) => ({
            ...state,
            error,
        })
    },
    initialState,
)



