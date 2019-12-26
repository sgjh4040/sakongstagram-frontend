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
const QUERY = gql`
  {
    isLoggedIn @client
  }
`;
const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 935px;
  width: 100%;
  max-width: ${props => props.theme.maxWidth};
`;

export default () => {
  const { data: { isLoggedIn } } = useQuery(QUERY);

  return (
    <ThemeProvider theme={Theme}>
      <>
        <GlobalStyles />
        <Router>
          <>
          {isLoggedIn && <Header />}
            <Wrapper>
              <Routes isLoggedIn={isLoggedIn} />
              <Footer />
            </Wrapper>
          </>
        </Router>
        <ToastContainer position={toast.POSITION.BOTTOM_LEFT} />
      </>
    </ThemeProvider>
  )
}