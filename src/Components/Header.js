import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, withRouter } from "react-router-dom";
import Input from "./Input";
import useInput from "../Hooks/useInput";
import { Compass, HeartEmpty, User, Logo, Plus } from "./Icons";
import { useQuery, useMutation } from "react-apollo-hooks";
import { ME } from "../SharedQueries"
import Avatar from "./Avatar";
import { NOTI_QUERY, DELETE_NOTIFICATION } from "./Query";
import * as Scroll from 'react-scroll';
import { Element, animateScroll as scroll, } from 'react-scroll';
import {Close} from "./Icons"



const Header = styled.header`
  width: 100%;
  border: 0;
  position: fixed;
  top: 0;
  left: 0;
  background-color: white;
  border-bottom: ${props => props.theme.boxBorder};
  border-radius: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 25px 10px;
  z-index: 2;
`;

const HeaderWrapper = styled.div`
  width: 100%;
  max-width: ${props => props.theme.maxWidth};
  display: flex;
  justify-content: center;
`;

const HeaderColumn = styled.div`
  width: 53%;
  text-align: center;
  &:first-child {
    width:10%;
    margin-right: auto;
    text-align: left;
  }
  &:last-child {
    width: 40%;
    margin-left: auto;
    text-align: right;
  }
  @media (min-width: 576px){
    width:33%;
    &:first-child {
    width:33%;
  }
  &:last-child {
    width: 33%;
  }
  }
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

const HeaderLink = styled(Link)`
  &:not(:last-child) {
    margin-right: 10px;
    @media (min-width: 576px){
      margin-right: 30px;
  }
  }
`;
const HeaderIcon = styled.span`
    margin-right: 10px;
    @media (min-width: 576px){
      margin-right: 30px;
  }
    position:relative;
`;

const NotificationContainer = styled.div`
    right:0;
    top:22px;
    position: absolute;
    width:300px;
    border: 2px solid #E6E6E6;
    text-align: left;
    word-wrap: break-word;
    background: #FFFFFF;
    cursor: pointer;
    &::after, &::before{
      bottom: 100%;
      right:0;
      border: solid transparent;
      content: " ";
      height: 0;
      width: 0;
      position: absolute;
      pointer-events: none;
    }
    &::after {
	border-color: rgba(255, 255, 255, 0);
	border-bottom-color: #FFFFFF;
	border-width: 10px;
	margin-left: -10px;
}
&::before {
	border-color: rgba(230, 230, 230, 0);
	border-bottom-color: #E6E6E6;
	border-width: 11px;
	margin-left: -11px;
}
@media (min-width: 576px){
    width:400px;
  }
`;
const NotificationBox = styled.div`
    padding: 15px;
    border-bottom: 1px solid #EFEFEF;
    align-items: center;
    display: flex;
`;
const Message = styled.div`
    margin-left:10px;
    font-size: 10px;
    flex: 8;
    margin-left:10px;
    @media (min-width: 576px){
      font-size: 15px;
  }
`;
const NotiMessage = styled.div`
    font-size : 10px;
    text-align: center;
    margin-top: 20px;
    @media (min-width: 576px){
      font-size: 15px;
      margin-top: 40px;
  }
`;

const EditBox = styled.div`
  position: fixed;
  width: 300px;
  height: 300px;
  right:50px;
  top:100px;
  border: 1px solid #e6e6e6;
  padding: 30px;
  background-color: white;
`;
const CloseIcon = styled.span`
    position: absolute;
    cursor: pointer;
    right:0;
    top:0;
    fill:black;
`;
export default withRouter(({ history }) => {
  const search = useInput("");
  const [isNotification, setIsNotification] = useState(false);
  const [isEditModal, setIsEditModal] = useState(true);
  const { data } = useQuery(ME);
  const { data: notiData, refetch } = useQuery(NOTI_QUERY);
  const [deleteNotification] = useMutation(DELETE_NOTIFICATION, {
    refetchQueries: () => [{
      query: NOTI_QUERY
    }]
  });

  const handleNotification = async (notification) => {
    console.log("click")
    console.log(notification);
    history.push(`/post/${notification.post.id}`)
    try {
      await deleteNotification({ variables: { id: notification.id } });


    } catch (e) {
      console.log(e);
    }
  }


  const toggleNotification = () => {
    console.log("Noti click");
    if (isNotification) {
      setIsNotification(false);
    } else {
      setIsNotification(true);
    }
  }
  const toggleEditModal = () => {
    if (isEditModal) {
      setIsEditModal(false);
    } else {
      setIsEditModal(true);
    }
  }
  const hideNoticication = () => {
    setIsNotification(false);
  }

  const onSearchSubmit = e => {
    e.preventDefault();
    console.log('search.value', search.value);
    history.push(`/search?term=${search.value}`);
  };
  useEffect(() => {
    refetch();
    window.addEventListener("click", e => {
      console.log(e.target.id);
      if (e.target.id != 'noti') {
        hideNoticication();

      }
    });
    return window.removeEventListener("click", e => {
      if (e.target.id != 'noti') {
        hideNoticication();
      }
    })
  }, [])
  return (
    <Header>
      {isEditModal ? <EditBox>
        <CloseIcon onClick={toggleEditModal}>
          <Close/>
        </CloseIcon>
        <div>
          수정사항:  포스트 디테일박스 css 수정, 채팅기능을 위한 client 수정(apollo-boost to apollo client)
          
        </div>
        <div>
        추가할 기능: 채팅 기능 추가할 예정
        </div>
       
      </EditBox>: <></>}
      <HeaderWrapper>
        <HeaderColumn>
          <Link to="/">
            <Logo />
          </Link>
        </HeaderColumn>
        <HeaderColumn>
          <form onSubmit={onSearchSubmit}>
            <SearchInput
              value={search.value}
              onChange={search.onChange}
              placeholder="Search" />
          </form>
        </HeaderColumn>
        <HeaderColumn>
          <HeaderLink to="/explore">
            <Compass />
          </HeaderLink>
          <HeaderIcon id="icon" onClick={toggleNotification} >
            <HeartEmpty />
            {isNotification && (
              <NotificationContainer>
                <Element style={{ overflow: 'scroll', height: "480px" }}>
                  {notiData && notiData.seeNotification &&notiData.seeNotification.length===0 ?(
                    <NotiMessage>
                      알림 내용이 없습니다.
                    </NotiMessage>
                  )
                  :(
                    notiData.seeNotification.map(notification => (
                      <NotificationBox onClick={() => handleNotification(notification)} key={notification.id}>
                        <Avatar size="sm" url={notification.from.avatar} />
                        <Message>
                          {notification.message}
                        </Message>
                      </NotificationBox>
                    ))
                  )}
                </Element>
              </NotificationContainer>

            )}
          </HeaderIcon>



          {!(data && data.me) ? (
            <HeaderLink to="/#">
              <User />
            </HeaderLink>
          ) : (
              <>
                <HeaderLink to="/upload">
                  <Plus />
                </HeaderLink>
                <HeaderLink to={data.me.id}>
                  <User />
                </HeaderLink>
              </>
            )}
        </HeaderColumn>
      </HeaderWrapper>
    </Header>

  );
});