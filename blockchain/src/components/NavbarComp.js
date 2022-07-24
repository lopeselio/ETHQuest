import React, { Component } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import ShowImage from "./ShowImage";
import UploadImage from "./UploadImage";


import Profile from "./Forum"
import Modal from "./Modal";
import './Navbar.css'

export default class NavbarComp extends Component {
  render() {
    let Img = this.props.selectedImg;
    const renderModal = () => {
      if (Img) {
        return (
          <Modal
            setselectedImg={this.props.setselectedImg}
            selectedImg={this.props.selectedImg}
          />
        );
      }
    };

    return (
      <Router>
        <div>
          <Navbar fixed="top" bg="light" variant={"light"} expand="lg">
            <Navbar.Brand>
            🎨
            </Navbar.Brand>
            <Navbar.Brand as={Link} to={"/"}>
              ETHQuest Creator's Space
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse>
              <Nav>
                <Nav.Link as={Link} to={"/feed"}>
                  Feed
                </Nav.Link>
                <Nav.Link as={Link} to={"/post"}>
                  Post
                </Nav.Link>
                {/* <Nav.Link as={Link} to={"/profile"}>
                  Profile
                </Nav.Link> */}
              </Nav>
            </Navbar.Collapse>
            <ul className='navbar-nav px-3'>
            <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
              <small ><span className='textWhite' id='account'> {this.props.account}</span></small>
            </li>
          </ul>
          </Navbar>
        </div>
            
        

        <div>
          <Switch>
            {/* <Route exact path="/">
              <Main />
            </Route> */}
            <Route path="/feed">
              <div>
                <ShowImage
                  images={this.props.images}
                  tipImageOwner={this.props.tipImageOwner}
                  setselectedImg={this.props.setselectedImg}
                  openModal={this.props.openModal}
                  unsortView={this.props.unsortView}
                  sortView={this.props.sortView}
                />
                {renderModal()}
              </div>
            </Route>
            <Route path="/post">
              <UploadImage
                captureFile={this.props.captureFile}
                uploadImage={this.props.uploadImage}
              />
            </Route>
            {/* <Route path="/profile" exact component={Profile} /> */}
              {/* <div>
                Welcome to the Chat Forum 
                <br />
                <br />
                <br />
                <br />
              </div> */}
          </Switch>
        </div>
      </Router>
    );
  }
}