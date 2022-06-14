import axios from "axios";
import {UserAuthenticationResponse} from "../store/AuthenticationContext";
import User from "../model/User";

const registerUrl = "http://localhost:8080/auth/register";
const loginUrl = "http://localhost:8080/auth/login";


export const loginUserApi = ( username: string, password: string) => {
    return axios
        .post<UserAuthenticationResponse>(loginUrl, {
            username: username,
            password: password,
        })
        .then((response) => {
            if (!response.data) throw new Error("Login failed: server did not return credentials.")
            return response.data
        })
}

export const registerUserApi = ( user : User ) => {
    return axios.post<UserAuthenticationResponse>(registerUrl, user)
        .then(function (response) {
            if (!response.data)
                throw new Error("Registration of new user failed.")
            return (response.data)
        })
}