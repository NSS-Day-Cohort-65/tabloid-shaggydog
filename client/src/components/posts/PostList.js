import { useEffect, useState } from "react";
import { fetchPosts, unApprovePost } from "../../managers/postManager";
import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";
import ConfirmDeletePostModal from "./ConfirmDeletePostModal";
import { PostTagModalManager } from "./PostTagModalManager";
import { ReactComponent as CommentsIcon } from "../../svg/commentsIcon.svg";
import { getProfiles } from "../../managers/userProfileManager";

export const PostList = ({ loggedInUser }) => {
 const [users, setUsers] = useState([]);
 const [posts, setPosts] = useState([]);
 const [filteredPosts, setFilteredPosts] = useState([]);
 const navigate = useNavigate();

 /*  console.log(loggedInUser); */
 async function getData() {
  fetchPosts().then(setPosts);
  getProfiles().then(setUsers);
 }
 //get original post data
 useEffect(() => {
  getData();
 }, []);
 // once posts are gotten default the filtered posts to posts.
 useEffect(() => {
  setFilteredPosts(posts);
 }, [posts]);

 const handleUnApproveButton = (id) => {
  unApprovePost(id).then(() => {
   getData();
  });
 };

 const handleSelectUser = (e) => {
  e.preventDefault();
  console.log(e.target.value);
  if (e.target.value === "default") {
   setFilteredPosts(posts);
   return;
  }
  setFilteredPosts(posts.filter((p) => p.userProfileId == e.target.value));
 };
 if (!posts || !users) return;
 return (
  <>
   <h1>Post List</h1>
   <h5>Filter By User</h5>
   <select onChange={handleSelectUser}>
    <option disabled selected>
     Select A User
    </option>
    <option value={"default"}>View All Posts</option>
    {users.map((user) => {
     return <option value={user.id}>{user.fullName}</option>;
    })}
   </select>
   <div id="postListContainer">
    {filteredPosts.map((p) => (
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
       <div>
        <CommentsIcon />
        <Button
         color="info"
         onClick={() => {
          navigate(`/posts/${p.id}/comments`);
         }}
        >
         View Comments
        </Button>
       </div>
       {loggedInUser?.roles.includes("Admin") ? (
        <>
         <ConfirmDeletePostModal post={p} getData={getData} />
         <Button
          color="danger"
          onClick={() => {
           handleUnApproveButton(p.id);
          }}
         >
          UnApprove
         </Button>
        </>
       ) : (
        ""
       )}
      </div>
     </div>
    ))}
   </div>
  </>
 );
};
