import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Loader from "../../Components/Loader"
import Input from "../../Components/Input";
import { Element } from 'react-scroll';
import ChatCard from "../../Components/ChatCard";

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
`
const ScrollBox = styled(Element)`
    overflow:scroll;
    height: 400px;

`;


const SearchInput = styled(Input)`
  background-color: ${props => props.theme.bgColor};
  padding: 5px;
  font-size: 14px;
  border-radius: 3px;
  height: auto;
  text-align: center;
  width: 100%;
  &::placeholder {
    opacity: 0.8;
    font-weight: 200;
  }
`;


const ChatPresenter = (
    { data,
        loading,
        history,
        search,
        onSearchSubmit,
        onChange,
        onKeyPress,
        searchLoading,
        searchData,
        handleCreateRoom
    }) => {
    if (loading) {
        return <Wrapper>
            <Loader />
        </Wrapper>
    } else if (!loading) {
        return (
            <Wrapper>
                <ChatBox>
                <form onSubmit={onSearchSubmit}>
                    <SearchInput
                        value={search.value}
                        onChange={onChange}
                        onKeyPress={onKeyPress}
                        placeholder="채팅할 유저 검색하세요" />
                </form>
                {searchLoading ? <Loader /> : (
                    searchData && searchData.searchUser.length === 0 ? <div>검색 결과 없음</div>
                        : (
                            searchData ? (searchData.searchUser.map(user => <div onClick={() => handleCreateRoom(user)}>{user.username}</div>))
                                : <></>
                        )
                )}


                <ScrollBox>
                    {data.seeRooms.map(room => {
                        return (
                            <ChatCard me={data.me} id={room.id} participants={room.participants}/>
                        )
                    })}
                </ScrollBox>
                </ChatBox>
            </Wrapper>

        )
    }
}


export default ChatPresenter;