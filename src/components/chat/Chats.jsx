import {
    doc,
    onSnapshot,
    deleteDoc,
    deleteField,
    updateDoc,
    arrayUnion,
    Timestamp,
    query,
    collection, where, getDocs
} from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { ChatContext } from "../../contexts/ChatContext";
import { db } from "../../firebase";
import {Link, useNavigate} from "react-router-dom";
import {Trash, Trash2} from "react-bootstrap-icons";
import {v4 as uuid} from "uuid";
import AxiosClient from "../../axios-client";


const Chats = ({onHandleSelect}) => {
    const [chats, setChats] = useState([]);
    const [chatId, setChatId] = useState([]);

    const { currentUser } = useContext(AuthContext);
    const { dispatch } = useContext(ChatContext);
    const navigate = useNavigate();
    var parse = require('html-react-parser');
    useEffect(() => {
        const getChats = () => {
            const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
                setChats(doc.data());
                setChatId(Object.keys(doc.data())[0]);
            });

            return () => {
                unsub();
            };
        };

        currentUser.uid && getChats();
    }, [currentUser.uid]);

    const handleSelect = async (u,z) => {

        // const q = query(
        //     collection(db, "chats"),
        //     where("id", "==", chatId)
        // );
        //
        // const querySnapshot = await getDocs(q);
        // querySnapshot.forEach((doc) => {
        //     console.log(doc.data(),'iya');
        // });


        // chats.filter((item) => (
        //      item.read = true
        // ))
        // await updateDoc(doc(db, "chats", chatId), {
        //     messages: chats
        // });

        // await updateDoc(doc(db, "chats", 'vqyGjJLwhVMLPLHslfu3fvv3Czp1gwfmCc57JnMGFNreiDFUnKGo4NL2'), {
        //     read: true
        // });
        dispatch({ type: "CHANGE_USER", payload: u });
        onHandleSelect(u);
    };
    const navigateTutor = (id) => {
        navigate('/tutor/'+ id);
        document.getElementsByClassName('messageTrigger')[0].click();
    }

    const removeChat = async (chat) => {

        // await deleteDoc(doc(db, "userChats", chat.userInfo.uid));
        const docRef = doc(db, "userChats", currentUser.uid);

        const data = {
            userInfo: deleteField()
        };

        updateDoc(docRef, data)
            .then(() => {
                console.log("Code Field has been deleted successfully");
            })

    }
    return (
        <div className="chats shadow">
            {chats != [] && Object.keys(chats).length === 0 &&
                <div
                    className="userChat"
                >
                    <div className="userChatInfo">
                        <span style={{marginLeft:'10px'}}>Conversation empty</span>
                    </div>
                </div>
            }

            {chats && chats != [] && Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map((chat) => (
                currentUser.uid && currentUser.uid != chat[1].userInfo.uid &&
                        <div
                            className="userChat"
                            key={chat[0]}
                            onClick={() => handleSelect(chat[1].userInfo, chat[1])}
                        >
                            { chat[1].userInfo.isTutor == true ? (
                                <Link onClick={() => navigateTutor(chat[1].userInfo.aid)} to={'/tutor/'+ chat[1].userInfo.aid} >
                                    <img src={chat[1].userInfo.photoURL} alt="" />
                                </Link>
                            ) : (
                                <img src={chat[1].userInfo.photoURL} alt="" />
                            )}
                            <div className="userChatInfo">
                                <span>{chat[1].userInfo.displayName}</span>
                                <p className="lastMessageText">{chat[1].lastMessage != undefined && chat[1].lastMessage ? parse(chat[1].lastMessage?.text) : ''}</p>
                            </div>
                            {/*<Trash onClick={() => removeChat(chat[1])} style={{position: 'absolute', right: 10}} color="red" size={20} />*/}
                        </div>
            ))}
        </div>
    );
};

export default Chats;