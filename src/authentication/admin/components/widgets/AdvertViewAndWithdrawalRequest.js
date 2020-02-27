import React, {Component} from 'react';
import {Card, CardContent, CardHeader, Grid} from "@material-ui/core";
import AttachMoneyIcon from '@material-ui/icons/AttachMoney'
import VideocamIcon from '@material-ui/icons/Videocam'
import {fetchViewedAdverts} from "../../state/action/ViewedAdvertsAction";
import {fetchWithdrawal} from "../../state/action/WithdrawAction";
import {connect} from "react-redux";
import {deepOrange, deepPurple, green, grey} from "@material-ui/core/colors";
import Skeleton from "@material-ui/lab/Skeleton";
import {Link} from "react-router-dom";
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
        this.props.fetchWithdrawal()
    }

    filterPrevousWithdraw = (data)=>{
        return data.filter(withdraw=>{
            return withdraw.status !=='pending'
        })
    }

    filterNewWithdraw = (data)=>{
        return data.filter(withdraw=>{
            return withdraw.status==='pending'
        })
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
                                        skeleton
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
                            <Grid container spacing={2}>
                            {
                             this.props.withdrawLoading
                             ?
                                 skeleton

                             :
                                 (
                                     <Grid container spacing={2}>
                                         <Grid item md={6} xs={6}>
                                             <Card style={{backgroundColor:deepPurple[500],color:'white'}}>
                                                 <CardHeader
                                                     title={this.filterPrevousWithdraw(this.props.withdrawals).length}
                                                     subheader={<span style={{color:grey[200]}}>Total withdraw</span>}
                                                 />
                                             </Card>
                                         </Grid>

                                         <Grid item md={6} xs={6}>
                                             <Card  style={{backgroundColor:deepOrange[500],color:'white'}}>
                                                 <CardHeader
                                                     style={{textDecoration:'none',color:'white'}}
                                                     component={Link} to={'/auth/admin/withdrawal_request'}
                                                     title={this.filterNewWithdraw(this.props.withdrawals).length}
                                                     subheader={<span style={{color:grey[200]}}>New withdraw request</span>}
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

            </Grid>
        );
    }
}
const skeleton = <Grid container spacing={2}>

    <Grid item md={6} xs={12} sm={12}>
        <Skeleton
            width={'100%'}
            height={100}
            style={{backgroundColor:grey[500]}}/>
    </Grid>

    <Grid item md={6} xs={12} sm={12}>
        <Skeleton
            width={'100%'}
            height={100}
            style={{backgroundColor:grey[500]}}/>
    </Grid>

</Grid>
const mapStateToProps = state=>({
    viewedAdverts:state.authReducer.adminReducers.viewedAdvertReducer.viewedAdverts,
    loading:state.authReducer.adminReducers.viewedAdvertReducer.loading,
    withdrawals:state.authReducer.adminReducers.withdrawReducer.withdrawals,
    withdrawLoading:state.authReducer.adminReducers.withdrawReducer.loading
})

export default connect(mapStateToProps,{fetchViewedAdverts,fetchWithdrawal})(AdvertViewAndWithdrawalRequest);