import React, { useContext } from "react";

import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../../contexts/ChatContext";
import {ArrowBarLeft} from "react-bootstrap-icons";

const Chat = (onBack) => {
    const { data } = useContext(ChatContext);
    const handleBack = () => {
        onBack();
    }
    return (
        <div className="chat">
            <ArrowBarLeft onClick={() => handleBack}/>
            <Messages />
            <Input/>
        </div>
    );
};

export default Chat;