import '../../../css/main.css'
import {Outlet} from "react-router-dom";
import {useStateContext} from "../../../contexts/ContextProvider";
import React, {useContext, useEffect, useState} from "react";
import axiosClient from "../../../axios-client";
import Home from "../../chat/Home";
import AxiosClient from "../../../axios-client";
import Header from "../Header/Header";
import s from './MainLayout.module.scss'


export default function MainLayout() {

  const [showChat, setShowChat] = useState(false);
  const {user, type, setUser} = useStateContext()
  const [showLoader, setShowLoader] = useState(null);

  useEffect(() => {
    setShowLoader(true);
    axiosClient.get('/user').then(({data}) => {
      setUser(data);
      setShowLoader(false);
    }).catch(err => {
      setShowLoader(false)
    })
  }, []);

  const handleChatClose = () => {
    setShowChat(false);
    document.body.style.overflow = 'unset';
  }

  const triggerMessage = () => {
    setShowChat(true);
    document.body.style.overflow = 'hidden';
    AxiosClient.post('/set-notif', {type: type ?? null, id: user ? user.id : null, notif: 0}).then((data) => {
    })
    axiosClient.get('/user').then(({data}) => {
      setUser(data);
    })
  }

  return (
    <>
      <Header triggerMessage={triggerMessage} showLoader={showLoader}/>
      <main className={s.main}>
        <Outlet/>
      </main>
      {showChat && user &&
        <div>
          <Home handleChatClose={handleChatClose}/>
        </div>
      }
    </>
  )
}
