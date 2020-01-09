import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";


const ChatPresenter = ({ data, loading }) => {
    if (loading) {
        return <></>
    } else if(!loading) {
        return (
            data.seeRooms.map(room => {

                return (
                    <Link to={`/chat/${room.id}`} >
                        <div>
                            {room.id}
                        </div>
                    </Link>
                )
            })
        )
    }
}


export default ChatPresenter;