import React from "react";
import styled from "styled-components";

const ChatRoomPresnter = ({messages}) =>{

    return (
        messages.map(message => <div>{message.text}</div>)
    )
}

export default ChatRoomPresnter;