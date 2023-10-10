const _apiURL = "/api/tag";

export const fetchTags = () => {
 return fetch(_apiURL).then((res) => res.json());
};

export const postTag = (tag) => {
 return fetch(_apiURL, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(tag),
 }).then((res) => {
  res.json();
 });
};

export const postPostTag = (postTag) => {
 return fetch(`/api/postTag`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(postTag),
 }).then((res) => {
  res.json();
 });
};
