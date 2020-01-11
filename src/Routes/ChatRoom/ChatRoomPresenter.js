import React from "react";
import styled from "styled-components";
import Loader from "../../Components/Loader";

const ChatRoomPresenter = ({ loading, data, newMessage,message, onKeyPress, onChange, onSubmit }) => {

    if (loading) {
        return <Loader />
    } else if (!loading && data.seeRoom) {
        if (data.seeRoom.messages.length === 0) {
            return <div>데이터 없음</div>
        } else {
            return (
                <div>
                    <div key={data.seeRoom.id}>
                        {data.seeRoom.messages.map(message => (
                            <div key={message.id}>{message.text}</div>
                        ))}
                        {newMessage.map(message => <div>{message.text}</div>)}
                    </div>
                    <input value={message} onChange={onChange}></input>
                    <button disabled={loading} onClick={onSubmit}>보내기</button>
                </div>
            )
        }
    }


}

export default ChatRoomPresenter;