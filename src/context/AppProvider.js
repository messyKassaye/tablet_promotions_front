import React from "react";
import HomeBar from "../home/components/HomeBar";
import Authenticated from "../authentication/Authenticated";
import {get} from "../TokenService";
import t from 'prop-types';
import AuthenticationContext from "./AuthenticationContext";
class AppProvider extends React.Component {
    static propTypes = {
        children: t.node.isRequired,
    };

    constructor(props){
        super(props)
        if(get()){
            this.state = {
                navigate:'Authenticated',
                show:{
                    isShown: true,
                    message: ''
                }
            }
        }else {
            this.state={
                navigate:'Home',
                show:{
                    isShown: true,
                    message: ''
                }
            }
        }
    }


    go = (value) => {
        this.setState({ navigate: value });
    }
    show = (show,messages)=>{
        this.setState({
            show:{
                isShown:show
            }
        })
    }

    render() {

        const contextValues = {
            navigate: this.state.navigate,
            go: this.go,
        };

        return (
            <AuthenticationContext.Provider value={contextValues}>
                {this.props.children}
            </AuthenticationContext.Provider>
        );
    }
}

export default AppProvider;
