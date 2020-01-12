import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import Loader from "../../Components/Loader";
import { Element } from 'react-scroll';
import Avater from '../../Components/Avatar';
import TextareaAutosize from "react-autosize-textarea";
import { css } from "@emotion/core";
import { SyncLoader } from "react-spinners";
import * as moment from "../../Util";

const Wrapper = styled.div`
  min-height: 80vh;
  display: flex;
  padding: 5px;
  align-items: center;
  flex-direction: column;
  
`;
const ChatBox = styled.div`
 width: 350px;
 border: 1px solid #E6E6E6;
 padding: 5px;
 background-color: #BCD1DC;
`;
const ScrollBox = styled.div`
    overflow:scroll;
    height: 400px;

`;
const MessageContainer = styled.div`
    display:flex;
    flex-direction: row;
    margin-bottom: 5px;
`;
const ColumBox = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 10px;
`;
const UserName = styled.div`
    color: #4B5457;
    font-size:12px;
    margin-top:3px;
    margin-bottom:5px;
`;
const MessageBubble = styled.div`
    background-color: ${props => props.bg};
    box-shadow:  0 5px 15px rgba(0, 0, 0, 0.15);
    padding: 7px 5px;
    border-radius: 5px;
    font-size:12px;
    max-width: 200px;
`;
const Date = styled.div`
    align-self:flex-end;
    color: #4B5457;
    font-size: 12px;
`;

const InputBox = styled.div`
 width: 350px;
 border: 1px solid #E6E6E6;
 padding: 5px;
 background-color: #FFFFFF;
 display:flex;
 flex-direction: row;
 height: 63px;
`;
const Textarea = styled(TextareaAutosize)`
  border: none;
  width: 70%;
  resize: none;
  font-size: 14px;
  &:focus {
    outline: none;
  }
`;
const SendButton = styled.button`
    display:block;
    width:30%;
    background-color: #FEE600;
    padding:0;
    margin:0;
    border:none;
`;
const override = css`
display: block;
margin: 0 auto;
`;

const ChatRoomPresenter = ({
    loading,
    sendLoading,
    data,
    newMessage,
    message,
    chatBox,
    onKeyPress,
    onChange,
    onSubmit }) => {
    const test = useRef(null);




    if (loading) {
        return <Loader />
    } else if (!loading && data.seeRoom) {

        const me = data.me.id;

        return (
            <Wrapper>
                <ChatBox>
                    <ScrollBox >
                        <div ref={chatBox} key={data.seeRoom.id}>
                            {data.seeRoom.messages.length === 0 ? <div></div>
                                : (
                                    data.seeRoom.messages.map(message =>
                                        (message.from.id != me) ? (
                                            <MessageContainer key={message.id}>
                                                <Avater url={message.from.avatar} size={"sm"} />
                                                <ColumBox>
                                                    <UserName>
                                                        {message.from.username}
                                                    </UserName>
                                                    <MessageBubble bg={'#FFFFFF'}>
                                                        {message.text}
                                                    </MessageBubble>
                                                </ColumBox>
                                                <Date>
                                                    {moment.getFormattedRegDate(message.createdAt)}
                                                </Date>
                                                
                                                
                                            </MessageContainer>
                                        )
                                            : (
                                                <MessageContainer key={message.id} style={{ justifyContent: 'flex-end' }}>
                                                    <ColumBox style={{justifyContent:'flex-end'}}>
                                                {message.readYn ? <></>
                                                :<div style={{color:"#FCEF63", fontSize:"10px", marginBottom:"2px"}}>1</div>}
                                                <Date style={{ marginRight: '3px' }}>
                                                        {moment.getFormattedRegDate(message.createdAt)}
                                                    </Date>
                                                </ColumBox>
                                                    <MessageBubble bg={'#FFE404'}>
                                                        {message.text}
                                                    </MessageBubble>
                                                </MessageContainer>
                                            )
                                    )
                                )}
                            {newMessage.map(message =>
                                (message.from.id != me) ? (
                                    <MessageContainer key={message.id}>
                                        <Avater url={message.from.avatar} size={"sm"} />
                                        <ColumBox>
                                            <UserName>
                                                {message.from.username}
                                            </UserName>
                                            <MessageBubble bg={'#FFFFFF'}>
                                                {message.text}
                                            </MessageBubble>
                                        </ColumBox>
                                        <Date>
                                            {moment.getFormattedRegDate(message.createdAt)}
                                        </Date>
                                    </MessageContainer>
                                )
                                    : (
                                        <MessageContainer key={message.id} style={{ justifyContent: 'flex-end' }}>
                                            <Date style={{ marginRight: '3px' }}>
                                                {moment.getFormattedRegDate(message.createdAt)}
                                            </Date>
                                            <MessageBubble bg={'#FFE404'}>
                                                {message.text}
                                            </MessageBubble>
                                        </MessageContainer>
                                    )
                            )}
                        </div>
                    </ScrollBox>
                </ChatBox>
                <InputBox>
                    <Textarea maxRows={3} value={message} onChange={onChange}></Textarea>
                    <SendButton disabled={sendLoading} onClick={onSubmit}>
                        {sendLoading ? <SyncLoader
                            css={override}
                            size={5}
                            margin={1}
                            color={"#FFFFFF"}
                        />: <span>전송</span>}
                    </SendButton>
                </InputBox>


            </Wrapper>
        )
    }


}

export default ChatRoomPresenter;