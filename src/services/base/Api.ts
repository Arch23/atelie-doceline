import axios from "axios";
import store from "@/store/index";

const Api = axios.create({
    baseURL: "https://localhost:44368/api",
    timeout: 1000,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
});

Api.interceptors.request.use(
    function(config) {
        store.dispatch("beginLoading");
        return config;
    },
    function(err) {
        return Promise.reject(err);
    }
);

Api.interceptors.response.use(
    function(response) {
        store.dispatch("endLoading");
        return response;
    },
    function(err) {
        return Promise.reject(err);
    }
);

export default Api;
