import {
    arrayUnion,
    collection,
    doc,
    getDocs,
    query,
    serverTimestamp,
    Timestamp,
    updateDoc,
    where
} from "firebase/firestore";
import {db} from "../firebase";
import {v4 as uuid} from "uuid";
import {useContext} from "react";



const chatNotif = async (text, currentUser, email) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    var user = null;

    const a = query(
        collection(db, "users"),
        where("email", "==", email)
    );


    const auerySnapshot = await getDocs(a);
    auerySnapshot.forEach((doc) => {
        user = doc.data();
    });

    const chatId = currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;

    try{
        await updateDoc(doc(db, "chats", chatId), {
            messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                notif:true
            }),
        });

        await updateDoc(doc(db, "userChats", currentUser.uid), {
            [chatId + ".lastMessage"]: {
                text
            },
            [chatId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
            [chatId + ".lastMessage"]: {
                text
            },
            [chatId + ".date"]: serverTimestamp(),
        });

    }catch (error){
        console.log(error);
    }
};

export default chatNotif;

