import { useEffect, useState } from "react";
import { fetchPosts } from "../../managers/postManager";
import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";
import ConfirmDeletePostModal from "./ConfirmDeletePostModal";
import { PostTagModalManager } from "./PostTagModalManager";

export const PostList = ({ loggedInUser }) => {
 const [posts, setPosts] = useState([]);
 const navigate = useNavigate();

 console.log(loggedInUser);
 async function getData() {
  fetchPosts().then(setPosts);
 }

 useEffect(() => {
  getData();
 }, []);

 if (posts.length < 1) {
  return "";
 }
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
      {loggedInUser?.roles.includes("Admin") ? (
       <ConfirmDeletePostModal post={p} getData={getData} />
      ) : (
       ""
      )}
     </div>
    ))}
   </div>
  </>
 );
};
