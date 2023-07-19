import React, {useContext, useRef, useState} from "react";
// import Img from "../img/img.png";
// import Attach from "../img/attach.png";
import { AuthContext } from "../../contexts/AuthContext";
import { ChatContext } from "../../contexts/ChatContext";
import {
    arrayUnion,
    doc,
    serverTimestamp,
    Timestamp,
    updateDoc,
} from "firebase/firestore";
import { db, storage } from "../../firebase";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import {Upload} from "react-bootstrap-icons";
import AxiosClient from "../../axios-client";
import {useTranslation} from "react-i18next";

const Input = () => {
    const [text, setText] = useState("");
    const [img, setImg] = useState(null);
    const [filename, setFilename] = useState(null);
    const [type, setType] = useState(null);
    const [enable, setEnable] = useState(true);
    const inputRef = useRef();
    const {t, i18n} = useTranslation();
    const { currentUser } = useContext(AuthContext);
    const { data } = useContext(ChatContext);

    const handleSend = async () => {
        setEnable(false);
        if (img) {
            const storageRef = ref(storage, uuid());

            const uploadTask = uploadBytesResumable(storageRef, img);

            uploadTask.on(
                (error) => {
                    console.log(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        await updateDoc(doc(db, "chats", data.chatId), {
                            messages: arrayUnion({
                                id: uuid(),
                                text,
                                senderId: currentUser.uid,
                                date: Timestamp.now(),
                                img: downloadURL,
                                filename: filename,
                                type: type,
                            }),
                            read: false
                        });
                    });
                }
            );
        } else {
            if (text.length > 0){
                await updateDoc(doc(db, "chats", data.chatId), {
                    messages: arrayUnion({
                        id: uuid(),
                        text,
                        senderId: currentUser.uid,
                        date: Timestamp.now(),

                    }),
                    read: false
                });
            }
        }

        AxiosClient.post('/set-notif',{type: data.user.isTutor ? 'tutor' : 'student' , id: data.user.aid, notif: 1, msgType:'message'}).then(() => {
            setEnable(true)
        })
        await updateDoc(doc(db, "userChats", currentUser.uid), {
            [data.chatId + ".lastMessage"]: {
                text
            },
            [data.chatId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", data.user.uid), {
            [data.chatId + ".lastMessage"]: {
                text
            },
            [data.chatId + ".date"]: serverTimestamp(),
        });

        setText("");
        setImg(null);
        setFilename(null);
        setType(null);
    };
    const handleKeypress = e => {
        if (e.charCode === 13) {
            handleSend();
        }
    };

    return (
        <div className="input">
            <input
                type="text"
                placeholder={t('type_something')}
                onChange={(e) => setText(e.target.value)}
                onKeyPress={handleKeypress}
                value={text}
                ref={inputRef}
            />
            <div className="send">
                {/*<img src={Attach} alt="" />*/}
                {img &&
                    <span className="attachFile">{filename}</span>
                }
                <input
                    type="file"
                    style={{ display: "none" }}
                    id="file"
                    onChange={(e) => {
                        setImg(e.target.files[0]);
                        setFilename(e.target.files[0].name);
                        setType(e.target.files[0].type);
                        inputRef.current.focus();
                    }}
                />
                <label htmlFor="file">
                   <Upload size={20} style={{cursor:'pointer'}} />
                </label>
                <button disabled={!enable} style={{background:'#f0500b'}} onClick={handleSend}>{t('send')}</button>
            </div>
        </div>
    );
};

export default Input;