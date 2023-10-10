import { useEffect, useState } from "react";
import { fetchPosts } from "../../managers/postManager";

export const MyPosts = ({loggedInUser}) => {
    const [posts, setPosts] = useState()

    useEffect(() => {
        fetchPosts().then((allPosts) => {
            const userPosts = allPosts.filter(post => post.userProfileId == loggedInUser.id)
            const orderedUserPosts = userPosts.sort((a, b) => {
                return new Date(b.createDateTime) - new Date(a.createDateTime);
            })
            setPosts(orderedUserPosts)
        })
    }, []
    )

    if (!posts) {
        return null
    }

    return (
        <>
         <h1>My Posts</h1>
      
         <div id="postListContainer">
          {
            posts.map((p) => (
            <div key={p.id} className="postContainer">
                <h3>{p.title}</h3>
                <h5>Category: {p.category.name}</h5>
                <p>Created: {p.createDateTime.split("T")[0]}</p>
                <p>Author: {p.userProfile.fullName}</p>
            </div>
            ))
          }
         </div>
        </>
       );
}