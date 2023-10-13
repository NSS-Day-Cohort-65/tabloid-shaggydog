import React, { useState } from "react";
import { NavLink as RRNavLink } from "react-router-dom";
import {
 Button,
 Collapse,
 Nav,
 NavLink,
 NavItem,
 Navbar,
 NavbarBrand,
 NavbarToggler,
} from "reactstrap";
import { logout } from "../managers/authManager";
import ModalForPicture from "./ModalForPicture";

export default function NavBar({ loggedInUser, setLoggedInUser }) {
 const [open, setOpen] = useState(false);

 const toggleNavbar = () => setOpen(!open);

 return (
  <div>
   <Navbar color="light" light fixed="true" expand="lg">
    <NavbarBrand className="mr-auto" tag={RRNavLink} to="/">
     ✍️ Tabloid
    </NavbarBrand>
    {loggedInUser ? (
     <>
      <NavbarToggler onClick={toggleNavbar} />
      <Collapse isOpen={open} navbar>
       <Nav navbar>
        <NavItem>
         <NavLink tag={RRNavLink} to="/posts">
          Posts
         </NavLink>
        </NavItem>
        <NavItem>
         <NavLink tag={RRNavLink} to="/myposts">
          My Posts
         </NavLink>
        </NavItem>
        <NavItem>
         <NavLink tag={RRNavLink} to="/createpost">
          Make Poost
         </NavLink>
        </NavItem>
        {loggedInUser.roles.includes("Admin") && (
         <NavItem>
          <NavLink tag={RRNavLink} to="/userprofiles">
           User Profiles
          </NavLink>
         </NavItem>
        )}
        {loggedInUser.roles.includes("Admin") && (
         <NavItem>
          <NavLink tag={RRNavLink} to="/categories">
           Categories
          </NavLink>
         </NavItem>
        )}
        {loggedInUser.roles.includes("Admin") && (
         <NavItem>
          <NavLink tag={RRNavLink} to="/reactions">
           Reaction Management
          </NavLink>
         </NavItem>
        )}
        {loggedInUser.roles.includes("Admin") && (
         <NavItem>
          <NavLink tag={RRNavLink} to="/tags">
           Tag Management
          </NavLink>
         </NavItem>
        )}
        {loggedInUser.roles.includes("Admin") && (
         <NavItem>
          <NavLink tag={RRNavLink} to="/unapprovedPosts">
           Unapproved Posts
          </NavLink>
         </NavItem>
        )}
       </Nav>
      </Collapse>
      <ModalForPicture loggedInUser={loggedInUser} />
      <Button
       color="primary"
       onClick={(e) => {
        e.preventDefault();
        setOpen(false);
        logout().then(() => {
         setLoggedInUser(null);
         setOpen(false);
        });
       }}
      >
       Logout
      </Button>
      <img
       src={loggedInUser?.imageLocation}
       style={{ width: "50px", height: "50px" }}
      />
     </>
    ) : (
     <Nav navbar>
      <NavItem>
       <NavLink tag={RRNavLink} to="/login">
        <Button color="primary">Login</Button>
       </NavLink>
      </NavItem>
     </Nav>
    )}
   </Navbar>
  </div>
 );
}
