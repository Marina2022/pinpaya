import React, {useContext, useEffect, useState} from 'react'
import Sidebar from '../../components/chat/Sitebar'
import Chat from '../../components/chat/Chat'
import '../../css/chat.css'
import {AuthContext} from "../../contexts/AuthContext";
import Chats from "./Chats";
import {ArrowBarLeft, ArrowLeftCircleFill} from "react-bootstrap-icons";
import Messages from "./Messages";
import Input from "./Input";
import {CloseButton} from "react-bootstrap";

const Home = ({handleChatClose}) => {
    const { currentUser } = useContext(AuthContext);
    const [show, setShow] = useState(false);
    const [showFirst, setShowFirst] = useState(true);
    const [mainUser, setMainUser] = useState(null);
    const onHandleSelect = (u) => {
        setShowFirst(false);
        setShow(true);
        setMainUser(u);
    }

    const handleBack = () => {
        setShow(false);
        setShowFirst(true);
    }

    return (
        <div className='home'>
            <div className="chatCloseBtn">
                <CloseButton style={{color: 'white'}} variant="white" onClick={handleChatClose}></CloseButton>
            </div>
            <div className="container" style={{paddingRight: 0}}>
                { currentUser &&
                    <>
                        { showFirst &&
                             <div className="sidebar shadow"> <Chats onHandleSelect={onHandleSelect} /> </div>
                        }
                        { show &&
                            <div className="chat">
                                <div style={{height:'100%'}}>
                                    <div className="chatClose"><ArrowLeftCircleFill color="#bbbbbb" size={35} onClick={handleBack}/></div>
                                    <Messages mainUser={mainUser} />
                                    <Input/>
                                </div>
                            </div>
                        }
                    </>
                }
            </div>
        </div>
    )
}

export default Home
