import React, {Component} from 'react';
import {showDriverLink} from "../state/action/driverLinkAction";
import {connect} from "react-redux";
import Typography from "@material-ui/core/Typography";
import {grey, red} from "@material-ui/core/colors";
import Skeleton from "@material-ui/lab/Skeleton";
import Container from "@material-ui/core/Container";
import {showHomeDialog} from "../state/action/dialogAction";
import DriverForm from "./widgets/DriverForm";

class DriverLink extends Component {

    componentDidMount() {
        let id = this.props.match.params.id;
        this.props.showDriverLink(id)
    }

    redirectToPage = id=>{
        this.props.showHomeDialog({
            show:true,
            page:<DriverForm id={id}/>,
            title:'Complete your information'
        })
    }
    render() {
        return (
            <Container maxWidth={'md'}>
                {
                    this.props.loading
                    ?
                        (
                            <div style={{padding:30}}>
                                <React.Fragment>
                                    <Skeleton
                                        variant={"text"}
                                        width={'100%'}
                                        height={20}
                                        style={{backgroundColor:grey[500]}}/>
                                    <Skeleton
                                        variant={"text"}
                                        width={'80%'}
                                        height={20}
                                        style={{backgroundColor:grey[500]}}/>
                                    <Skeleton
                                        variant={"text"}
                                        width={'50%'}
                                        height={20}
                                        style={{backgroundColor:grey[500]}}/>
                                </React.Fragment>
                            </div>
                        )
                    :
                        (
                            <div style={{padding:30}}>
                                {
                                    this.props.driverLink.status===true
                                    ?
                                        (
                                            <div>
                                                {this.redirectToPage(this.props.match.params.id)}
                                            </div>
                                        )
                                    :
                                        (
                                            <Typography variant={"h5"} style={{color:red[500]}}>
                                                {this.props.driverLink.message}
                                            </Typography>
                                        )
                                }
                            </div>
                        )
                }
            </Container>
        );
    }
}

const mapStateToProps = state=>({
    driverLink:state.homeReducer.driverLinkReducer.driver_link,
    loading:state.homeReducer.driverLinkReducer.loading
})

export default connect(mapStateToProps,{showDriverLink,showHomeDialog})
(DriverLink);