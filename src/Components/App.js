import React, { useEffect } from 'react';
// import { gql } from "apollo-boost";
import { gql, useQuery } from '@apollo/client';
import styled, { ThemeProvider } from "styled-components";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GlobalStyles from "../Styles/GlobalStyles";
import Theme from "../Styles/Theme";
import Routes from "./Routes";
import { HashRouter as Router } from "react-router-dom";
// import { useQuery } from 'react-apollo-hooks';
import Footer from "./Footer";
import Header from "./Header";
import { Link } from "react-router-dom";
import { ME } from '../SharedQueries';
const QUERY = gql`
  {
    isLoggedIn @client(always: true)
  }
`;

export const NEW_MESSAGES = gql`
  {
    seeMessages{
      id
    }
  }
`;

const Wrapper = styled.div`
  position: relative;
  margin: 0 auto;
  max-width: 935px;
  width: 100%;
  max-width: ${props => props.theme.maxWidth};
`;

const MessengerIcon = styled.span`
  position:fixed;
  right:5%;
  bottom:7%;
`;

const NewMessageCount = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  position:absolute;
  right:0;
  top:0;
  color:white;
  width:15px;
  height:15px;
  font-size:10px;
  border-radius:50%;
  background-color: #C95441;
`;

export default () => {
  const { data: { isLoggedIn } } = useQuery(QUERY);
  const { data: dataMe } = useQuery(ME);
  const { refetch, data, loading } = useQuery(NEW_MESSAGES, {
    fetchPolicy: 'network-only'
  });

  // useEffect(()=>{
  //     refetch();
  // },[data])


  return (
    <ThemeProvider theme={Theme}>
      <>
        <script src='https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/6.23.0/polyfill.min.js'></script>
        <GlobalStyles />
        <Router>
          <>
            {isLoggedIn && <Header />}
            <Wrapper>
              <Routes isLoggedIn={isLoggedIn} />
              <Footer />
              {isLoggedIn && <MessengerIcon>
                <Link style={{ position: 'relative' }} to={'/chat'}>
                  <img style={{ width: '50px', height: '50px' }} src={require('../assets/icon/messenger.png')}></img>
                  {loading ? <></>
                    : data.seeMessages.length === 0 ? <></>
                      : (
                        <NewMessageCount>
                          <span>
                            {data.seeMessages.length}
                          </span>
                        </NewMessageCount>
                      )
                  }

                </Link>
              </MessengerIcon>}

            </Wrapper>
          </>
        </Router>
        <ToastContainer position={toast.POSITION.BOTTOM_LEFT} />
      </>
    </ThemeProvider>
  )
}