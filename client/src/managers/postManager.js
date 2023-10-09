const _apiURL = "/api/post";

export const fetchPosts = () => {
 return fetch(_apiURL).then((res) => res.json());
};
