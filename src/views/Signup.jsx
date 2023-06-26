import React, {useState} from "react";
import StudentSignup from "./StudentSignup.jsx";
import TutorSignup from "./TutorSignup.jsx";
import '../index.css';
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";
export default function Signup(){

    const [type, setType] = useState(null);
    const {t, i18n} = useTranslation();
    return(
        <>
            {type == null &&
                <div className="login-signup-form animated fadeInDown">
                    <div className="form">
                        <div className="text-center my-4">
                            <Link to="/"><img src="/pinpaya-logo.svg" alt="logo"/></Link>
                        </div>
                        <h1 className="title">
                            {t('select_user_type')}
                        </h1>
                        <br/>
                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                            <button onClick={() => setType('tutor')} className="btn">{t('tutor')}</button>
                            <button onClick={() => setType('student')} className="btn">{t('student')}</button>
                        </div>
                    </div>
                </div>
            }

            {type === 'student' ? <StudentSignup /> : '' }
            {type === 'tutor' ? <TutorSignup /> : '' }

        </>

    )
}
