import {useEffect, useState} from 'react'
import axios from 'axios'
import {get, removeToken, set} from "../TokenService";
import {API_AUTH_URL} from "../constants/constants";


function Interceptor() {
    const [errorInterceptor, setErrorInterceptor] = useState(undefined)
    const [authInterceptor, setAuthInterceptor] = useState(undefined)
    const addAuthInterceptor = () => {
        const authInterceptor = axios.interceptors.request.use(
            config => {
                if (!config.headers.hasOwnProperty('Authorization')) {
                    if (get()) {
                        config.headers.Authorization = `Bearer ${get()}`
                    }
                } else if (!config.headers.Authorization) {
                    delete config.headers.Authorization
                }
                return config
            },
            error => {
                return Promise.reject(error)
            },
        )
        setAuthInterceptor(authInterceptor)
    }

    const removeAuthInterceptor = () => {
        axios.interceptors.request.eject(authInterceptor)
        setAuthInterceptor(undefined)
    }

    const addErrorInterceptor = () => {
        const errorInterceptor = axios.interceptors.response.use(
            response => {
                return response
            },
            error => {
                if (error.response) {
                    const code = error.response.status
                    let originalRequest = error.config;
                    if (code === 401) {
                            return issueToken().then((response) => {
                                console.log(response)
                                removeToken()
                                set(response.data.token)
                                originalRequest['Authorization'] = 'Bearer ' + get();
                                return originalRequest;
                            });
                    } else {
                        let message = 'Something went wrong.'
                        if (code === 403) {
                            message = 'You’re not authorized to do that.'
                        } else if (error.message) {
                            message = error.message
                        }
                        console.log(message)
                        //actions.showNotifications({isShow: true,message:message})
                        //this.props.showNotifications()
                    }
                }
                return Promise.reject(error)
            },
        )
        setErrorInterceptor(errorInterceptor)
    }

    const issueToken = ()=>{
        return new Promise((resolve, reject) => {
            return axios.post(`${API_AUTH_URL}refresh`).then((response) => {
                resolve(response);
            }).catch((err) => {
                reject(err);
            });
        });
    }

    const removeErrorInterceptor = () => {
        axios.interceptors.request.eject(errorInterceptor)
        setErrorInterceptor(undefined)
    }

    useEffect(() => {
        addAuthInterceptor()
        addErrorInterceptor()
        return () => {
            removeAuthInterceptor()
            removeErrorInterceptor()
        }
    }, [])

    return null
}

export default Interceptor
