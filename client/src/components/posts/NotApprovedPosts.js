import { useEffect, useState } from "react";
import {
 approvePost,
 fetchPosts,
 fetchUnapprovedPosts,
} from "../../managers/postManager";
import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";
import ConfirmDeletePostModal from "./ConfirmDeletePostModal";
import { PostTagModalManager } from "./PostTagModalManager";
import { ReactComponent as CommentsIcon } from "../../svg/commentsIcon.svg";

export const NotApprovedPosts = ({ loggedInUser }) => {
 const [posts, setPosts] = useState();
 const navigate = useNavigate();

 /*  console.log(loggedInUser); */
 async function getData() {
  fetchUnapprovedPosts().then(setPosts);
 }

 useEffect(() => {
  getData();
 }, []);

 useEffect(() => {
  console.log(posts);
  // setPosts(posts.filter((p) => p.isApproved === true));
 }, [posts]);

 if (!posts) return;

 if (posts.length < 1) {
  return "";
 }

 const handleApproveButton = (id) => {
  approvePost(id).then(() => {
   getData();
  });
 };

 return (
  <>
   <h1>Post List</h1>

   <div id="postListContainer">
    {posts.map((p) => (
     <div key={p.id} className="postContainer">
      <Button
       onClick={() => {
        navigate(`/posts/${p.id}`);
       }}
      >
       {p.title}
      </Button>
      <h5>Category: {p.category.name}</h5>
      <p>Published: {p.publishDateTime.split("T")[0]}</p>
      <p>Author: {p.userProfile.fullName}</p>
      <p>
       Tags :{" "}
       <div id="tagContainer">
        {p.postTags.map((pt) => (
         <p>
          <span>{pt.tag.name}</span>
         </p>
        ))}
       </div>
      </p>
      <div className="postFooter">
       <div></div>
       <Button
        color="primary"
        onClick={() => {
         handleApproveButton(p.id);
        }}
       >
        Approve Post
       </Button>
      </div>
     </div>
    ))}
   </div>
  </>
 );
};
