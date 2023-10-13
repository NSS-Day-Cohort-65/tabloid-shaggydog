const _apiURL = "/api/subscription";

export const fetchSubscriptions = () => {
    return fetch(_apiURL).then((res) => res.json());
};

export const fetchUserSubscriptions = (userId) => {
    return fetch(`${_apiURL}/user/${userId}`).then((res) => res.json());


};

export const createSubscription = (subscription) => {
    return fetch(_apiURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(subscription)
    });
};

export const endSubscription = (id) => {
    return fetch(`${_apiURL}/${id}`, {
        method: "PUT"
    });
};