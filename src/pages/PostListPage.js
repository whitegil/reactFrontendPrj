import React from "react";
import Header from "../component/common/Header";
import Button from "../component/common/Button";
import HeaderContainer from "../containers/common/HeaderContainer";
import PostList from "../component/post/PostList";
import PostListContainer from "../containers/posts/PostListContainer";
import PaginationContainer from "../containers/posts/PaginationContainer"

const PostListPage = () => {
    return (
        <div>
            <HeaderContainer/>
            <PostListContainer/>
            <PaginationContainer/>
        </div>
    )
};

export default PostListPage;