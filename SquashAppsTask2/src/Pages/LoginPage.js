import React, { Component } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  Row,
  Image,
  Nav,
  Navbar,
  Toast,
} from "react-bootstrap";
//Icons
import { MdMail } from "react-icons/md";
//Database
import firebase from "../Database/Firebase";

export default class LoginPage extends Component {
  constructor() {
    super();
    this.dbAuth = firebase.auth();
    this.state = {
      email: "",
      password: "",
      toast: false,
    };
  }

  // ******************** Signin Auth Handler ************************

  SignIn = () => {
    this.setState({
      emailVal: "",
      passwordVal: "",
    });
    if (this.state.email == "") {
      this.setState({ emailVal: "Email Required !" });
    } else if (this.state.password == "") {
      this.setState({ passwordVal: "Password Required !" });
    } else {
      this.dbAuth
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(() => {
          console.log("SignIn done !!!");
          const userID = this.dbAuth.currentUser.uid;
          console.log(userID);
          this.setState({
            email: "",
            password: "",
          });
          localStorage.setItem("USER_ID", userID);
          this.props.history.push("/Announcement");
        })
        .catch((err) => {
          console.log("ERROR SPOTTED", err);
          this.setState({
            toast: true,
          });
        });
    }
  };

  render() {
    return (
      <div>
        {/* ******************** Navigation ************************ */}

        <Navbar expand="lg" className="bg_white shadow-sm">
          <Navbar.Brand className="txt_green my_font ">
            SA-INTRANET
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto"></Nav>
            <Nav>
              <Button
                className="mr-4"
                style={{ backgroundColor: "#3bc163", border: 0 }}
              >
                Get Started
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        {/* ******************** Container View Port ************************ */}

        <Container>
          <Row className="pt-5">
            <Col md={6}>
              <Image fluid src={require("../Assets/2.png")} alt="Image" />
            </Col>
            <Col md={6} className="pt-4">
              <h3
                className="txt_blue text-left font-weight-bold "
                style={{ lineHeight: 1.5 }}
              >
                Login to your app
              </h3>
              <p className=" txt_blue">
                To make a workspace from scratch, please confirm your email
                address.
              </p>

              <div>
                <Form className="pt-4">
                  <Form.Group>
                    <Form.Label style={{ color: "gray" }}>Email</Form.Label>
                    <Form.Control
                      placeholder="Enter your Email"
                      value={this.state.email}
                      onChange={(Text) =>
                        this.setState({ email: Text.target.value })
                      }
                    />
                    {<p className="text-danger">{this.state.emailVal}</p>}
                  </Form.Group>
                  <Form.Group>
                    <Form.Label style={{ color: "gray" }}>Password</Form.Label>
                    <Form.Control
                      placeholder="Enter your password"
                      type="password"
                      value={this.state.password}
                      onChange={(Text) =>
                        this.setState({ password: Text.target.value })
                      }
                    />
                    {<p className="text-danger">{this.state.passwordVal}</p>}
                  </Form.Group>
                  <Form.Group controlId="formBasicCheckbox">
                    <div className="d-flex flex-row justify-content-between">
                      <Form.Check type="checkbox" label="Remind Me" />
                      <Button variant="link">Forgot Password ?</Button>
                    </div>
                  </Form.Group>
                  <Button
                    onClick={() => this.SignIn()}
                    className="mt-3"
                    style={{
                      width: 100,
                      backgroundColor: "#3bc163",
                      border: 0,
                    }}
                  >
                    Sign In
                  </Button>
                </Form>
              </div>
            </Col>
            
            {/* ******************** Danger Toast ************************ */}

            <Toast
              delay={2000}
              show={this.state.toast}
              autohide
              onClose={() => this.setState({ toast: false })}
              className="bg-danger"
              style={{
                position: "absolute",
                top: 50,
                right: 0,
                margin: 20,
              }}
            >
              <Toast.Header className="bg-danger">
                <strong className="mr-auto txt_white">Something Wrong !</strong>
              </Toast.Header>
              <Toast.Body>
                <strong className="txt_white">
                  Incorrect Email or password
                </strong>
              </Toast.Body>
            </Toast>
          </Row>
        </Container>
      </div>
    );
  }
}
