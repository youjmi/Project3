import React, { useState, useParams, useEffect } from "react";
import { Modal, Button, Form, Container } from "react-bootstrap"
import API from "../../utils/blog.js";
import "bootstrap/dist/css/bootstrap.min.css";

function EditPost(props) {

  const [blogs, setBlogs] = useState([]);
  const [update, setupdateBlogs] = useState([])

  // const [formObject, setFormObject] = useState({
  //   title: "",
  //   post: "",
  //   //   user: "",
  //   photo: "",
  // });



  useEffect(() => {
      loadBlogs()

    }, [])

    function loadBlogs() {
      API.getBlogs()
        .then(res =>
          setBlogs(res.data)
        )
        .catch(err => console.log(err));
    };

  function handleInputChange(event) {
    const { name, value } = event.target;
    setupdateBlogs({ ...update, [name]: value });
  }



  // When the form is submitted, use the API.saveBook method to save the book data
  // Then reload books from the database
  function handleFormSubmit(id) {
    // event.preventDefault();
    console.log("working");
    
    API.updateBlog(id)
    .then((res) => {loadBlogs()
    console.log(res)
    })
    .catch((err) => console.log(err))
    
  }







  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      style={{ opacity: 1 }}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Update Journal Post
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
        {/* {blogs.map((blog)=> { */}
          <Form 
          key={blogs._id} href={"/blog/" + blogs._id}
          >
            
            <Form.Group controlId="formBasicTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="title"
                placeholder="title"
                onChange={handleInputChange}
                name="title"
                defaultValue ={props.title}
                // value={blog.title}
              />
            </Form.Group>

            <Form.Group controlId="formBasicImage">
              <Form.Label>Image:</Form.Label>
              <Form.Control
                type="photo"
                // placeholder={blog.photo}
                onChange={handleInputChange}
                // accept=".png, .jpg, .jpeg"
                name="photo"
                // encType={"multipart/form-data"}
                defaultValue={props.photo}
              />
            </Form.Group>


            <Form.Group controlId="blogText">
              <Form.Label>Blog Text:</Form.Label>
              <Form.Control
                as="textarea"
                rows={10}
                onChange={handleInputChange}
                name="post"
                defaultValue={props.post}
                // placeholder={blog.post}
              />
            </Form.Group>


            <br />
            <Button
            obj={props._id}
          onClick={() => {
            props.onHide();
            handleFormSubmit(props._id)
          }}
          encType="multipart/form-data"
        >
          Submit
          </Button>
          </Form>
 {/* })}          */}
        </Container>
      </Modal.Body>
      <Modal.Footer>
        
      </Modal.Footer>
    </Modal>
  );
}
export default EditPost;
