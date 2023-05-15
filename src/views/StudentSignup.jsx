import {Link} from "react-router-dom";
import {useRef, useState} from "react";
import AxiosClient from "../axios-client.js";
import {useStateContext} from "../contexts/ContextProvider.jsx";
import {countries} from '../data'

import firebaseChat from "../hooks/firebaseChat";
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
            firebaseChat(data.user.email, data.user.password, data.user.name);
        }).catch(err => {
            const response = err.response;

            if(response && response.status === 422){
                setErrors(response.data.errors);
            }
        })

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
