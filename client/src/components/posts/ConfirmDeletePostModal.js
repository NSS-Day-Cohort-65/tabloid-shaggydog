import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { deletePost } from "../../managers/postManager";

function ConfirmDeletePostModal({ post, getData }) {
 const [modal, setModal] = useState(false);

 const toggle = () => setModal(!modal);

 const handleDeleteButton = () => {
  deletePost(post)
   .then(() => {
    getData();
   })
   .then(toggle);
 };

 return (
  <div>
   <Button color="danger" onClick={toggle}>
    Delete
   </Button>
   <Modal isOpen={modal} toggle={toggle}>
    <ModalHeader toggle={toggle}>Confirm Delete</ModalHeader>
    <ModalBody>Are You Sure You Want To Delete This Post?</ModalBody>
    <ModalFooter>
     <Button color="danger" onClick={toggle}>
      Confirm Delete
     </Button>{" "}
     <Button color="secondary" onClick={toggle}>
      Cancel
     </Button>
    </ModalFooter>
   </Modal>
  </div>
 );
}

export default ConfirmDeletePostModal;
