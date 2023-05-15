import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { ChatContext } from "../../contexts/ChatContext";
import { db } from "../../firebase";
import Message from "./Message";
import {Link} from "react-router-dom";

const Messages = ({mainUser}) => {
    const [messages, setMessages] = useState([]);
    const { data } = useContext(ChatContext);
    const { user } = useContext(ChatContext);

    useEffect(() => {
        const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
            doc.exists() && setMessages(doc.data().messages);
            console.log(doc.data().messages);

        });

        return () => {
            unSub();
        };
    }, [data.chatId]);

    return (
        <div className="messages">
            <div className="d-flex align-items-center" style={{margin: '18px 0'}}>
                { mainUser.isTutor == true ? (
                    <Link  to={'/tutor/'+ mainUser.aid} >
                        <img className="chatMainImg" src={mainUser.photoURL} alt="" />
                    </Link>
                ) : (
                    <img className="chatMainImg" src={mainUser.photoURL} alt="" />
                )}
                <div style={{marginLeft: '10px'}} className="fw-bold">{mainUser?.displayName}</div>
            </div>
            {messages.map((m) => (
                <Message message={m} key={m.id} />
            ))}
            {data.chatId == 'null' &&
            <h4 className="text-center mt-4 text-secondary">Please select conversation</h4>
            }
            {data.chatId != 'null' && messages.length == 0 &&
                <h4 className="text-center mt-4 text-secondary">Be first, write your first message</h4>
            }
        </div>
    );
};

export default Messages;