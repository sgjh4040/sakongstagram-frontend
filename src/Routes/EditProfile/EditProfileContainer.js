import React, { useEffect } from "react";
import useInput from "../../Hooks/useInput";
import EditProfilePresenter from "./EditProfilePresenter";


export default ({ me }) => {
    const username = useInput("");
    const firstName = useInput("");
    const lastName = useInput("");
    const email = useInput("");
    const secret = useInput("");



    return <EditProfilePresenter
        username={username}
        firstName={firstName}
        lastName={lastName}
        email={email}

    />



}