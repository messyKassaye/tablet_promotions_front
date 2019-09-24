import React from 'react';
import {get} from "./TokenService";
import LazyLoad from "./LazyLoad";


class App extends React.Component{

    render() {
        return (
            <LazyLoad/>
        );
    }
}
export default App;
