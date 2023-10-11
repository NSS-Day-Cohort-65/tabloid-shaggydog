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

export const deactivateProfile = (id) => {
  return fetch(`${_apiUrl}/deactivate/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
  });
};

export const activateProfile = (id) => {
  return fetch(`${_apiUrl}/activate/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
  });
};