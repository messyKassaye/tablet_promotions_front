import React, {Component} from 'react';
import {Card, CardContent, CardHeader, Container,Divider,Grid} from "@material-ui/core";
import AttachMoneyIcon from '@material-ui/icons/AttachMoney'
import {fetchAdvertViewPayment} from "./state/actions/advertViewPaymentAction";
import Skeleton from "@material-ui/lab/Skeleton";
import {connect} from "react-redux";
import {grey} from "@material-ui/core/colors";
class AdvertViewPayment extends Component {

    componentDidMount() {
        this.props.fetchAdvertViewPayment()
    }

    render() {
        return (
            <Container maxWidth={"md"}>
                <Card>
                    <CardHeader
                     title={'Your total payment'}
                     avatar={<AttachMoneyIcon/>}
                    />
                    <Divider/>
                    <CardContent style={{padding:0}}>
                        {

                            this.props.loading
                            ?
                                (
                                    <Grid container spacing={2}>
                                        <Grid item md={12} xs={12} sm={12}>
                                            <Skeleton variant={"rect"} width={'100%'} height={200} style={{backgroundColor:grey[500]}}/>
                                        </Grid>
                                    </Grid>
                                )
                            :
                                (
                                    <Grid>
                                        <Grid item md={12} xs={12} sm={12}>

                                        </Grid>
                                    </Grid>
                                )
                        }
                    </CardContent>
                </Card>
            </Container>
        );
    }
}

const mapStateToProps = state=>({
    payments:state.authReducer.commonReducer.paymentReducer,
    loading:state.authReducer.commonReducer.paymentReducer.loading
})

export default connect(mapStateToProps,{fetchAdvertViewPayment})(AdvertViewPayment);