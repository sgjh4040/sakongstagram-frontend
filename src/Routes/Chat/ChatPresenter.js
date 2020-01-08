import React from "react";
import styled from "styled-components";

const ChatPresenter = ({data,loading}) => {
    if(loading){
        return <></>
    }else{
        return (
            data.seeRooms.map(room =><div>{room.id}</div>)
        )
    }


    return <div>채팅방</div>
}


export default ChatPresenter;