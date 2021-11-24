import axios from "axios";

// export const apiURL = "https://hx17e.ciroue.com/api";
// export const apiURL = "https://39duw.ciroue.com/api";
//export const apiURL = "http://laravel-notebook.test/api";
export const apiURL = "https://apinotebook.nordicstandard.net/api";

const initAxios = () => {
  return axios.create({
    baseURL: apiURL,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("userToken")
    },
    timeout: 6000
  });
};

export const get = (url, user_id = null) => {
  const axios = initAxios();
  const currentURL = user_id ? "?user=" + user_id : "";
  return axios.get(url + currentURL);
};

export const post = (url, params = null, user_id = null) => {
  const axios = initAxios();
  return axios.post(url, params);
};

export const destroy = (url, params = null, user_id = null) => {
  const axios = initAxios();
  return axios.delete(url, params);
};

export const redirectAfterLogin = "/dashboard";
