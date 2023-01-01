import axios, { Axios } from "axios"


export const API  = axios.create({


    baseURL : "https://apidwtour.tamaya.my.id/api/v1",

})

export const setAuthToken = (token) => {
    if (token) {
        API.defaults.headers.common["Authorization"] = `Bearer ${token}`

    }else {
        delete API.defaults.headers.common["Authorization"]
    }
}