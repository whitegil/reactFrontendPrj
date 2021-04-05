import React, {useEffect} from "react";
import WriteActionButtons from "../../component/write/WriteActionButtons";
import {useDispatch, useSelector} from "react-redux";
import {writePost, updatePost} from "../../modules/write";
import {withRouter} from "react-router-dom";

const WriteActionButtonsContainer = ({history}) => {
    
    const dispatch = useDispatch();
    
    const {title, body, tags, post, postError, originalPostId} = useSelector(({write}) => ({
        title: write.title,
        body: write.body,
        tags: write.tags,
        post: write.post,
        postError: write.postError,
        originalPostId: write.originalPostId
    }));

    //포스트 등록
    const onPublish = () => {

        if(originalPostId){
            dispatch(updatePost({title, body, tags, id: originalPostId}));
            return;
        }

        dispatch(
            writePost({
                title,
                body,
                tags,  
            })
        )
    }

    const onCancel = () => {
        history.goBack();
    }

    //언마운트될 때 초기화
    useEffect(()=>{

        if (post) {
            const {_id, user} = post;
            history.push(`/@${user.username}/${_id}`);
        }

        if (postError) {
            console.log(postError);
        }

    }, [history, post, postError]);

    return <WriteActionButtons  
                onPublish={onPublish} 
                onCancel={onCancel}
                isEdit={!!originalPostId}
            >    
            </WriteActionButtons>;

}

export default withRouter(WriteActionButtonsContainer);
