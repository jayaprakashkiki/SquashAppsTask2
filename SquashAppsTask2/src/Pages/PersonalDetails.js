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
  InputGroup,
  Toast,
} from "react-bootstrap";
//Icons
import { MdMail } from "react-icons/md";
//Database
import firebase from "../Database/Firebase";
import { Redirect } from "react-router-dom";

export default class PersonalDetails extends Component {
  constructor() {
    super();
    this.dbAuth = firebase.auth();
    this.dbUser = firebase.firestore().collection("User");
    this.state = {
      //signin form
      fName: "",
      lName: "",
      email: "",
      password: "",
      //company detail form
      companyName: "",
      location: "",
      emp: "",
      domain: "",
      //toast
      toast: false,
      //formsift
      form1: true,
      form2: false,
    };
  }

  // **********************Signup Auth Handler***********************
  SignUp() {
    console.log("signup called");
    this.dbAuth
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((user) => {
        console.log(user);
        const userID = this.dbAuth.currentUser.uid;

        this.dbUser
          .doc(`${userID}`)
          .set({
            userID: userID,
            fName: this.state.fName,
            lName: this.state.lName,
            email: this.state.email,
            companyName: this.state.companyName,
            location: this.state.location,
            emp: this.state.emp,
            domain: this.state.domain,
          })
          .then(() => {
            this.setState({
              toast: true,
              fName: "",
              lName: "",
              email: "",
              password: "",
            });
            console.log(
              "***************** SUCCESSFULLY SIGNEDUP ********************"
            );
            setTimeout(() => {
              this.props.history.push("/LoginPage");
            }, 2000);
          })
          .catch((err) => {
            console.log("ERROR SPOTTED", err);
          });
      })
      .catch((err) => {
        console.log("ERROR SPOTTED", err);
      });
  }

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
              <Nav.Link>
                <MdMail /> support@squashapps.com
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Container>
          <Row className="pt-5">
            <Col md={7}>
              <Image fluid src={require("../Assets/2.png")} alt="Image" />
            </Col>

            {/* ******************* User Detail Form ********************* */}
            {this.state.form2 && (
              <Col md={5} className="pt-4">
                <h3
                  className="txt_blue text-left font-weight-bold "
                  style={{ lineHeight: 1.5 }}
                >
                  Create Personal Account
                </h3>
                <p className=" txt_blue">
                  To make a workspace from scratch, please confirm your email
                  address.
                </p>
                <div>
                  <Form className="pt-4">
                    <Form.Row>
                      <Col>
                        <Form.Group>
                          <Form.Label style={{ color: "gray" }}>
                            First Name
                          </Form.Label>
                          <Form.Control
                            placeholder="Jaya"
                            value={this.state.fName}
                            onChange={(Text) =>
                              this.setState({ fName: Text.target.value })
                            }
                          />
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group>
                          <Form.Label style={{ color: "gray" }}>
                            Last Name
                          </Form.Label>
                          <Form.Control
                            placeholder="Prakash"
                            value={this.state.lName}
                            onChange={(Text) =>
                              this.setState({ lName: Text.target.value })
                            }
                          />
                        </Form.Group>
                      </Col>
                    </Form.Row>

                    <Form.Group>
                      <Form.Label style={{ color: "gray" }}>Email</Form.Label>
                      <Form.Control
                        placeholder="Enter your email"
                        value={this.state.email}
                        onChange={(Text) =>
                          this.setState({ email: Text.target.value })
                        }
                      />
                    </Form.Group>

                    <Form.Group>
                      <Form.Label style={{ color: "gray" }}>
                        Password
                      </Form.Label>
                      <Form.Control
                        placeholder="Enter your password"
                        type="password"
                        value={this.state.password}
                        onChange={(Text) =>
                          this.setState({ password: Text.target.value })
                        }
                      />
                    </Form.Group>

                    <Button
                      onClick={() => this.SignUp()}
                      size="md"
                      className="mt-0"
                      style={{
                        width: 100,
                        backgroundColor: "#3bc163",
                        border: 0,
                      }}
                    >
                      Complete
                    </Button>
                  </Form>
                </div>
              </Col>
            )}

            {/* ******************* Company Detail Form ********************* */}

            {this.state.form1 && (
              <Col md={5} className="pt-4">
                <h3
                  className="txt_blue text-left font-weight-bold "
                  style={{ lineHeight: 1.5 }}
                >
                  Setup Your Application
                </h3>
                <p className=" txt_blue">
                  To make a workspace from scratch, please confirm your email
                  address.
                </p>

                <div>
                  <Form className="pt-4">
                    <Form.Group>
                      <Form.Label style={{ color: "gray" }}>
                        Company Name
                      </Form.Label>
                      <Form.Control
                        placeholder="Enter your company name"
                        value={this.state.companyName}
                        onChange={(Text) =>
                          this.setState({ companyName: Text.target.value })
                        }
                      />
                    </Form.Group>
                    <Form.Row>
                      <Col>
                        <Form.Group>
                          <Form.Label style={{ color: "gray" }}>
                            Location
                          </Form.Label>
                          <Form.Control
                            placeholder="Tamil Nadu"
                            value={this.state.location}
                            onChange={(Text) =>
                              this.setState({ location: Text.target.value })
                            }
                          />
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group>
                          <Form.Label style={{ color: "gray" }}>
                            No. of Employees
                          </Form.Label>
                          <Form.Control
                            placeholder="50"
                            value={this.state.emp}
                            onChange={(Text) =>
                              this.setState({ emp: Text.target.value })
                            }
                          />
                        </Form.Group>
                      </Col>
                    </Form.Row>

                    <InputGroup className="mb-3">
                      <Form.Control
                        placeholder="Domain Name"
                        value={this.state.domain}
                        onChange={(Text) =>
                          this.setState({ domain: Text.target.value })
                        }
                      />
                      <InputGroup.Prepend>
                        <InputGroup.Text id="inputGroup-sizing-sm">
                          .intranet.com
                        </InputGroup.Text>
                      </InputGroup.Prepend>
                    </InputGroup>
                    <Button
                      size="md"
                      className="mt-0"
                      style={{
                        width: 100,
                        backgroundColor: "#3bc163",
                        border: 0,
                      }}
                      onClick={() =>
                        this.setState({ form1: false, form2: true })
                      }
                    >
                      Next
                    </Button>
                  </Form>
                </div>
              </Col>
            )}

            {/* ******************* Success Toast ********************* */}

            <Toast
              delay={2000}
              show={this.state.toast}
              autohide
              onClose={() => this.setState({ toast: false })}
              className="bg-success"
              style={{
                position: "absolute",
                top: 50,
                right: 0,
                margin: 20,
              }}
            >
              <Toast.Header className="bg-success">
                <strong className="mr-auto txt_white">SA-INTRANET</strong>
              </Toast.Header>
              <Toast.Body>
                <p className="txt_white">Woohoo, Successfully Signed</p>
              </Toast.Body>
            </Toast>
          </Row>
        </Container>
      </div>
    );
  }
}
