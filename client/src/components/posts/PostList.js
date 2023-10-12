import { useEffect, useState } from "react";
import { fetchPosts, unApprovePost } from "../../managers/postManager";
import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";
import ConfirmDeletePostModal from "./ConfirmDeletePostModal";
import { PostTagModalManager } from "./PostTagModalManager";
import { ReactComponent as CommentsIcon } from "../../svg/commentsIcon.svg";
import { getProfiles } from "../../managers/userProfileManager";
import { fetchCategories } from "../../managers/categoryManager";
import { fetchTags } from "../../managers/tagManager";

export const PostList = ({ loggedInUser }) => {
 const [users, setUsers] = useState([]);
 const [posts, setPosts] = useState([]);
 const [categories, setCategories] = useState([]);
 const [filteredPosts, setFilteredPosts] = useState([]);
 const [filterOptions, setFilterOptions] = useState(0);
 const [tags, setTags] = useState([]);

 const navigate = useNavigate();

 /*  console.log(loggedInUser); */
 async function getData() {
  fetchPosts().then(setPosts);
  getProfiles().then(setUsers);
  fetchCategories().then(setCategories);
  fetchTags().then(setTags);
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

 const handleSelectCategory = (e) => {
  e.preventDefault();
  console.log(e.target.value);
  if (e.target.value === "default") {
   setFilteredPosts(posts);
   return;
  }
  setFilteredPosts(posts.filter((p) => p.categoryId == e.target.value));
 };

 const handleSelectTag = (e) => {
  e.preventDefault();
  console.log(e.target.value);
  if (e.target.value === "default") {
   setFilteredPosts(posts);
   return;
  }
  setFilteredPosts(
   posts.filter((p) => p.postTags.find((pt) => pt.tagId == e.target.value))
  );
 };

 if (!posts || !users || !tags || !categories) return;
 return (
  <>
   <h1>Post List</h1>
   <h5>Filter Options</h5>
   <select
    onChange={(e) => {
     setFilterOptions(parseInt(e.target.value));
    }}
   >
    <option value={0}>Filter By Users</option>
    <option value={1}>Filter By Category</option>
    <option value={2}>Filter By Tags</option>
   </select>

   {filterOptions === 0 ? (
    <>
     <h5>Filter By User</h5>
     <select onChange={handleSelectUser}>
      <option disabled defaultValue>
       Select A User
      </option>
      <option value={"default"}>View All Posts</option>
      {users.map((user) => (
       <option key={user.id} value={user.id}>
        {user.fullName}
       </option>
      ))}
     </select>
    </>
   ) : filterOptions === 1 ? (
    <>
     <h5>Filter By Category</h5>
     <select onChange={handleSelectCategory}>
      <option disabled defaultValue>
       Select A Category
      </option>
      <option value={"default"}>View All Posts</option>
      {categories.map((c) => (
       <option key={c.id} value={c.id}>
        {c.name}
       </option>
      ))}
     </select>
    </>
   ) : filterOptions === 2 ? (
    <>
     <h5>Filter By Tag</h5>
     <select onChange={handleSelectTag}>
      <option disabled selected>
       Select A Tag
      </option>
      <option value={"default"}>View All Posts</option>
      {tags.map((tag) => {
       return <option value={tag.id}>{tag.name}</option>;
      })}
     </select>
    </>
   ) : null}

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
