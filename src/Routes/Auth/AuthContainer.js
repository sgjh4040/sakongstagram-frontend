import React, { useState } from "react";
import AuthPresenter from "./AuthPresenter";
import useInput from "../../Hooks/useInput";
import { useMutation } from "react-apollo-hooks";
import { LOG_IN, CREATE_ACCOUNT, CONFIRM_SECRET, LOCAL_LOG_IN } from "./AuthQueries";
import { toast } from "react-toastify";


export default () => {
  const [action, setAction] = useState("logIn");
  const username = useInput("");
  const firstName = useInput("");
  const lastName = useInput("");
  const email = useInput("");
  const secret = useInput("");

  //login mutation
  const [requestSecretMutation] = useMutation(LOG_IN, {
    variables: { email: email.value }
  });

  //create mutation
  const [createAccountMutation] = useMutation(CREATE_ACCOUNT, {
    variables: {
      email: email.value,
      username: username.value,
      firstName: firstName.value,
      lastName: lastName.value
    }
  });

  //비밀키 확인 mutation
  const [confirmSecretMutation] = useMutation(CONFIRM_SECRET, {
    variables: {
      email: email.value,
      secret: secret.value
    }
  });

  //local 에 token 저장 mutation
  const [localLogInMutation] = useMutation(LOCAL_LOG_IN);

  const onSubmit = async e => {
    e.preventDefault();
    if (action === "logIn") {
      if (email !== "") {
        try {
          const {
            data: { requestSecret }
          } = await requestSecretMutation();
          if (!requestSecret) {
            toast.error("아직 계정이 없습니다. 회원가입하세요");
            setTimeout(() => setAction("signUp"), 3000);
          } else {
            toast.success("이메일에서 비밀키를 확인하세요");
            setAction("confirm");
          }
        } catch{
          toast.error("비밀키 요청이 실패하였습니다. 다시 시도하세요");

        }
      } else {
        toast.error('이메일을 입력하세요');
      }

    } else if (action === "signUp") {
      if (
        email.value !== "" &&
        username.value !== "" &&
        firstName.value !== "" &&
        lastName.value !== ""
      ) {
        try {
          const {
            data: { createAccount }
          } = await createAccountMutation();
          if (!createAccount) {
            toast.error("계정 생성을 할수 없습니다.");
          } else {
            toast.success("가입을 축하드립니다. 로그인하세요");
            setTimeout(() => setAction("logIn"), 3000);
          }
        } catch (e) {
          toast.error(e.message);
        }
      } else {
        toast.error("모두 입력하세요")
      }
    } else if (action === "confirm") {
      if (secret.value !== "") {
        try {
          console.log(secret.value);
          const {
            data: { confirmSecret: token }
          } = await confirmSecretMutation();
          if (token !== "" && token !== undefined) {
            localLogInMutation({ variables: { token } });
          } else {
            throw Error();
          }
        } catch {
          toast.error("Cant confirm secret,check again");
        }
      }
    }

  };

  return (
    <AuthPresenter senter
      setAction={setAction}
      action={action}
      username={username}
      firstName={firstName}
      lastName={lastName}
      email={email}
      onSubmit={onSubmit}
      secret={secret}
    />
  );
};



