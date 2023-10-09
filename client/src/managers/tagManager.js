const _apiURL = "/api/tag"

export const fetchTags = () => {
    return fetch(_apiURL)
        .then((res) => res.json());
};