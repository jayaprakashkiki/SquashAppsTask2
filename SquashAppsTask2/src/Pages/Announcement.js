import React, { Component } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Image,
  Modal,
  Nav,
  Navbar,
  Row,
  Toast,
} from "react-bootstrap";
import { CgMenuRight } from "react-icons/cg";
import { HiOutlineSpeakerphone } from "react-icons/hi";
import { BiLogOutCircle } from "react-icons/bi";
import { FaRegCommentDots } from "react-icons/fa";
import { Link } from "react-router-dom";
//Database
import firebase from "../Database/Firebase";

export default class Announcement extends Component {
  constructor() {
    super();
    //Database
    this.dbUser = firebase.firestore().collection("User");
    this.dbPost = firebase.firestore().collection("Post");
    this.dbPostGet = firebase
      .firestore()
      .collection("Post")
      .orderBy("timestamp", "desc");

    this.state = {
      //SideNav
      width: 0,
      title_pad: 20,
      modal: false,
      //ModalForm
      subject: "",
      category: "",
      description: "",
      notify: "",
      //ModalComment
      modalComment: false,
      //userDetails
      fName: "",
      lName: "",
      email: "",
      //Toast
      toast: false,
      //announceData
      announceData: [],
      // commentData
      subjectComment: "",
      descriptionComment: "",
      fNameComment: "",
      lNameComment: "",
      //CommentInput
      commentInput: "",
      announcID: "",
      // commentFinalData
      commentFinalData: [],
      //Search
      SearchData: [],
      SearchWord: "",
    };
  }

  componentDidMount() {
    this.GetUser();
    this.GetPost();
  }

  // ******************** Getting User Info ************************
  GetUser = async () => {
    console.log("get called");
    const USER_ID = localStorage.getItem("USER_ID");
    this.dbUser
      .doc(`${USER_ID}`)
      .get()
      .then((snapshot) => {
        this.setState({
          fName: snapshot.data().fName,
          lName: snapshot.data().lName,
          email: snapshot.data().email,
        });
      })
      .catch((err) => {
        console.log("ERROR SPOT!", err);
      });
  };

  // ******************** Getting Posted Data ************************
  GetPost = () => {
    const myArray = [];
    this.dbPostGet
      .get()
      .then((snapshot) => {
        snapshot.forEach((item) => {
          console.log(item.data());
          const {
            subject,
            fName,
            lName,
            description,
            date,
            timestamp,
          } = item.data();
          const docId = item.id;
          myArray.push({
            subject,
            fName,
            lName,
            description,
            docId,
            date,
            timestamp,
          });
        });
        this.setState({
          announceData: myArray,
          SearchData: myArray,
        });
      })
      .catch((err) => {
        console.log("ERROR SPOT !", err);
      });
  };

  // ******************** Post Handler ************************
  Post = () => {
    const timestamp = Date.now();
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();

    const date = dd + "/" + mm + "/" + yyyy;

    this.dbPost
      .add({
        subject: this.state.subject,
        category: this.state.category,
        description: this.state.description,
        notify: this.state.notify,
        fName: this.state.fName,
        lName: this.state.lName,
        email: this.state.email,
        timestamp: timestamp,
        date: date,
      })
      .then(() => {
        console.log("Posted");
        this.setState({
          toast: true,
          modal: false,
          //ModalForm
          subject: "",
          category: "",
          description: "",
          notify: "",
          //userDetails
          fName: "",
          lName: "",
          email: "",
        });
        this.GetPost();
      })
      .catch((err) => {
        console.log("ERROR SPOT !", err);
      });
  };

  // ******************** To open a navigation ************************
  openNav = () => {
    this.setState({
      width: 250,
      title_pad: 250,
    });
  };
  // ******************** To close a navigation ************************

  closeNav = () => {
    this.setState({
      width: 0,
      title_pad: 20,
    });
  };

  // ******************** Opening Comments Modal ************************

  ModalComment = (item) => {
    const ID = item.docId;
    this.setState({
      modalComment: true,
      AannouncID: item,
    });
    console.log(ID);
    this.dbPost
      .doc(`${ID}`)
      .get()
      .then((snapshot) => {
        console.log(snapshot.data());
        this.setState({
          subjectComment: snapshot.data().subject,
          descriptionComment: snapshot.data().description,
          fNameComment: snapshot.data().fName,
          lNameComment: snapshot.data().lName,
          idComment: ID,
        });
        this.dbPost
          .doc(`${this.state.idComment}`)
          .get()
          .then((snapshot) => {
            this.setState({
              commentFinalData: snapshot.data().comments,
            });
          })
          .catch((err) => {
            console.log("ERROR SPOT !", err);
          });
      })
      .catch((err) => {
        console.log("ERROR SPOT !", err);
      });
  };

  // ******************** Posting Comment ************************

  PostComment = () => {
    console.log(this.state.idComment);
    this.dbPost
      .doc(`${this.state.idComment}`)
      .update({
        comments: firebase.firestore.FieldValue.arrayUnion(
          this.state.commentInput
        ),
      })
      .then(() => {
        this.setState({
          commentInput: "",
        });
        console.log("Comment Posted");
      })
      .catch((err) => {
        console.log("ERROR SPOT !", err);
      });
  };

  // ******************** Logout Handler ************************

  async Logout() {
    await localStorage.removeItem("USER_ID");
    this.props.history.push("/");
  }

  // ******************** Search Handler ************************

  Search(text) {
    const finalData = this.state.SearchData.filter((item) => {
      const itemData = item.subject
        ? item.subject.toLowerCase()
        : "".toLowerCase();
      const textData = text.toLowerCase();
      return itemData.indexOf(textData) > -1;
    });
    console.log(finalData);

    this.setState({
      announceData: finalData,
      SearchWord: text,
    });
  }

  render() {
    return (
      <div>
        {/* ******************** Side Nav ************************ */}
        <div
          id="mySidenav"
          class="sidenav myfont"
          style={{ width: this.state.width }}
        >
          <a
            href="javascript:void(0)"
            class="closebtn"
            onClick={() => this.closeNav()}
            href="#"
            className="txt_green"
            style={{
              backgroundColor: "#233D51",
              fontWeight: "bold",
              fontSize: 20,
            }}
          >
            SA-INTRANET
            <CgMenuRight size={30} style={{ float: "right" }} color="gray" />
          </a>

          <Button
            className="m-3 text-left"
            size="sm"
            variant="success"
            style={{ border: 0, borderRadius: 4 }}
          >
            <a href="#">
              <HiOutlineSpeakerphone size={18} />
              <span className="pl-3 span ">Announcement</span>
            </a>
          </Button>

          <Button
            className="m-3 text-left"
            size="sm"
            variant="link"
            style={{ border: 0, borderRadius: 4 }}
            onClick={() => this.Logout()}
          >
            <a href="#">
              <BiLogOutCircle size={18} />
              <span className="pl-3 span ">Log out</span>
            </a>
          </Button>
        </div>

        {/* ******************** Navigation ************************ */}

        <Navbar className="bg_white shadow-sm">
          <Navbar.Brand className="txt_green my_font ">
            <span style={{ cursor: "pointer" }} onClick={() => this.openNav()}>
              <CgMenuRight size={30} color="#284255" />
            </span>
            <span className="txt_blue" style={{ paddingLeft: 20 }}>
              Announcement
            </span>
          </Navbar.Brand>
        </Navbar>

        {/* ******************** Main View Port ************************ */}

        <div>
          <Container fluid className="bg_gray">
            <Row>
              <Col>
                <div className="p-3 d-flex flex-row float-right">
                  <div className="pr-3">
                    <Form.Control
                      placeholder="Search.."
                      value={this.state.SearchWord}
                      onChange={(Text) => this.Search(Text.target.value)}
                    />
                  </div>
                  <div>
                    <Button
                      onClick={() => this.setState({ modal: true })}
                      variant="success"
                    >
                      + Add
                    </Button>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>

        <div>
          <Container
            fluid
            className="bg_gray"
            style={{ height: window.innerHeight }}
          >
            <Row className="bg_gray">
              <Col>
                {this.state.announceData &&
                  this.state.announceData.map((item, index) => {
                    return (
                      <Card
                        as="button"
                        onClick={() => this.ModalComment(item)}
                        key={index}
                        className="m-3"
                        style={{ border: 0, borderColor: "white" }}
                      >
                        <div className="d-flex flex-row">
                          <div>
                            <Card.Body>
                              <div className="d-flex flex-row justify-content-between">
                                <div>
                                  <Card.Title className="text-left">
                                    {item.subject}{" "}
                                  </Card.Title>
                                </div>
                                <div>
                                  <p
                                    className="text-right"
                                    style={{ color: "gray" }}
                                  >
                                    <FaRegCommentDots size={22} color="gray" />{" "}
                                    <sub>3</sub> &nbsp; &nbsp;{" "}
                                    <span>{item.date}</span>
                                  </p>
                                </div>
                              </div>
                              <p className="text-left">{item.description}</p>
                            </Card.Body>
                          </div>
                        </div>
                      </Card>
                    );
                  })}
              </Col>
            </Row>
          </Container>
        </div>

        {/* *******************Add Announcement From Modal******************* */}
        <div>
          <Modal
            size="md"
            show={this.state.modal}
            onHide={() => this.setState({ modal: false })}
          >
            <Modal.Header closeButton>
              <p className="font-weight-bold">Add New Announcement</p>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group>
                  <Form.Label>Subject</Form.Label>
                  <Form.Control
                    placeholder=""
                    value={this.state.subject}
                    onChange={(Text) =>
                      this.setState({ subject: Text.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlSelect1">
                  <Form.Label>Select Category</Form.Label>
                  <Form.Control
                    as="select"
                    value={this.state.category}
                    onChange={(Text) =>
                      this.setState({ category: Text.target.value })
                    }
                  >
                    <option value="Announcement">Announcement</option>
                    <option value="Event">Event</option>
                    <option value="Remainder">Remainder</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows="2"
                    placeholder=""
                    value={this.state.description}
                    onChange={(Text) =>
                      this.setState({ description: Text.target.value })
                    }
                  />
                </Form.Group>

                <Form.Group controlId="exampleForm.ControlSelect1">
                  <Form.Label>Notify To</Form.Label>
                  <Form.Control
                    as="select"
                    value={this.state.notify}
                    onChange={(Text) =>
                      this.setState({ notify: Text.target.value })
                    }
                  >
                    <option value="To All Members">To All Members</option>
                    <option value="Choose Persons">Choose Persons</option>
                    <option value="Choose Departments/Role">
                      Choose Departments/Role
                    </option>
                  </Form.Control>
                </Form.Group>
              </Form>
              <div className="d-flex flex-row float-right pt-3 mb-4">
                <div>
                  <Button
                    onClick={() => this.setState({ modal: false })}
                    variant="light"
                    style={{ width: 100, marginRight: 20 }}
                  >
                    Discard
                  </Button>
                </div>
                <div>
                  <Button
                    onClick={() => this.Post()}
                    variant="success"
                    style={{ width: 100 }}
                  >
                    Select
                  </Button>
                </div>
              </div>
            </Modal.Body>
          </Modal>

          {/* ************************ Comment Modal *************************** */}
          <Modal
            show={this.state.modalComment}
            onHide={() => this.setState({ modalComment: false })}
          >
            <Modal.Header closeButton>Comment</Modal.Header>
            <Modal.Body>
              <div>
                <strong>{this.state.subjectComment}</strong>
                <p>
                  <em>
                    {this.state.fNameComment} {this.state.lNameComment}
                  </em>
                </p>
                <p>{this.state.descriptionComment}</p>
              </div>
              <div>
                <Form>
                  <Form.Group>
                    <Form.Control
                      type="text"
                      placeholder="comment..."
                      onChange={(Text) =>
                        this.setState({ commentInput: Text.target.value })
                      }
                      value={this.state.commentInput}
                    />
                  </Form.Group>
                  <Button
                    onClick={() => this.PostComment()}
                    variant="success"
                    size="sm"
                  >
                    Send
                  </Button>
                </Form>
              </div>
              <div className="pt-3">
                <p style={{ color: "gray" }}>
                  <em>Comments</em>
                </p>
                {this.state.commentFinalData &&
                  this.state.commentFinalData.map((item, index) => {
                    return (
                      <div key={index}>
                        <p>➙ {item}</p>
                      </div>
                    );
                  })}
              </div>
            </Modal.Body>
          </Modal>

          {/* ******************* Success Toast ******************* */}

          <Toast
            delay={2000}
            show={this.state.toast}
            autohide
            onClose={() => this.setState({ toast: false })}
            className="bg-success"
            style={{
              position: "absolute",
              top: 50,
              left: 0,
              margin: 20,
            }}
          >
            <Toast.Header className="bg-success">
              <strong className="mr-auto txt_white">SA-INTRANET</strong>
            </Toast.Header>
            <Toast.Body>
              <p className="txt_white">Announcement Posted !</p>
            </Toast.Body>
          </Toast>
        </div>
      </div>
    );
  }
}
