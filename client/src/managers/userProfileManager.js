const _apiUrl = "/api/userprofile";

export const getProfiles = () => {
 return fetch(_apiUrl + "/withroles").then((res) => res.json());
};

export const getDeactivatedProfiles = () => {
 return fetch(_apiUrl + "/deactivated").then((res) => res.json());
};

export const getProfile = (id) => {
 return fetch(_apiUrl + `/${id}`).then((res) => res.json());
};

export const getProfileAndRoles = (id) => {
 return fetch(`${_apiUrl}/withroles/${id}`).then((res) => res.json());
};

export const promoteProfile = (id) => {
 return fetch(`${_apiUrl}/promote/${id}`).then((res) => res.json());
};

export const demoteProfile = (id) => {
 return fetch(`${_apiUrl}/demote/${id}`).then((res) => res.json());
};

export const editProfile = (profile) => {
 return fetch(`${_apiUrl}/${profile.id}`, {
  method: "PUT",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(profile),
 });
};

export const deactivateProfile = (id) => {
 return fetch(`${_apiUrl}/deactivate/${id}`, {
  method: "PUT",
  headers: {
   "Content-Type": "application/json",
  },
 });
};

export const activateProfile = (id) => {
 return fetch(`${_apiUrl}/activate/${id}`, {
  method: "PUT",
  headers: {
   "Content-Type": "application/json",
  },
 });
};

export const updateProfileImage = (id, imgLocation) => {
 console.log(JSON.stringify(imgLocation));
 return fetch(`${_apiUrl}/updateImage/${id}`, {
  method: "PUT",
  headers: {
   "Content-Type": "application/json",
  },
  body: JSON.stringify(imgLocation),
 });
};
