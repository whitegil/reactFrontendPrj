import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {withRouter} from "react-router-dom";
import {readPost, unloadPost} from "../../modules/post";
import PostViewer from "../../component/post/PostViewer";
import PostActionButtons from "../../component/post/PostActionButtons";
import {setOriginalPost} from "../../modules/write";
import user from "../../modules/user";
import {removePost} from "../../lib/api/posts";

const PostViewerContainer = ({match, history}) => {
    
    //처음 마운트 될때 포스트 읽기 API 요청
    const {postId} = match.params;
    const dispatch = useDispatch();
    const {post, error, loading, user} = useSelector(({post, loading, user}) => ({
        post: post.post,
        error: post.error,
        loading: loading["post/READ_POST"],
        user: user.user
    }))

    useEffect(()=>{
        dispatch(readPost(postId));
        //언마운트 될 때 ㄹ리덕스에서 포스트 데이터 없애기
        return  () => {
            dispatch(unloadPost());
        };
    }, [dispatch, postId]);

    const onEdit = () => {
        dispatch(setOriginalPost(post));
        history.push("/write");
    }

    const onRemove = async () => {
        try {
            await removePost(postId);
            history.push("/");
        } catch (e) {
            console.log(e);
        }
    }

    const ownPost = (user && user._id) === (post && post.user._id);

    return <PostViewer 
                post={post} 
                loading={loading} 
                error={error} 
                actionButtons={ownPost && <PostActionButtons onEdit={onEdit} onRemove={onRemove}/>}
            />;
}

export default withRouter(PostViewerContainer);
