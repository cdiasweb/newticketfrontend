import axios, { AxiosPromise, AxiosRequestConfig } from "axios";
import { resolveComponent } from "vue";

/**
 * Handling http requests with custom axios
 * @request Object with data and params to do the request
 * request.method = "POST", "GET", etc...
 * request.url = http://...
 */


function customAxios(request: AxiosRequestConfig): AxiosPromise<any> {

    if(!request.url || !request.method) {
        console.error("Deve informar uma URL e um método para fazer a requisição");
        return new Promise(() => {
            Promise.resolve("Deve informar uma URL e um método para fazer a requisição");
        });
    }

    const user = localStorage.getItem("user");
    let token = "";
    if(user) {
        token = JSON.parse(user).token;
    }
    return axios({
        headers: {
            "Authorization": `Bearer ${token}`
        },
        ...request
    });

}

export default customAxios;