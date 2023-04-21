import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import AxiosClient from "../axios-client";
import Container from "react-bootstrap/Container";
import {Col, Row} from "react-bootstrap";
import moment from "moment";
import parse from 'html-react-parser'


export default function BlogSingle(){
    let { id } = useParams();
    const [blog, setBlog] = useState({
        content: ''
    });
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        AxiosClient.get('/get-blog/'+id).then(({data}) => {
            setBlog(data.blog);
            setBlogs(data.blogs);
        })
    }, [])

    return(
        <>
            <Container>
                <Row>
                    <Col>
                        <div className="p-5">
                            <div className="mt-5"><small>{moment(blog.created_at).format('Y.MM.DD')}</small></div>
                            <h1 className="mb-4">{blog.title}</h1>
                            { blog.main_image ?
                                <img className="img-fluid" src={'https://web.pinpaya.com/storage/'+blog.main_image} alt="avatar"/>
                                : <img className="blog-image" src="https://web.pinpaya.com/no-image.png" />
                            }
                            <p className="fz-18 my-5">
                                {parse(blog.content)}
                            </p>
                        </div>
                    </Col>
                </Row>
                {/*<Row>*/}
                {/*      <h2 className="mb-4">Read more</h2>*/}
                {/*      {*/}
                {/*          blogs?.length > 0 &&*/}
                {/*          blogs.map(item =>*/}
                {/*              <Col lg={3}  md={6} >*/}
                {/*                  <div className="my-3">*/}
                {/*                      { item.main_image ?*/}
                {/*                          <img className="blog-image" src={'https://web.pinpaya.com/storage/'+item.main_image} alt="avatar"/>*/}
                {/*                          : <img className="blog-image" src="https://web.pinpaya.com/no-image.png" />*/}
                {/*                      }*/}
                {/*                      <div><small>{moment(item.created_at).format('Y.MM.DD')}</small></div>*/}
                {/*                      <h4><Link to={'/blog/'+item.id} >{item.title}</Link></h4>*/}
                {/*                  </div>*/}
                {/*              </Col>*/}
                {/*          )}*/}
                {/*      <Link to="/blog">*/}
                {/*          <button className="btn btn-secondary text-white my-5">*/}
                {/*              VIEW MORE*/}
                {/*          </button>*/}
                {/*      </Link>*/}
                {/*</Row>*/}
            </Container>
        </>
    )
}