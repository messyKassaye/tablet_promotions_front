import React, {Component} from 'react';
import {Card, CardContent, CardHeader, Container,Grid} from "@material-ui/core";
import {connect} from "react-redux";
import {fetchViewedAdverts} from "../state/action/ViewedAdvertsAction";
import ViewedAndUnpayedAdverts from "./widgets/ViewedAndUnpayedAdverts";
import ViewedAndPaymentDone from "./widgets/ViewedAndPaymentDone";
import Skeleton from "@material-ui/lab/Skeleton";
import {grey} from "@material-ui/core/colors";
import ViewedAndPaymentDeclinedAdvert from "./widgets/ViewedAndPaymentDeclinedAdvert";
class AdminViewedAdverts extends Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {
        this.props.fetchViewedAdverts()
    }

    render() {
        return (
            <Container maxWidth={"md"}>
                <Card style={{marginBottom:20}}>
                   <CardHeader
                    title={'Viewed adverts'}
                   />
                </Card>
                {
                    this.props.loading
                    ?
                        (
                            <Grid container spacing={2}>

                                <Grid item md={12} xs={12} sm={12}>
                                    <Skeleton
                                        variant={"rect"}
                                        width={'100%'}
                                        height={250}
                                        style={{backgroundColor:grey[500]}}
                                    />
                                </Grid>


                                <Grid item md={12} xs={12} sm={12}>
                                    <Skeleton
                                        variant={"rect"}
                                        width={'100%'}
                                        height={250}
                                        style={{backgroundColor:grey[500]}}
                                    />
                                </Grid>

                            </Grid>
                        )
                    :
                        (
                            <Grid container spacing={2}>

                                <Grid item md={12} xs={12} sm={12}>
                                    <ViewedAndUnpayedAdverts adverts={this.props.viewedAdverts}/>
                                </Grid>

                                <Grid item md={12} xs={12} sm={12}>
                                    <ViewedAndPaymentDone adverts={this.props.viewedAdverts}/>
                                </Grid>

                                <Grid item md={12} xs={12} sm={12}>
                                    <ViewedAndPaymentDeclinedAdvert adverts={this.props.viewedAdverts}/>
                                </Grid>

                            </Grid>

                        )
                }
            </Container>
        );
    }
}

const mapStateToProps = state=>({
    viewedAdverts:state.authReducer.adminReducers.viewedAdvertReducer.viewedAdverts,
    loading:state.authReducer.adminReducers.viewedAdvertReducer.loading
})

export default connect(mapStateToProps,{fetchViewedAdverts})(AdminViewedAdverts);