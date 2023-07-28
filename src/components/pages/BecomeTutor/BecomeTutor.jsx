import Container from "react-bootstrap/Container";
import {Button, Col, Form, Row} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {
  Check,
  CurrencyEuro, Globe2, ShieldFillCheck
} from "react-bootstrap-icons";
import {useRef, useState} from "react";
import {useStateContext} from "../../../contexts/ContextProvider";
import AxiosClient from "../../../axios-client";
import {countries} from "../../../data";
import firebaseChat from "../../../hooks/firebaseChat";
import {useTranslation} from "react-i18next";
import s from './BecomeTutor.module.scss'


import BecomeMainSection from "./BecomeMainSection/BecomeMainSection";
import Benefits from "./Benefits/Benefits";
import GetPaid from "./GetPaid/GetPaid";

export default function BecomeTutor() {

  const {setUser, setToken, setType} = useStateContext();
  const navigate = useNavigate();
  const {t, i18n} = useTranslation();

  return (
    <>
      <BecomeMainSection/>
      <Benefits/>
      <GetPaid/>
    </>
  )
}
