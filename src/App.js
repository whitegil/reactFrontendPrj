import React from "react";
import {Route} from "react-router-dom";
import PostListPage from "./pages/PostListPage";
import LoginPage from "./pages/LoginPage";
import PostPage from "./pages/PostPage";
import WritePage from "./pages/WritePage";
import RegisterPage from "./pages/RegisterPage";
import {Helmet} from "react-helmet-async";

const App = () => {
  return (
    <>
      <Helmet>
        <title>백한길 - React - Home</title>
      </Helmet>
      <Route component={PostListPage} path={['/@:username', '/']} exact />
      <Route component={LoginPage} path="/login"/>
      <Route component={RegisterPage} path="/register"/>
      <Route component={WritePage} path="/write"/>
      <Route component={PostPage} path="/@:username/:postId"/>
    </>
  )
}

export default App;
