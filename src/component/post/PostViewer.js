import React from "react";
import styled from "styled-components";
import palette from "../../lib/styles/palette";
import Responsive from "../common/Responsive";
import SubInfo from "../common/SubInfo";
import Tags from "../common/Tags";
import {Helmet} from "react-helmet-async";

const PostViewerBlock = styled(Responsive)`
    margin-top: 4rem;
`;

const PostHead = styled.div`
    border-bottom: 1px solid ${palette.gray[2]};
    padding-bottom: 3rem;
    margin-bottom: 3rem;
    h1 {
        font-size: 3rem;
        line-height: 1.5;
        margin: 0;
    }
`;

const SubInfo_bak = styled.div`
    margin-top: 1rem;
    color: ${palette.gray[6]};

    /* span 사이에 가운뎃점 문자 보여 주기 */
    span + span: before {
        color: ${palette.gray[5]};
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

const PostContent = styled.div`
    font-size: 1.3125rem;
    color: ${palette.gray[8]};
`;

const PostViewer = ({post, error, loading, actionButtons}) => {

    //에러 발생시
    if(error) {
        if(error.response && error.response.state === 404){
            return <PostViewerBlock>존재하지 않는 포스트 입니다.</PostViewerBlock>
        }

        return <PostViewerBlock>오류 발생!</PostViewerBlock>;
    }

    //로딩 중이거나 아직 포스트 데이터가 없을 때
    if(loading || !post){
        return null;
    }

    const {title, body, user, publishedDate, tags} = post;

    return (
        <PostViewerBlock>
            <Helmet>
                <title>{title} - 리액뜨</title>
            </Helmet>
            <PostHead>
                <h1>{title}</h1>
                <SubInfo
                    username={user.username}
                    publishedDate={publishedDate}
                    hasMarginTop
                >
                </SubInfo>
                <Tags tags={tags}>
                </Tags>
            </PostHead>
            {actionButtons}
            <PostContent
                dangerouslySetInnerHTML={{__html: body}}
            >   
            </PostContent>
        </PostViewerBlock>
    )
}


export default PostViewer;
