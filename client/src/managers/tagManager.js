const _apiURL = "/api/tag"

export const fetchTags = () => {
    return fetch(_apiURL)
        .then((res) => res.json());
};

export const fetchTag = (id) => {
    return fetch(`${_apiURL}/${id}`)
        .then((res) => res.json());
}

export const postTag = (tag) => {
    return fetch(_apiURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tag),
    }).then((res) => {res.json()});
};

export const putTag = (id, tag) => {
    return fetch(`${_apiURL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tag)
    });
};