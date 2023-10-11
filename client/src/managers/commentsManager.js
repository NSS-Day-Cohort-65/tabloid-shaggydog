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

export const deleteComment = (comment) => {
 return fetch(`${_apiURL}/${comment.id}`, {
  method: "DELETE",
 });
};

export const postComment = (comment) => {
 return fetch(_apiURL, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(comment),
 });
};

export const editComment = (id, newCommentInformation) => {
 return fetch(`${_apiURL}/${id}`, {
  method: "PUT",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(newCommentInformation),
 });
};
