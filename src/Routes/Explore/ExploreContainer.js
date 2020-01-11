import React, {useEffect} from "react";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";
import ExplorePresenter from "./ExplorePresenter";

const RANDOM_QUERY = gql`
    query random($size: String!){
        randomPosts(size: $size){
            id
            files{
                url
            }
            likeCount
            commentCount
        }
        randomUsers(size: $size){
            id
            avatar
            username
            isFollowing
            isSelf
        }
    }


`;

export default ()=> {
    const {loading,data,refetch} = useQuery(RANDOM_QUERY,{variables: {size:"10"}});

    useEffect(()=>{
        refetch();
    },[])
    return <ExplorePresenter loading={loading} data={data}/>
}