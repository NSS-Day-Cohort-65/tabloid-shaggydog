const _apiURL = "/api/reaction";

export const fetchReactions = () => {
    return fetch(_apiURL).then((res) => res.json());
};