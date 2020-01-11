import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Loader from "../../Components/Loader"
import Input from "../../Components/Input";

const Wrapper = styled.div`
  display: block;
  
  min-height: 80vh;
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
  @media (min-width: 576px){
    width: 70%;
  }
`;


const ChatPresenter = (
    {   data,
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
                <form onSubmit={onSearchSubmit}>
                    <SearchInput
                        value={search.value}
                        onChange={onChange}
                        onKeyPress={onKeyPress}
                        placeholder="Search" />
                </form>

                {searchLoading ? <Loader/>:(
                    searchData&&searchData.searchUser.length ===0 ? <div>검색 결과 없음</div>
                    :(
                        searchData ? (searchData.searchUser.map(user => <div onClick={()=>handleCreateRoom(user)}>{user.username}</div>))
                        :<></>
                    )
                )}



                {data.seeRooms.map(room => {
                    return (
                        <Link to={`/chat/${room.id}`} >
                            <div>
                                {room.id}
                            </div>
                        </Link>
                    )
                })}

            </Wrapper>

        )
    }
}


export default ChatPresenter;