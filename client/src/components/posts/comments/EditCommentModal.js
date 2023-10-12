import {
 Button,
 Form,
 FormFeedback,
 FormGroup,
 Input,
 InputGroup,
 Label,
 Modal,
 ModalHeader,
 ModalBody,
 ModalFooter,
} from "reactstrap";
import { useState } from "react";
import { editComment } from "../../../managers/commentsManager";

function EditCommentModal({ comment, getAllComments }) {
 const [modal, setModal] = useState(false);
 const [commentSubject, setCommentSubject] = useState("");
 const [commentContent, setCommentContent] = useState("");
 const [subjectError, setSubjectError] = useState(false);
 const [contentError, setContentError] = useState(false);

 const toggle = () => setModal(!modal);

 const handleSubmit = () => {
  if (!commentSubject) {
   setSubjectError(true);
  } else if (!commentContent) {
   setContentError(true);
  } else {
   const updatedComment = {
    subject: commentSubject,
    content: commentContent,
   };

   editComment(comment.id, updatedComment).then(() => {
    setCommentSubject("");
    setCommentContent("");
    getAllComments();
    toggle();
   });
  }
 };

 return (
  <div>
   <Button color="info" onClick={toggle}>
    Edit Comment
   </Button>
   <Modal isOpen={modal} toggle={toggle}>
    <ModalHeader toggle={toggle}>Edit Your Comment!</ModalHeader>
    <ModalBody>
     <div className="newCommentForm">
      <Form>
       <FormGroup>
        <Label htmlFor="newCommentSubject">Subject:</Label>
        <InputGroup style={{ width: "15rem" }}>
         <Input
          type="text"
          name="newCommentSubject"
          invalid={subjectError}
          onChange={(e) => {
           setCommentSubject(e.target.value);
          }}
         />
         {subjectError ? (
          <FormFeedback>Subject can't be blank</FormFeedback>
         ) : (
          ""
         )}
        </InputGroup>
       </FormGroup>
       <FormGroup>
        <Label htmlFor="newCommentContent">Add a comment</Label>
        <InputGroup>
         <Input
          type="text"
          name="newCommentContent"
          invalid={contentError}
          onChange={(e) => {
           setCommentContent(e.target.value);
          }}
         />
         {contentError ? (
          <FormFeedback>Comment content can't be blank</FormFeedback>
         ) : (
          ""
         )}
        </InputGroup>
       </FormGroup>
      </Form>
     </div>
    </ModalBody>
    <ModalFooter>
     <Button color="primary" onClick={handleSubmit}>
      Confirm Changes
     </Button>{" "}
     <Button color="secondary" onClick={toggle}>
      Cancel Changes
     </Button>
    </ModalFooter>
   </Modal>
  </div>
 );
}

export default EditCommentModal;
