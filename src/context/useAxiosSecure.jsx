import axios from "axios"
import useAuth from "./useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const instance = axios.create({
    baseURL: 'http://localhost:3000'
});

const useAxiosSecure = () => {

    const {user, logOut} = useAuth();
    const navigate = useNavigate;

    useEffect(() => {

        const requestInterceptors = instance.interceptors.request.use(config => {
            config.headers.authorization = `Bearer ${user.accessToken}`;
            return config;
        });

        // response interceptors
        const responseInterceptors = instance.interceptors.response.use(res => {
            return res;
        }, err => {
            const status = err.response?.status;
            if (status === 401) {
                console.log("Unauthorized! Logging out...");
                logOut()
                    .then(() => {
                        navigate('/login')
                    });
            } else if (status === 403) {
                console.log("Forbidden access!");
                logOut()
                    .then(() => {
                        navigate('/login')
                    });
            }
        })

        return () => {
            instance.interceptors.request.eject(requestInterceptors);
            instance.interceptors.response.eject(responseInterceptors);
        }

    },[user, logOut, navigate]);

    return instance;
}

export default useAxiosSecure;