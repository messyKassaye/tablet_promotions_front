import React, {Suspense} from "react";
import Loading from "./helpers/Loading";
import AppConsumer from "./context/AppConsumer";
let Component = null

class LazyLoad extends React.Component{
    constructor(props){
        super(props)

    }

    render() {
        Component = React.lazy(()=>import('./authentication/Authenticated'))
        return (
            <Suspense fallback={<Loading/>}>
                <Component {...this.props}/>
            </Suspense>
        )
    }
}

export default AppConsumer(LazyLoad)