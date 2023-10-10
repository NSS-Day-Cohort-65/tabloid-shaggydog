import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { fetchSinglePost } from "../../../managers/postManager";
import { fetchCommentsByPost } from "../../../managers/commentsManager";

export const PostComments = () => {
    const [post, setPost] = useState();
    const [comments, setComments] = useState();

    const { id } = useParams();


    const getAllComments = () => {
        fetchCommentsByPost(id).then(setComments);
    }

    useEffect(
        () => {
            fetchSinglePost(id).then(setPost).then(getAllComments);
        },
        []
    )

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
                    <div className="comment" key={c.id}>
                        <h3>{c.subject}</h3>
                        <p>{c.userProfile.fullName}: {c.content}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}