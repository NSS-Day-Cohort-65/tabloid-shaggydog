import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { deleteComment } from "../../../managers/commentsManager";

function ConfirmDeleteCommentModal({ comment, getAllComments }) {
 const [modal, setModal] = useState(false);

 const toggle = () => setModal(!modal);

 const handleDeleteButton = () => {
  deleteComment(comment)
   .then(() => {
    getAllComments();
   })
   .then(toggle);
 };

 return (
  <div>
   <Button color="danger" onClick={toggle}>
    Delete Comment
   </Button>
   <Modal isOpen={modal} toggle={toggle}>
    <ModalHeader toggle={toggle}>Confirm Delete</ModalHeader>
    <ModalBody>Are You Sure You Want To Delete This Comment?</ModalBody>
    <ModalFooter>
     <Button color="danger" onClick={handleDeleteButton}>
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

export default ConfirmDeleteCommentModal;
