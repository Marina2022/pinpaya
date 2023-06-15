import React, {useState} from "react";
import StudentSignup from "./StudentSignup.jsx";
import TutorSignup from "./TutorSignup.jsx";
import '../index.css';
import {Link} from "react-router-dom";
export default function Signup(){

    const [type, setType] = useState(null);
    return(
        <>
            {type == null &&
                <div className="login-signup-form animated fadeInDown">
                    <div className="form">
                        <div className="text-center my-4">
                            <Link to="/"><img src="/pinpaya-logo.svg" alt="logo"/></Link>
                        </div>
                        <h1 className="title">
                            Select User type
                        </h1>
                        <br/>
                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                            <button onClick={() => setType('tutor')} className="btn">Tutor</button>
                            <button onClick={() => setType('student')} className="btn">Student</button>
                        </div>
                    </div>
                </div>
            }

            {type === 'student' ? <StudentSignup /> : '' }
            {type === 'tutor' ? <TutorSignup /> : '' }

        </>

    )
}
