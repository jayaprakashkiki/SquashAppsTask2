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
} from "react-bootstrap";
//Icons
import { MdMail } from "react-icons/md";
//Database
import firebase from "../Database/Firebase";
import { Link } from "react-router-dom";

export default class GettingStartedPage extends Component {
  constructor() {
    super();
    this.dbAuth = firebase.auth();
    this.state = {
      mobile: "",
    };
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
              <Nav.Link className="my_font txt_green">
                <Link className="my_font txt_green" to="/LoginPage">Login</Link>
              </Nav.Link>
              <Nav.Link>
                <MdMail /> support@squashapps.com
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        {/* ******************** Container View Port ************************ */}

        <Container>
          <Row className="pt-5">
            <Col md={6}>
              <Image fluid src={require("../Assets/1.png")} alt="Image" />
            </Col>
            <Col md={6} className="pt-4">
              <h3
                className="txt_blue text-left font-weight-bold "
                style={{ lineHeight: 1.5 }}
              >
                Make Your Life Easy <br /> with Intranet!
              </h3>
              <p className=" txt_blue">
                To make a workspace from scratch, please confirm your email
                address.
              </p>

              <div>
                <Form className="pt-4">
                  <Form.Group>
                    <Form.Label style={{ color: "gray" }}>
                      Email Address
                    </Form.Label>
                    <Form.Control
                      placeholder="name@email.com"
                      value={this.state.mobile}
                      onChange={(Text) =>
                        this.setState({ mobile: Text.target.value })
                      }
                    />
                  </Form.Group>
                  <Link to="/PersonalDetails">
                    <Button
                      onClick={this.onSignInSubmit}
                      className="mt-3"
                      style={{ backgroundColor: "#3bc163", border: 0 }}
                    >
                      Confirm Email
                    </Button>
                  </Link>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
