import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchSinglePost } from "../../../managers/postManager";
import { fetchCommentsByPost } from "../../../managers/commentsManager";
import { Button, Card, CardBody, Collapse } from "reactstrap";
import { NewComment } from "./NewComment";
import ConfirmDeleteCommentModal from "./confirmDeleteCommentModal";

export const PostComments = ({ loggedInUser }) => {
 const [post, setPost] = useState();
 const [comments, setComments] = useState();
 const [isOpen, setIsOpen] = useState(false);
 const toggle = () => setIsOpen(!isOpen);

 const { id } = useParams();

 const getAllComments = () => {
  fetchCommentsByPost(id).then(setComments);
 };

 useEffect(() => {
  fetchSinglePost(id).then(setPost).then(getAllComments);
 }, []);

 if (!post || !comments) return;

 return (
  <div className="postCommentsPageContainer">
   <div className="postPageHeader">
    <h3>{post.title}</h3>
    <h5>Category: {post?.category?.name}</h5>
    <p>Published: {post.publishDateTime.split("T")[0]}</p>
    <p>Author: {post.userProfile.fullName}</p>
   </div>
   <div className="postPageComments">
    {comments.map((c) => (
     <div
      className="comment"
      key={c.id}
      style={{ border: "1px solid black", margin: "5px", padding: "5px" }}
     >
      <h3>{c.subject}</h3>
      <p>
       {c.userProfile.fullName}: {c.content}
      </p>
      <p>
       <b>Posted on {c.createDateTime.split("T")[0]}</b>
       {loggedInUser.id == c.userProfileId ? (
        <ConfirmDeleteCommentModal
         getAllComments={getAllComments}
         comment={c}
        />
       ) : (
        ""
       )}
      </p>
     </div>
    ))}
    <Button color="primary" onClick={toggle} style={{ marginBottom: "1rem" }}>
     Add Comment
    </Button>
    <Collapse isOpen={isOpen}>
     <Card>
      <CardBody>
       <NewComment
        loggedInUser={loggedInUser}
        postObject={post}
        toggle={toggle}
        getAllComments={getAllComments}
       />
      </CardBody>
     </Card>
    </Collapse>
   </div>
  </div>
 );
};
