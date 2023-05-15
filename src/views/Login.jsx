import {Link} from "react-router-dom";
import {useRef, useState} from "react";
import AxiosClient from "../axios-client.js";
import {useStateContext} from "../contexts/ContextProvider.jsx";
import '../index.css';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import firebaseChat from "../hooks/firebaseChat";
export default function Login(){
    const emailRef = useRef();
    const passwordRef = useRef();
    const {setUser, setToken, setType} = useStateContext();
    const [errors, setErrors] = useState(null);

    const firebase = async (email, password, name) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
        }catch (err){
            if(err.code == 'auth/user-not-found'){
                firebaseChat(email, password, name);
            }
        }
    }
    const onSubmit = async (e) => {
        e.preventDefault()

        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value
        }
        setErrors(null);
      await  AxiosClient.post('/login', payload).then(({data}) => {
            setUser(data.user);
            setToken(data.token);
            setType(data.type);
            firebase(emailRef.current.value, passwordRef.current.value, data.user.name);

        }).catch(err => {
            const response = err.response;

            if(response && response.status === 422){
                if(response.data.errors){
                    setErrors(response.data.errors);
                }else{
                    setErrors({
                        email: [response.data.message]
                    });
                }
            }
        })
    }

    return(
        <div className="login-signup-form animated fadeInDown">
            <div className="form">
                <form onSubmit={onSubmit}>
                    <h1 className="title">
                        Login into your account
                    </h1>
                    {errors &&
                        <div className='alert'>
                            {Object.keys(errors).map(key => (
                                <p key={key}>{errors[key][0]}</p>
                            ))}
                        </div>
                    }
                    <input ref={emailRef} placeholder="Email" type="email"/>
                    <input ref={passwordRef} placeholder="Password" type="password"/>
                    <button className="btn btn-block">Login</button>
                    <p className="message">
                        Not Registered? <Link to="/signup">Create an account</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}
