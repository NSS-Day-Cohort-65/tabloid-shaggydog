const _apiURL = "/api/reaction";

export const fetchReactions = () => {
    return fetch(_apiURL).then((res) => res.json());
};

export const postReaction = (reaction) => {
    return fetch(_apiURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reaction)
    });
};