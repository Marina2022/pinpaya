import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { ChatContext } from "../../contexts/ChatContext";
import {File, Folder2Open, Trash2} from "react-bootstrap-icons";

const Message = ({ message }) => {
    const { currentUser } = useContext(AuthContext);
    const { data } = useContext(ChatContext);
    var parse = require('html-react-parser');
    const ref = useRef();

    useEffect(() => {
        ref.current?.scrollIntoView({ behavior: "smooth" });
    }, [message]);

    return (
        <div
            ref={ref}
            className={`message ${message.senderId === currentUser.uid && "owner"}`}
        >
            {/*<div className="messageInfo">*/}
            {/*    <img*/}
            {/*        src={*/}
            {/*            message.senderId === currentUser.uid*/}
            {/*                ? currentUser.photoURL*/}
            {/*                : data.user.photoURL*/}
            {/*        }*/}
            {/*    />*/}
            {/*</div>*/}
            <div className={`messageContent ${message.notif == true ? 'isNotif' : ''}`}>
                {message.text != '' &&
                    <p>{parse(message.text)}</p>
                }
                {message.img &&
                    <p>
                        {message.type?.split('/')[0] == 'image' ?
                            (
                                <a target="_blank" href={message.img}>
                                    <img className="messageImgAlt" src={message.img} alt={message.filename} />
                                </a>
                            ) : (
                                <a target="_blank" href={message.img}>
                                    <Folder2Open color="#ddddf7" size={15} />  {message.filename}
                                </a>
                            )
                        }
                    </p>
                }
            </div>
        </div>
    );
};

export default Message;