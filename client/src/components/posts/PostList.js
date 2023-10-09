import { useEffect, useState } from "react";
import { fetchPosts } from "../../managers/postManager";

export const PostList = () => {
 const [posts, setPosts] = useState([]);

 async function getData() {
  fetchPosts().then(setPosts);
 }

 useEffect(() => {
  getData();
  console.log(posts);
 }, []);

 useEffect(() => {
  console.log(posts);
 }, [posts]);

 if (posts.length < 1) {
  return "";
 }
 return (
  <>
   <h1>Post List</h1>

   <div id="postListContainer">
    {posts.map((p) => (
     <div key={p.id} className="postContainer">
      <h3>{p.title}</h3>
      <h5>Category: {p.category.name}</h5>

      <p>Published: {p.publishDateTime.split("T")[0]}</p>
      <p>Author: {p.userProfile.fullName}</p>
     </div>
    ))}
   </div>
  </>
 );
};
