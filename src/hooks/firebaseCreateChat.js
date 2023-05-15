import {collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where} from "firebase/firestore";
import {db} from "../firebase";


const firebaseCreateChat = async (currentUser, user, logged) => {

    var me = '';
    const to_avatar = user.avatar ? "https://web.pinpaya.com/storage/"+ user.avatar : "https://app.pinpaya.com/no-image.png";
    const from_avatar = logged.avatar ? "https://web.pinpaya.com/storage/"+ logged.avatar : "https://app.pinpaya.com/no-image.png";
    const to_id = user.id;
    const from_id = logged.id;
    const to_is_tutor = user.price ? true : false;
    const from_is_tutor = logged.price ? true : false;

    const q = query(
        collection(db, "users"),
        where("email", "==", user.email)
    );


    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        user = doc.data();
    });

    const a = query(
        collection(db, "users"),
        where("email", "==", currentUser.email)
    );


    const auerySnapshot = await getDocs(a);
    auerySnapshot.forEach((doc) => {
        me = doc.data();
    });

    //check whether the group(chats in firestore) exists, if not create
    const combinedId =
        currentUser.uid > user.uid
            ? currentUser.uid + user.uid
            : user.uid + currentUser.uid;
    try {
        const res = await getDoc(doc(db, "chats", combinedId));

        if (!res.exists()) {
            //create a chat in chats collection
            await setDoc(doc(db, "chats", combinedId), { messages: [] });

            //create user chats
            await updateDoc(doc(db, "userChats", currentUser.uid), {
                [combinedId + ".userInfo"]: {
                    uid: user.uid,
                    displayName: user.displayName,
                    photoURL: to_avatar,
                    aid: to_id,
                    isTutor: to_is_tutor
                },
                [combinedId + ".date"]: serverTimestamp(),
            });


            await updateDoc(doc(db, "userChats", user.uid), {
                [combinedId + ".userInfo"]: {
                    uid: currentUser.uid,
                    displayName: me.displayName,
                    photoURL: from_avatar,
                    aid: from_id,
                    isTutor: from_is_tutor
                },
                [combinedId + ".date"]: serverTimestamp(),
            });
        }
    } catch (err) {
        console.log(err);
    }

};
export default firebaseCreateChat