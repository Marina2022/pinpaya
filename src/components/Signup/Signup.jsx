import React, {useState} from "react";
import SignupAll from "./SignupAll.jsx";
import '../../index.scss';
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";
import logo from '../../assets/pinpaya-logo.svg'
import BigOrangeBtn from "../CommonComponents/BigOrangeBtn/BigOrangeBtn";

export default function Signup(){
    const [type, setType] = useState(null);
    const {t, i18n} = useTranslation();
    return(
        <>
            {type == null &&
                <div className="login-signup-form animated fadeInDown">
                    <div className="form">
                        <div className="text-center mb-4">
                            <Link to="/"><img src={logo} alt="logo"/></Link>
                        </div>
                        <h1 className="title">
                            {t('select_user_type')}
                        </h1>
                        <br/>
                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                            <BigOrangeBtn style={{'width': '47%'}} onClick={() => setType('tutor')} >{t('tutor')}</BigOrangeBtn>
                            <BigOrangeBtn style={{'width': '47%'}} onClick={() => setType('student')} >{t('student')}</BigOrangeBtn>
                        </div>
                    </div>
                </div>
            }
            {type === 'student' ? <SignupAll type={'student'} /> : '' }
            {type === 'tutor' ? <SignupAll type={'tutor'} /> : '' }
        </>

    )
}
