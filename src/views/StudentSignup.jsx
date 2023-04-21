import {Link} from "react-router-dom";
import {useRef, useState} from "react";
import AxiosClient from "../axios-client.js";
import {useStateContext} from "../contexts/ContextProvider.jsx";
import {countries} from '../data'
import {createUserWithEmailAndPassword} from "firebase/auth";
import {auth, db} from "../firebase";
import {doc, setDoc} from "firebase/firestore";
export default function StudentSignup(){
    const nameRef = useRef();
    const emailRef = useRef();
    const lastNameRef = useRef();
    const phoneRef = useRef();
    const ageRef = useRef();
    const locationRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmationRef = useRef();
    const {setUser, setToken, setType} = useStateContext();
    const [errors, setErrors] = useState(null);

    const onSubmit = async (e) => {
        e.preventDefault()

        const payload = {
            name: nameRef.current.value,
            lastname: lastNameRef.current.value,
            phone: phoneRef.current.value,
            age: ageRef.current.value,
            location: locationRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value,
            type: 'student'
        }

        setErrors(null);
        AxiosClient.post('/signup', payload).then(({data}) => {
            setUser(data.user);
            setToken(data.token);
            setType(data.type);
        }).catch(err => {
            const response = err.response;

            if(response && response.status === 422){
                setErrors(response.data.errors);
            }

        })

        try{
            // const res = await createUserWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value);
            //
            // await setDoc(doc(db,"users", res.user.uid),{
            //     uid: res.user.uid,
            //     displayName: nameRef.current.value,
            //     email: emailRef.current.value
            // });
            // await setDoc(doc(db,"userChats", res.user.uid),{});

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

        }catch (error){
            console.log(error);
        }
    }

    return(
        <div className="login-signup-form animated fadeInDown">
            <div className="form">
                <form onSubmit={onSubmit}>
                    <h1 className="title">
                        Student Signup
                    </h1>
                    {errors &&
                        <div className='alert'>
                            {Object.keys(errors).map(key => (
                                <p key={key}>{errors[key][0]}</p>
                            ))}
                        </div>
                    }
                    <input required ref={nameRef} placeholder="Name" type="text"/>
                    <input required ref={lastNameRef} placeholder="Lastname" type="text"/>
                    <input required ref={emailRef} placeholder="Email" type="email"/>
                    <select required ref={locationRef}>
                        <option value="">Select location</option>
                        {countries.map((item, index) => (<option key={index} value={item}>{item}</option>))}
                    </select>
                    <input required ref={phoneRef} placeholder="Phone" type="text"/>
                    <input required ref={ageRef} placeholder="Age" type="number"/>
                    <input required ref={passwordRef} placeholder="Password" type="password"/>
                    <input required ref={passwordConfirmationRef} placeholder="Password Confirmation" type="password"/>
                    <button className="btn btn-block">Signup</button>
                    <p className="message">
                        Already Registered? <Link to="/login">Sign in</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}
