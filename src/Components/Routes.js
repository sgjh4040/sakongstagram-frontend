import React from "react";
import {  Route, Switch } from "react-router-dom";
import PropTypes from "prop-types";
import Auth from "../Routes/Auth"
import Feed from "../Routes/Feed";
import Explore from "../Routes/Explore";
import Search from "../Routes/Search";
import Profile from "../Routes/Profile";
import ModalPost from "./ModalPost";


const LoggedInRoutes = () =>
    <>
        <Switch>
            <Route exact path="/" component={Feed} />
            <Route path="/explore" component={Explore} />
            <Route path="/search" component={Search} />
            <Route path="/modaltest" component={ModalPost} />
            <Route path="/:id" component={Profile} />
        </Switch>
    </>
const LoggedOutRoutes = () =>
    <>
        <Switch>
            <Route exact path="/" component={Auth} />
        </Switch>
    </>

const AppRouter = ({ isLoggedIn }) =>
  isLoggedIn ? <LoggedInRoutes /> : <LoggedOutRoutes />;

AppRouter.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired
};

export default AppRouter;