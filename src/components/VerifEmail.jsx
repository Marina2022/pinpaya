import {useEffect, useState} from "react";
import axiosClient from "../axios-client";
import {useParams} from "react-router-dom";
import Container from "react-bootstrap/Container";
import {Spinner} from "react-bootstrap";

const VerifEmail = () => {
    let { token } = useParams();

    const [loader, setLoader] = useState(true);
    const [msg, setMsg] = useState("");

    useEffect(() => {
        axiosClient.post('check-verif-token',{token}).then(({data}) => {
            if(data.message == true){
                setMsg('Your profile verified');
            }else{
                setMsg('Something wrong');
            }
            setLoader(false);
        }).catch(err => {
            setMsg('Something wrong');
            setLoader(false);
        })
    }, [])

    return (
        <Container>
            <div>
                {
                    loader ?
                        <div style={{display:'flex', justifyContent: 'center'}}>
                            <Spinner animation="border" role="status" >
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                        </div>
                        :
                        <div style={{display:'flex', justifyContent: 'center', margin: 100}}>
                            <h4>{msg}</h4>
                        </div>
                }

            </div>
        </Container>
    );
}

export default VerifEmail;