import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import {auth, db} from "../firebase";
import {doc, setDoc} from "firebase/firestore";

const firebaseChat = async (email, password, name) => {
    try{
        const res = await createUserWithEmailAndPassword(auth, email, password);

        await setDoc(doc(db,"users", res.user.uid),{
            uid: res.user.uid,
            email: email,
            displayName: name
        });
        await setDoc(doc(db,"userChats", res.user.uid),{});

        //  const storageRef = ref(storage, nameRef.current.value);
        //  const uploadTask = uploadBytesResumable(storageRef, file);
        //
        // uploadTask.on(
        //     (error) => {
        //         // setErrors(true);
        //     },
        //     () => {
        //         getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
        //             await updateProfile(res.user, {
        //                 displayName: nameRef.current.value,
        //                 photoURL: downloadURL,
        //             });
        //
        //         });
        //     }
        // );
        console.log('done');

    }catch (error){
        console.log(error);
    }
};

export default firebaseChat;

