import Axios from "axios";
import qs from "qs"; 

const axios = Axios.create({
    baseURL: process.env.REACT_APP_BASE_URL, //'http://localhost:3000/',
    withCredentials: true, // this prevents cors errors, they also could have called it 'withCors'
    headers: { 'content-type': 'application/x-www-form-urlencoded' }
});

export const signup = (user)=>{
    debugger
    return axios({
        method: "POST",
        url: "signup",
        data: qs.stringify(user) // using qs to put the js object into the right format
    })
    .then((response)=> { 
        debugger       
        setUser(response.data);
    })
}

export const login = (user)=>{
    debugger
    return axios({
        method: "POST",
        url: "login",
        data: qs.stringify(user)
    })
    .then((response)=> {
        setUser(response.data);
    })
}

export const logout = () =>{
    debugger
    return axios
            .get("logout")
            .then(()=>{
                debugger
                clearUser();
            })
}

export const clearUser = () =>{
    debugger
    window.localStorage.removeItem("user");
}

export const userIsLoggedIn = () => getUser() ? true : false;

export const setUser = (user)=> {
    window.localStorage.setItem("user", JSON.stringify(user));
}

export const getUser = (user)=> {
    return JSON.parse(window.localStorage.getItem("user"));
}
