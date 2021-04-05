import React from "react";
import styled from "styled-components";
import Responsive from "../common/Responsive";
import Button from "../common/Button";
import palette from "../../lib/styles/palette";
import SubInfo from "../common/SubInfo";
import Tags from "../common/Tags";
import {Link} from "react-router-dom";

const PostListBlock = styled(Responsive)`
    margin-top: 4rem;
`;

const WritePostButtonWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-bottom: 3rem;
`;

const PostItemBlock = styled.div`
    padding-top: 3rem;
    padding-bottom: 3rem;
    
    /* 맨위 포스트는 padding-top 없음 */
    &:first-child {
        padding-top: 0;
    }
    & + & {
        border-top: 1px solid ${palette.gray[2]};
    }
    h2 {
        font-size: 2rem;
        margin-bottom: 0;
        margin-top: 0;
        &:hover {
            color: ${palette.gray[6]}
        }
    }
    p {
        margin-top: 2rem;
    }
`;

const SubInfo_bak = styled.div`
    margin-top: 1rem;
    color: ${palette.gray[6]};

    /* span 사이에 가운뎃점 문자 보여 주기 */
    span + span: before {
        color: ${palette.gray[4]};
        padding-left: 0.25rem;
        padding-right: 0.25rem;
        content: '\\B7';
    }
`;

const Tags_bak = styled.div`
    margin-top: 0.5rem;
    .tag {
        display: inline-block;
        color: ${palette.gray[7]};
        text-decoration: none;
        margin-right: 0.5rem;
        &:hover {
          color: ${palette.cyan[6]};
        }
    }
`;

const PostItem = ({post}) => {
    
    const {publishedDate, user, tags, title, body, _id} = post;

    return (
        <PostItemBlock>
            <h2>
                <Link to={`/@${user.username}/${_id}`}>{title}</Link>
            </h2>
            <SubInfo 
                username={user.username}
                publishedDate={publishedDate}
            />
            <Tags tags={tags} />
            <p>{body}</p>
        </PostItemBlock>
    )
}

const PostList = ({posts, loading, error, showWriteButton}) => {

    //에러발생시
    if(error){
        return <PostListBlock>에러가 발생했습니다.</PostListBlock>
    }

    return (
        <PostListBlock>
            <WritePostButtonWrapper>
                {showWriteButton && (
                    <Button cyan to="/write">
                        새 글 작성하기
                    </Button>
                )}
            </WritePostButtonWrapper>
            {/* 로딩 중이 아니고, 포스트 배열이 존재할 때만 보여 줌 */}
            {!loading && posts && (
                <div>
                    {posts.map(post =>(
                        <PostItem post={post.post} key={post._id}></PostItem>
                    ))}
                </div>
            )}
        </PostListBlock>
    )
}

export default PostList;
