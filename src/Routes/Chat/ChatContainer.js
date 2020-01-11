import React, { useEffect,useState } from "react";
import ChatPresenter from "./ChatPresenter";
import {useQuery, useMutation} from "react-apollo-hooks";
import {SEARCH,ROOMS_QUERY, CREATE_ROOM} from "./ChatQueries"
import useInput from "../../Hooks/useInput";




export default ({history})=>{
    const search = useInput("");
    const [shouldFetch,setShouldFetch] = useState(false);
    const{data,loading} = useQuery(ROOMS_QUERY);
    const {data:searchData, loading:searchLoading, refetch} = useQuery(SEARCH, {
        variables: {
            term:search.value
        },
        skip: !shouldFetch,
        fetchPolicy: "network-only"
    });
    const [createRoomMutaion] = useMutation(CREATE_ROOM);

    const handleCreateRoom =async (toId)=>{
        console.log(toId);

        try{
            const{
                data:{createRoom}
            }= await createRoomMutaion({
                variables:{
                    toId:toId.id
                }
            });
            console.log(createRoom);
            history.push(`/chat/${createRoom.id}`)

        }catch{

        }

        
    }

    const onChange = (e)=>{
        search.onChange(e);
        setShouldFetch(false);
    }

    const onSearchSubmit = (e) =>{
        e.preventDefault();
        setShouldFetch(true);
    }
    const onKeyPress = async event => {
        const { which } = event;
        if (which === 13) {
            event.preventDefault();
            try {
                setShouldFetch(true);
            } catch(e) {
                console.log(e);
            }finally{
                return
            }
        }else{
            return
        }
    };
    

    return(
            <ChatPresenter 
            loading={loading} 
            data={data} 
            history={history} 
            search={search}
            onSearchSubmit={onSearchSubmit} 
            onChange={onChange} 
            onKeyPress={onKeyPress}
            searchLoading={searchLoading}
            searchData={searchData}
            handleCreateRoom={handleCreateRoom}
            />
    ) 
}