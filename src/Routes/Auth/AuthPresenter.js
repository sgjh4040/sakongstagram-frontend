import React from "react";
import styled from "styled-components";
import Input from "../../Components/Input";
import Button from "../../Components/Button";
import Helmet from "react-helmet";
import logo from "../../assets/icon/logo.png"

const Wrapper = styled.div`
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Box = styled.div`
  ${props => props.theme.whiteBox}
  border-radius:0px;
  width: 100%;
  max-width: 350px;
`;

const StateChanger = styled(Box)`
  text-align: center;
  padding: 20px 0px;
`;

const Link = styled.span`
  color: ${props => props.theme.blueColor};
  cursor: pointer;
`;

const Form = styled(Box)`
  padding: 40px;
  padding-bottom: 30px;
  margin-bottom: 15px;
  form {
    width: 100%;
    input {
      width: 100%;
      &:not(:last-child) {
        margin-bottom: 7px;
      }
    }
    button {
      margin-top: 10px;
    }
  }
`;
const Logo = styled.div`
        text-align: center;
        margin-bottom: 15px;
        img{
          width: 250px;
        }
`;

export default ({
  action,
  username,
  firstName,
  lastName,
  email,
  setAction,
  onSubmit,
  secret,
  loading
}) => (
  <Wrapper>
    <Form>
      {action === "logIn" && (
        <>
        <Helmet>
          <title>로그인 | SakongStagram</title>
        </Helmet>
        <Logo>
        <img src={logo}/>
        </Logo>
        <form onSubmit={onSubmit}>
          <Input placeholder={"Email"} {...email} type="email" />
          <Button loading={loading} text={"로그인"} />
        </form>
      </>
        
      )}
      {action === "signUp" && (
        <>
        <Helmet>
          <title>회원가입 | SakongStagram</title>
        </Helmet>
        <form onSubmit={onSubmit}>
          <Input placeholder={"First name"} {...firstName} />
          <Input placeholder={"Last name"} {...lastName} />
          <Input placeholder={"Email"} {...email} type="email" />
          <Input placeholder={"닉네임"} {...username} />
          <Button loading={loading} text={"회원가입"} />
        </form>
      </>
      )}
      {action === "confirm" && (
        <>
        <Helmet>
          <title>비밀키 확인 | SakongStagram</title>
        </Helmet>
        <form onSubmit={onSubmit}>
          <Input placeholder="메일로 발송된 문자를 입력하세요" required {...secret} />
          <Button loading={loading} text={"확인"} />
        </form>
      </>
      )}
    </Form>
    <StateChanger>
      {action === "logIn" ? (
        <>
          계정이 없으신가요?{" "}
          <Link onClick={() => setAction("signUp")}>Sign up</Link>
        </>
      ) : (
        <>
          계정이 이미 있으신가요?{" "}
          <Link onClick={() => setAction("logIn")}>Log in</Link>
        </>
      )}
    </StateChanger>
  </Wrapper>
);