import React, { useEffect, useState } from "react";
import withRouter from "react-router-dom/withRouter";
import {useQuery, useMutation, useSubscription} from "react-apollo-hooks";
import ChatRoomPresenter from "./ChatRoomPresenter";
import {SEE_ROOM,SEND_MESSAGE, NEW_MESSAGE} from "../Chat/ChatQueries"
import ChatRoomPresnter from "./ChatRoomPresenter";
import withSuspense from "../../Components/withSuspense";

const chat= withRouter(({ match: { params: { id:roomId } } })=>{
    console.log("roomid",roomId);
    const {
        data: {
            seeRoom: {
                messages:oldMessages
            }
        }, refetch, loading
    } = useQuery(SEE_ROOM, {
        variables: {
            id: roomId
        },
        suspend: true
    });
    const { data } = useSubscription(NEW_MESSAGE, {
        variables: {
            roomId: roomId
        }
    });
    const [messages, setMessages] = useState(oldMessages || []);
    
    const handleNewMessage = () => {
        if (data !== undefined) {
          const { newMessage } = data;
          setMessages(previous => [...previous, newMessage]);
        }
      };
      useEffect(() => {
        handleNewMessage();
      }, [data]);

    return <ChatRoomPresnter messages={messages}/>
});

export default withSuspense(chat);