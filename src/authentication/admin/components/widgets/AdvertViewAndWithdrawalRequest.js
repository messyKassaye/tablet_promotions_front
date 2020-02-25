import React, {Component} from 'react';
import {Card, CardContent, CardHeader, Grid} from "@material-ui/core";
import AttachMoneyIcon from '@material-ui/icons/AttachMoney'
import VideocamIcon from '@material-ui/icons/Videocam'
import {fetchViewedAdverts} from "../../state/action/ViewedAdvertsAction";
import {connect} from "react-redux";
import {green, grey} from "@material-ui/core/colors";
import Skeleton from "@material-ui/lab/Skeleton";
class AdvertViewAndWithdrawalRequest extends Component {
    constructor(props) {
        super(props);

    }

    viewedAdverts = (data)=>{
        return data.filter(advert=>{
            return advert.status === 'On progress'
        }).length
    }

    componentDidMount() {
        this.props.fetchViewedAdverts()
    }

    render() {
        return (
            <Grid container spacing={2}>

                <Grid item md={6} xs={12} sm={12}>
                    <Card>
                        <CardHeader
                         title={'Advert view'}
                         avatar={<VideocamIcon/>}
                        />
                        <CardContent>
                            <Grid container spacing={2}>
                                {
                                    this.props.loading
                                    ?
                                        (
                                            <Grid container spacing={2}>

                                                <Grid item md={6} xs={12} sm={12}>
                                                   <Skeleton
                                                       width={'100%'}
                                                       height={200}
                                                       style={{backgroundColor:grey[500]}}/>
                                                </Grid>

                                                <Grid item md={6} xs={12} sm={12}>
                                                    <Skeleton
                                                        width={'100%'}
                                                        height={200}
                                                        style={{backgroundColor:grey[500]}}/>
                                                </Grid>

                                            </Grid>
                                        )
                                    :
                                        (
                                            <Grid container spacing={2}>
                                                <Grid item md={6} xs={6}>
                                                    <Card style={{backgroundColor:green[500],color:'white'}}>
                                                        <CardHeader
                                                            title={this.props.viewedAdverts.length}
                                                            subheader={<span style={{color:grey[200]}}>Total viewed adverts</span>}
                                                        />
                                                    </Card>
                                                </Grid>

                                                <Grid item md={6} xs={6}>
                                                    <Card style={{backgroundColor:'#1976d2',color:'white'}}>
                                                        <CardHeader
                                                            title={this.viewedAdverts(this.props.viewedAdverts)}
                                                            subheader={<span style={{color:grey[200]}}>New viewed adverts</span>}
                                                        />
                                                    </Card>
                                                </Grid>
                                            </Grid>
                                        )
                                }
                            </Grid>

                        </CardContent>
                    </Card>

                </Grid>

                <Grid item md={6} xs={12} sm={12}>
                    <Card>
                        <CardHeader
                            title={'Withdrawals'}
                            avatar={<AttachMoneyIcon/>}
                        />
                        <CardContent>

                        </CardContent>
                    </Card>

                </Grid>

            </Grid>
        );
    }
}

const mapStateToProps = state=>({
    viewedAdverts:state.authReducer.adminReducers.viewedAdvertReducer.viewedAdverts,
    loading:state.authReducer.adminReducers.viewedAdvertReducer.loading
})

export default connect(mapStateToProps,{fetchViewedAdverts})(AdvertViewAndWithdrawalRequest);