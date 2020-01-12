import React, { useEffect,useState } from "react";
import ChatPresenter from "./ChatPresenter";
import {useQuery, useMutation} from "react-apollo-hooks";
import {SEARCH,ROOMS_QUERY, CREATE_ROOM, UPDATE_UNREAD} from "./ChatQueries"
import useInput from "../../Hooks/useInput";
import { NEW_MESSAGES } from "../../Components/App";




export default ({history})=>{
    const search = useInput("");
    const [shouldFetch,setShouldFetch] = useState(false);
    const{data,loading,refetch} = useQuery(ROOMS_QUERY);
    const {data:searchData, loading:searchLoading} = useQuery(SEARCH, {
        variables: {
            term:search.value
        },
        skip: !shouldFetch,
        fetchPolicy: "network-only"
    });
    const [updateReadYn] = useMutation(UPDATE_UNREAD);
    const [createRoomMutaion] = useMutation(CREATE_ROOM,{
        refetchQueries:() => [{
            query: ROOMS_QUERY,
            variables:{}
        }
    ]
    });
    const handleEnterRoom = async (id)=>{
        try{
            const {data} = await updateReadYn({
                refetchQueries:() => [{
                    query: ROOMS_QUERY,

                },
                {
                    query: NEW_MESSAGES
                }
            ],
                variables:{
                    roomId:id
                }
            });
            if(data.updateRead){
                history.push(`/chat/${id}`)
            }
        }catch{

        }
    }

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
    useEffect(()=>{
        refetch();
    },[])
    

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
            handleEnterRoom={handleEnterRoom}
            />
    ) 
}