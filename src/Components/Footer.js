import React from "react";
import styled from "styled-components";

const Footer = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-transform: uppercase;
  font-weight: 600;
  font-size: 12px;
  margin-top:200px;
`;

const List = styled.div`
  display: flex;
  flex-wrap: wrap;
  width:100%;
`;

const ListItem = styled.div`
  flex: 0 0 50%;
  @media (min-width: 576px){
    flex: 0 0 33.33%;
  }
  @media (min-width: 768px){
    flex: 0 0 8%;
  }
`;

const Link = styled.a`
  color: ${props => props.theme.darkBlueColor};
`;

const Copyright = styled.span`
  color: ${props => props.theme.darkGreyColor};
`;

export default () => (
  <Footer>
    <List>
      <ListItem>
        <Link href="#">SAKONGSTAGRAM 정보</Link>
      </ListItem>
      <ListItem>
        <Link href="#">지원</Link>
      </ListItem>
      <ListItem>
        <Link href="#">홍보센터</Link>
      </ListItem>
      <ListItem>
        <Link href="#">API</Link>
      </ListItem>
      <ListItem>
        <Link href="#">채용정보</Link>
      </ListItem>
      <ListItem>
        <Link href="#">개인정보처리방침</Link>
      </ListItem>
      <ListItem>
        <Link href="#">약관</Link>
      </ListItem>
      <ListItem>
        <Link href="#">디렉터리</Link>
      </ListItem>
      <ListItem>
        <Link href="#">프로필</Link>
      </ListItem>
      <ListItem>
        <Link href="#">해시태그</Link>
      </ListItem>
      <ListItem>
        <Link href="#">언어</Link>
      </ListItem>
    </List>
    <Copyright>Sakongstagram {new Date().getFullYear()} &copy;</Copyright>
  </Footer>
);