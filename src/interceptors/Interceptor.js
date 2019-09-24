import {useEffect, useState} from 'react'
import axios from 'axios'
import {connect, useSelector} from "react-redux";
import {get} from "../TokenService";
import {showNotifications} from "../home/state/action/authenticationAction";


function Interceptor() {
    const [errorInterceptor, setErrorInterceptor] = useState(undefined)
    const [authInterceptor, setAuthInterceptor] = useState(undefined)
    const  actions = showNotifications()
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
                console.log(error.response)
                if (error.response) {
                    const code = error.response.status
                    if (code === 401) {
                        console.log(code)
                        //this.props.promptToSignIn()
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
