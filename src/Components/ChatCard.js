import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Avatar from "./Avatar";
import { Link } from "react-router-dom";

const Card = styled.div`
    cursor: pointer;
    display:flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 5px;
    text-decoration: none;
    &:not(:last-child){
        border-bottom: 1px solid #E6E6E6;
        padding-bottom: 5px;
    }
`;
const EAvatar = styled(Avatar)`
`;
const Count = styled.div`
    display:flex;
    justify-content: center;
    align-items:center;
    width:15px;
    height:15px;
    border-radius: 50%;
    background-color: #ED6652;
    color: #FDF5F4;
    font-size:10px;
    margin-left: 5px;
`;

const ChatCard = ({
    me,
    participants,
    id,
    unReadCount,
    handleEnterRoom

}) => {
    participants = participants.filter(participant => participant.id != me.id);

    return (
        <Card onClick={() => handleEnterRoom(id)}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <EAvatar url={participants[0].avatar} size={"sm"} />
                <div style={{ marginLeft: '3px', color: 'black' }}>{participants[0].username}</div>
                {unReadCount===0 ?<></>
                :<Count><span>{unReadCount}</span></Count>
                }
            </div>
            <div>채팅하러 가기</div>
        </Card>
    )
}

ChatCard.propTypropes = {
    id: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired
};

export default ChatCard;
