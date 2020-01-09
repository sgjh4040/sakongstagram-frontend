import React from "react";
import {  Route, Switch,Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import Auth from "../Routes/Auth"
import Feed from "../Routes/Feed";
import Explore from "../Routes/Explore";
import Search from "../Routes/Search";
import Profile from "../Routes/Profile";
import Post from "../Routes/Post";
import Upload from "../Routes/Upload";
import Chat from "../Routes/Chat"
import ChatRoom from "../Routes/ChatRoom"


const LoggedInRoutes = () =>
    <>
        <Switch>
            <Route exact path="/" component={Feed} />
            <Route path="/explore" component={Explore} />
            <Route path="/search" component={Search} />
            <Route path="/upload" component={Upload} />
            <Route path="/chat/:id" component={ChatRoom} />
            <Route path="/chat" component={Chat} />
            <Route path="/post/:id" component={Post} />
            <Route path="/:id" component={Profile} />
            <Redirect from="*" to="/" />
        </Switch>
    </>
const LoggedOutRoutes = () =>
    <>
        <Switch>
            <Route exact path="/" component={Auth} />
            <Redirect from="*" to="/" />
        </Switch>
    </>

const AppRouter = ({ isLoggedIn }) =>
  isLoggedIn ? <LoggedInRoutes /> : <LoggedOutRoutes />;

AppRouter.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired
};

export default AppRouter;