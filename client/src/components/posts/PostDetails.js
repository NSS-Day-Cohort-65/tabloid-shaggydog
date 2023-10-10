import { useParams } from "react-router-dom"
import { fetchSinglePost } from "../../managers/postManager";
import { useEffect, useState } from "react";


export const PostDetails = () => {
    const {id} = useParams();
    const [post, setPost] = useState();

    const getPostById = () => {
        fetchSinglePost(parseInt(id)).then(setPost)
    }

    useEffect(() => {
        getPostById();
    }, []);

    if (!post) {
        return ``
    }

    return (
        <>
            <h2>{post.title}</h2>
            <img src={post.imageLocation} width={250} height={300}></img>
            <p>{post.content}</p>
            <p>Published: {post.publishDateTime}, Author: {post.userProfile.userName}</p>

        </>
    )
}//do the details of a post, should have everything you need here