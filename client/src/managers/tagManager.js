const _apiURL = "/api/tag"

export const fetchTags = () => {
    return fetch(_apiURL)
        .then((res) => res.json());
};

export const postTag = (tag) => {
    return fetch(_apiURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tag),
    }).then((res) => { res.json() });
};

export const deleteTag = (id) => {
    return fetch(`${_apiURL}/${id}`, {
        method: "DELETE"
    });
};