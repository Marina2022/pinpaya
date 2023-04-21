import {Link} from "react-router-dom";
import {useRef, useState} from "react";
import AxiosClient from "../axios-client.js";
import {useStateContext} from "../contexts/ContextProvider.jsx";
import '../index.css';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
export default function Login(){
    const emailRef = useRef();
    const passwordRef = useRef();
    const {setUser, setToken, setType} = useStateContext();
    const [errors, setErrors] = useState(null);
    const onSubmit = async (e) => {
        e.preventDefault()

        // try {
        //     await signInWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value);
        // }catch (err){}

        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value
        }
        setErrors(null);
        AxiosClient.post('/login', payload).then(({data}) => {
            setUser(data.user);
            setToken(data.token);
            setType(data.type);

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
