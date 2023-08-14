import {useEffect, useState} from "react";
import axiosClient from "../axios-client";
import {useNavigate, useParams} from "react-router-dom";
import Container from "react-bootstrap/Container";
import {Spinner} from "react-bootstrap";
import OurRegularPopup from "./CommonComponents/OurRegularPopup/OurRegularPopup";
import {useStateContext} from "../contexts/ContextProvider";

const VerifEmail = () => {
  let {token} = useParams();

  const {type} = useStateContext()

  const [loader, setLoader] = useState(true);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    axiosClient.post('check-verif-token', {token}).then(({data}) => {
      if (data.message === true) {
        setMsg('Your profile verified');
      } else {
        setMsg('Something wrong');
      }
      setLoader(false);
      setIsOpen(true)
    }).catch(err => {
      setMsg('Something wrong');
      setLoader(false);
      setIsOpen(true)
    })
  }, [])

  const navigate = useNavigate()

  const [isOpen, setIsOpen] = useState(false)

  const handleClose = () => {
    setIsOpen(false)
    navigate(`/${type}`)
    window.location.reload()
  }

  return (
    <Container>

      <div>
        {
          loader ?
            <div style={{display: 'flex', justifyContent: 'center'}}>
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
            :
            <OurRegularPopup isOpen={isOpen} handleClose={handleClose}>
              <div style={{display: 'flex', justifyContent: 'center', margin: 20}}>
                <h4>{msg}</h4>
              </div>
            </OurRegularPopup>
        }
      </div>
    </Container>
  );
}

export default VerifEmail;

