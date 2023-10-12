const _apiURL = "/api/post";

export const fetchPosts = () => {
 return fetch(_apiURL).then((res) => res.json());
};

export const fetchSinglePost = (id) => {
    return fetch(`${_apiURL}/${id}`).then((res) => res.json());
}

//delete post
export const deletePost = (post) => {
 return fetch(`${_apiURL}/${post.id}`, {
  method: "DELETE",
 });
};

//create a post
export const createPost = (post) => {
    return fetch(`${_apiURL}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(post)
    }).then((res) => res.json()
    )
}

export const editPost = (id, post) => {
    return fetch(`${_apiURL}/${id}/edit`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(post)
    })
}