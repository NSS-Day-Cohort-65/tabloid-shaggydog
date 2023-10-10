const _apiURL = "/api/comment";

export const fetchComments = () => {
    return fetch(_apiURL).then((res) => res.json());
};

export const fetchComment = (id) => {
    return fetch(`${_apiURL}/${id}`).then((res) => res.json());
};

export const fetchCommentsByPost = (postId) => {
    return fetch(`${_apiURL}/post/${postId}`).then((res) => res.json());
};