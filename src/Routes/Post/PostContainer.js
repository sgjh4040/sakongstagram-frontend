import React from "react";
import { gql } from "apollo-boost";
import PostPresenter from "./PostPresenter"
import {SEE_FULL_POST}  from "../../Components/Post/PostQueries"
import { useQuery } from "react-apollo-hooks";
import withRouter from "react-router-dom/withRouter";

export default withRouter(({ match: { params: { id } } }) => {
    console.log(id);
    const { data, loading } = useQuery(SEE_FULL_POST, { variables: { id } });
    
    return <PostPresenter loading={loading} data={data} />;
});
