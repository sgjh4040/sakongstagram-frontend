import React, { useState } from "react";
import styled from "styled-components";
import { Link, withRouter } from "react-router-dom";
import Input from "./Input";
import useInput from "../Hooks/useInput";
import { Compass, HeartEmpty, User, Logo, Plus } from "./Icons";
import { useQuery } from "react-apollo-hooks";
import { ME } from "../SharedQueries"
import Avatar from "./Avatar";
import { NOTI_QUERY } from "./Query";
import * as Scroll from 'react-scroll';
import { Element, animateScroll as scroll, } from 'react-scroll';




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
  padding: 25px 0px;
  z-index: 2;
`;

const HeaderWrapper = styled.div`
  width: 100%;
  max-width: ${props => props.theme.maxWidth};
  display: flex;
  justify-content: center;
`;

const HeaderColumn = styled.div`
  width: 33%;
  text-align: center;
  &:first-child {
    margin-right: auto;
    text-align: left;
  }
  &:last-child {
    margin-left: auto;
    text-align: right;
  }
`;

const SearchInput = styled(Input)`
  background-color: ${props => props.theme.bgColor};
  padding: 5px;
  font-size: 14px;
  border-radius: 3px;
  height: auto;
  text-align: center;
  width: 70%;
  &::placeholder {
    opacity: 0.8;
    font-weight: 200;
  }
`;

const HeaderLink = styled(Link)`
  &:not(:last-child) {
    margin-right: 30px;
  }
`;
const HeaderIcon = styled.span`
    margin-right: 30px;
    position:relative;
`;

const NotificationContainer = styled.div`
    right:0;
    top:15px;
    position:absolute;
    width:400px;
    border:1px solid #E6E6E6;
    text-align: left;
    word-wrap: break-word;
    background-color:#FFFFFF;
`;
const NotificationBox = styled.div`
    padding: 15px;
    border-bottom: 1px solid #EFEFEF;
    align-items: center;
    display: flex;
`;
const Message = styled.div`
    margin-left:10px;
    font-size: 15px;
    flex: 8;
    margin-left:10px;
`;

export default withRouter(({ history }) => {
  const search = useInput("");
  const [isNotification, setIsNotification] = useState(false);
  const { data } = useQuery(ME);
  const { data: notiData } = useQuery(NOTI_QUERY);
  console.log(notiData);


  const toggleNotification = () => {
    console.log("Noti click");
    if (isNotification) {
      setIsNotification(false);
    } else {
      setIsNotification(true);
    }
  }

  const onSearchSubmit = e => {
    e.preventDefault();
    console.log('search.value', search.value);
    history.push(`/search?term=${search.value}`);
  };
  return (
    <Header>
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
          <HeaderIcon onClick={toggleNotification} >
            <HeartEmpty />
            {isNotification && (
              <NotificationContainer>
                <Element style={{ overflow: 'scroll', height: "480px" }}>
                  {notiData && notiData.seeNotification.map(notification => (
                    <NotificationBox key={notification.id}>
                      <Avatar size="sm" url={notification.from.avatar} />
                      <Message>
                        {notification.message}
                      </Message>
                    </NotificationBox>
                  ))}
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
              <HeaderLink to="upload">
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