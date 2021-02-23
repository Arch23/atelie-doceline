import axios from "axios";
import store from "@/store/index"

export default function setup() {
    axios.interceptors.request.use(function(config) {      
        debugger;  
        store.dispatch("beginLoading");
        return config;
    }, function(err) {
        return Promise.reject(err);
    });

    axios.interceptors.response.use(function(response) {
        store.dispatch("endLoading");
        return response;
    }, function(err) {
        return Promise.reject(err);
    })
}