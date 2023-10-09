const _apiURL = "/api/category"

export const fetchCategories = () => {
    return fetch(_apiURL)
        .then((res) => res.json());
};