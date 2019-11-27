import React from "react";
import {Route,Redirect} from 'react-router-dom'
import {isAuthenticated} from "../TokenService";
const AuthenticatedRoute = ({component:Component,...rest})=>(
    <Route
        {...rest}
        render={props=>(
                isAuthenticated()
                ?<Component {...rest}/>
                :<Redirect to={'/'}/>
        )}
    />
)

export default AuthenticatedRoute
