const _apiURL = "/api/reaction";

export const fetchReactions = () => {
    return fetch(_apiURL).then((res) => res.json());
};

export const fetchPostReactions = (id) => {
    return fetch(`/api/post/postreactions/${id}`).then((res) => res.json());
};

export const postReaction = (reaction) => {
    return fetch(_apiURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reaction)
    });
};

export const postPostReaction = (postReaction) => {
    return fetch(`${_apiURL}/postreact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postReaction)
    });
};

export const deletePostReaction = (postId, reactionId, userId) => {
    return fetch(`${_apiURL}/postreaction/${postId}/${reactionId}/${userId}`, {
        method: "DELETE"
    });
};