import { useParams } from "react-router-dom";
import { fetchSinglePost } from "../../managers/postManager";
import { useEffect, useState } from "react";
import { PostTagModalManager } from "./PostTagModalManager";

export const PostDetails = ({ loggedInUser }) => {
 const { id } = useParams();
 const [post, setPost] = useState();

 const getPostById = () => {
  fetchSinglePost(parseInt(id)).then(setPost);
 };
 console.log(loggedInUser);
 useEffect(() => {
  getPostById();
 }, []);

 if (!post) {
  return ``;
 }

 return (
  <>
   <h2>{post.title}</h2>
   <img src={post.imageLocation} width={250} height={300}></img>
   <p>{post.content}</p>
   <p>
    Published: {post.publishDateTime}, Author: {post.userProfile.userName}
   </p>
   {loggedInUser?.id === post?.userProfileId ? (
    <PostTagModalManager post={post} />
   ) : (
    ""
   )}
  </>
 );
}; //do the details of a post, should have everything you need here
