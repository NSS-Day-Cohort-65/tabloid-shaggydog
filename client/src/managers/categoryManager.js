const _apiURL = "/api/category"

export const fetchCategories = () => {
    return fetch(_apiURL)
        .then((res) => res.json());
};

export const deleteCategory = (id) => {
    return fetch(`${_apiURL}/${id}`, {
        method: "DELETE"
    });
};