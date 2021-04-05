import React from "react";
import HeaderContainer from "../containers/common/HeaderContainer";
import PostViewer from "../component/post/PostViewer";
import PostViewerContainer from "../containers/posts/PostViewerContainer";

const PostPage = () => {
    return (
        <>
            <HeaderContainer />
            <PostViewerContainer />
        </>
    )
};

export default PostPage;