import {useEffect, useState} from "react";
import axiosClient from "../axios-client";
import Container from "react-bootstrap/Container";
import {Col, Row, Toast} from "react-bootstrap";
import moment from "moment/moment";
import {Link} from "react-router-dom";


export default function Blog(){
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        axiosClient.get('blogs').then(({data}) => {
            setBlogs(data.blogs);
        }).catch(err => {})
    }, [])

    return(
        <>
            <Container>
                <div className="my-5">
                    <h2 className="mb-2">Blog</h2>
                    <Row>
                        {
                            blogs?.length > 0 &&
                            blogs.map(item =>
                                <Col lg={3}  md={5} >
                                    <div className="my-3">
                                        { item.main_image ?
                                            <img className="blog-image" src={'https://web.pinpaya.com/storage/'+item.main_image} alt="avatar"/>
                                            : <img className="blog-image" src="https://web.pinpaya.com/no-image.png" />
                                        }
                                        <div><small>{moment(item.created_at).format('Y.MM.DD')}</small></div>
                                        <h4><Link to={'/blog/'+item.id} >{item.title}</Link></h4>
                                    </div>
                                </Col>
                            )}
                    </Row>
                </div>
            </Container>
        </>
    )
}