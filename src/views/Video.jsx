import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import {useStateContext} from "../contexts/ContextProvider";
import {Navigate, useParams} from "react-router-dom";
import axiosClient from "../axios-client";
import {useEffect, useState} from "react";

export function getUrlParams(
    url = window.location.href
) {
    let urlStr = url.split('?')[1];
    return new URLSearchParams(urlStr);
}
export default function Video(){

    let { id } = useParams();
    const {user, type} = useStateContext();
    const roomRand = (Math.floor(Math.random() * 10000) + "");
    const roomID = getUrlParams().get('roomID') || roomRand;


    useEffect(() => {
        if(id && roomID && type == "tutor"){
            axiosClient.post('tutor/set-room',{id:id, room_id: roomID}).then(({data}) => {
            }).catch(err => {
            })
        }

    }, [roomID]);

    let myMeeting = async (element) => {
        // generate Kit Token

        const appID = 1612473808;
        const serverSecret = "2c01b59918a1753bc3da69d60a20577c";
        const kitToken =  ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID, type + user.id + "" ,user.name);



        // Create instance object from Kit Token.
        const zp = ZegoUIKitPrebuilt.create(kitToken);

        // start the call
        zp.joinRoom({
            container: element,
            sharedLinks: [
                {
                    name: 'Personal link',
                    url:
                        window.location.protocol + '//' +
                        window.location.host + window.location.pathname +
                        '?roomID=' +
                        roomID,
                },
            ],
            scenario: {
                mode: ZegoUIKitPrebuilt.VideoConference, // To implement 1-on-1 calls, modify the parameter here to [ZegoUIKitPrebuilt.OneONoneCall].
            },
            showScreenSharingButton:false,
            showTextChat:false,
            showPreJoinView:false
        });

    };



    return user && (
        <div
            id="videoSection"
            ref={myMeeting}
            style={{ width: '100vw', height: '95vh' }}
        ></div>
    );
}