import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { ClipLoader } from "react-spinners";
import { css } from "@emotion/core";

const Container = styled.button`
  width: 100%;
  border: 0;
  border-radius: ${props => props.theme.borderRadius};
  color: white;
  font-weight: 600;
  background-color: ${props => props.theme.blueColor};
  text-align: center;
  padding: 7px 0px;
  font-size: 14px;
  cursor: pointer;
`;
const Text = styled.span`
`;

const override = css`
display: block;
margin: 0 auto;
`;

const Button = ({ text, onClick, loading = false }) => (
  <Container disabled={loading} onClick={onClick}>
    {loading ? <ClipLoader
      css={override}
      size={20}
      color={"#FFFFFF"}
    /> : <Text>{text}</Text>}
  </Container>
);


Button.propTypes = {
  text: PropTypes.string.isRequired
};

export default Button;