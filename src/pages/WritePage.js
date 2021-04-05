import React from "react";
import Editor from "../component/write/Editor";
import TagBox from "../component/write/TagBox";
import Responsive from "../component/common/Responsive";
import WriteActionButtonBlock from "../component/write/WriteActionButtons"
import EditorContainer from "../containers/write/EditorContainer";
import TagBoxContainer from "../containers/write/TagBoxContainer";
import WriteActionButtonsContainer from "../containers/write/WriteActionButtonsContainer";
import {Helmet} from "react-helmet-async";

const WritePage = () => {
    return (
        <Responsive>
            <Helmet>
                <title>
                    글 작성하장 - 냠냠
                </title>
            </Helmet>
            <EditorContainer/>
            <TagBoxContainer/>
            <WriteActionButtonsContainer/>
        </Responsive>
    )
};

export default WritePage;