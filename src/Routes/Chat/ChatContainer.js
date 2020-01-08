import React, { useEffect } from "react";
import ChatPresenter from "./ChatPresenter";
import {useQuery} from "react-apollo-hooks";
import {SEARCH,ROOMS_QUERY} from "./ChatQueries"




export default ()=>{

    const{data,loading} = useQuery(ROOMS_QUERY);

    return <ChatPresenter loading={loading} data={data}/>
}