import React from "react";
import {Route,Redirect} from 'react-router-dom'
import {isAuthenticated} from "../TokenService";

const PrivateRoute = ({component: Component,...rest})=>(
    <Route
        {...rest}
        render={props =>
            !isAuthenticated() ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to='/auth'
                />
            )
        }
    />
)

export default PrivateRoute
