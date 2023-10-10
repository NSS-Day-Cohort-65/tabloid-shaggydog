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

