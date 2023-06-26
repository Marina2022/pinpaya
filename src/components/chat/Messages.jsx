import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { ChatContext } from "../../contexts/ChatContext";
import { db } from "../../firebase";
import Message from "./Message";
import {Link} from "react-router-dom";
import {Spinner} from "react-bootstrap";
import {useTranslation} from "react-i18next";

const Messages = ({mainUser}) => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [count, setCount] = useState(30);
    const { data } = useContext(ChatContext);
    const { user } = useContext(ChatContext);
    const {t, i18n} = useTranslation();
    const handleScroll = (event) => {
        const target = event.target;
        if(target.scrollTop === 0){
            setLoading(true);
           setTimeout(()=>{
               setCount(count + 30);
               setLoading(false);
           }, 2000)
        }
    }

    useEffect(() => {
        const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
            doc.exists() && setMessages(doc.data().messages);

        });

        return () => {
            unSub();
        };
    }, [data.chatId]);

    return (
        <div className="messages" onScroll={handleScroll}>
            <div className="d-flex align-items-center" style={{margin: '18px 0'}} >
                { mainUser.isTutor == true ? (
                    <Link  to={'/tutor/'+ mainUser.aid} style={{display:'flex', alignItems:'center'}}>
                        <img className="chatMainImg" src={mainUser.photoURL} alt="" />
                        <div style={{marginLeft: '10px'}} className="fw-bold">{mainUser?.displayName}</div>
                    </Link>
                ) : (
                   <>
                       <img className="chatMainImg" src={mainUser.photoURL} alt="" />
                       <div style={{marginLeft: '10px'}} className="fw-bold">{mainUser?.displayName}</div>
                   </>
                )}

                {
                    loading &&
                    <div style={{display:'flex', justifyContent: 'center'}}>
                        <Spinner animation="border" role="status" style={{width:'20px',height:'20px', marginLeft: '10px'}}>
                            <span className="visually-hidden">{t('loading')}...</span>
                        </Spinner>
                    </div>
                }
            </div>
                {messages.length > 0 && Object.entries(messages).map(([index,m])=> (
                    index > (messages.length - count) &&
                    <Message message={m} key={m.id} />
                ))}
            {data.chatId == 'null' &&
            <h4 className="text-center mt-4 text-secondary">{t('select_conversation')}</h4>
            }
            {data.chatId != 'null' && messages.length == 0 &&
                <h4 className="text-center mt-4 text-secondary">{t('be_first')}</h4>
            }
        </div>
    );
};

export default Messages;