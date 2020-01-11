import React from 'react';
import { gql } from "apollo-boost";
import styled, { ThemeProvider } from "styled-components";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GlobalStyles from "../Styles/GlobalStyles";
import Theme from "../Styles/Theme";
import Routes from "./Routes";
import { HashRouter as Router } from "react-router-dom";
import { useQuery } from 'react-apollo-hooks';
import Footer from "./Footer";
import Header from "./Header";
import { Link } from "react-router-dom";
const QUERY = gql`
  {
    isLoggedIn @client(always: true)
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

export default () => {
  const { data:{isLoggedIn} } = useQuery(QUERY);


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
              <MessengerIcon>
              <Link to={'/chat'}>
                <img style={{width:'50px',height:'50px'}} src={require('../assets/icon/messenger.png')}></img>
                </Link>
              </MessengerIcon>
            </Wrapper>
          </>
        </Router>
        <ToastContainer position={toast.POSITION.BOTTOM_LEFT} />
      </>
    </ThemeProvider>
  )
}