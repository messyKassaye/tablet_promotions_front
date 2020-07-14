import React, {Component} from 'react';
import {Card, CardContent, CardHeader, Grid,Avatar,Typography} from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import Divider from "@material-ui/core/Divider";
import SingleLoading from "../../../commons/loading/SingleLoading";
import {deepOrange, deepPurple, green} from "@material-ui/core/colors";
import VideocamIcon from '@material-ui/icons/Videocam'
import {connect} from "react-redux";
import {fetchUsers} from "../../state/action/adminUsersAction";
import CardheaderLoading from "../../../commons/loading/CardheaderLoading";
import {fetchAdverts} from "../../state/action/advertsAction";
import nFormatter from "../../../services/MainServices";
class UsersCard extends Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {
        this.props.fetchUsers()
        this.props.fetchAdverts()
        //this.interval()
    }

    filterByRole = (data, role) => {
        return data.filter(item => {
            return item.role[0]['id'] === role
        }).length
    }

    filterTopAdvertedCompanies = (data)=>{
        let response= data.sort((a,b)=>(
            a.required_views_number<=b.required_views_number
        ))
        return response
    }


    render() {
        return (
            <Grid container spacing={2} style={{marginTop: 20}}>

                <Grid item md={6} xs={12}>
                    <Card style={{backgroundColor:'#3C4252',color:'white'}}>
                        <CardHeader
                            title={'Users in number'}
                            avatar={<PersonIcon/>}
                        />
                        <Divider/>
                        <CardContent style={{padding:32}}>
                            {
                                this.props.userLoading
                                    ?
                                    (
                                        <Grid container spacing={2}>
                                            <SingleLoading md={4} height={80}/>
                                            <SingleLoading md={4} height={80}/>
                                            <SingleLoading md={4} height={80}/>
                                        </Grid>
                                    )
                                    :
                                    (
                                        <Grid container spacing={2}>
                                            <Grid item md={4} xs={12} sm={12}>
                                                <Card elevation={0}>
                                                    <CardHeader
                                                        style={{color: green[500]}}
                                                        title={this.filterByRole(this.props.users, 3)}
                                                        subheader={'Advertiser'}
                                                    />
                                                </Card>
                                            </Grid>

                                            <Grid item md={4} xs={12} sm={12}>
                                                <Card elevation={0}>
                                                    <CardHeader
                                                        style={{color: green[500]}}
                                                        title={this.filterByRole(this.props.users, 2)}
                                                        subheader={'Car Owners'}
                                                    />
                                                </Card>
                                            </Grid>

                                            <Grid item md={4} xs={12} sm={12}>
                                                <Card elevation={0}>
                                                    <CardHeader
                                                        style={{color: green[500]}}
                                                        title={this.filterByRole(this.props.users, 4)}
                                                        subheader={'Drivers'}
                                                    />
                                                </Card>
                                            </Grid>

                                        </Grid>
                                    )
                            }
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item md={6} xs={12} sm={12}>
                    <Card style={{backgroundColor:green[500],color:'white'}}>
                        <CardHeader
                            title={'Top adverted companies'}
                            avatar={<VideocamIcon/>}
                        />
                        <Divider/>
                        <CardContent>
                            {
                                this.props.advertLoading
                                    ?
                                    (
                                        <Grid container spacing={2}>
                                            <CardheaderLoading/>
                                            <CardheaderLoading/>
                                        </Grid>
                                    )
                                    :
                                    (
                                        <Grid container spacing={2}>
                                            {
                                                this.filterTopAdvertedCompanies(this.props.adverts)
                                                    .map(advert=>(
                                                        <Grid item key={advert.id} md={6} xs={12} sm={12}>
                                                           <Card>
                                                               <CardHeader
                                                               title={advert.company.name}
                                                               subheader={advert.product_name}
                                                               avatar={<Avatar>{advert.company.name.charAt(0)}</Avatar>}
                                                               />
                                                               <CardContent
                                                                   style={{
                                                                       padding:0,
                                                                       display:'flex',
                                                                       flexDirection:'column',
                                                                       alignItems:'center'}}>
                                                                   <Typography gutterBottom variant={"h6"} color={"primary"}>
                                                                       {`Expected play: ${nFormatter(advert.required_views_number,1)}`}
                                                                   </Typography>
                                                               </CardContent>
                                                            </Card>
                                                        </Grid>
                                                    ))
                                            }
                                        </Grid>
                                    )
                            }

                        </CardContent>
                    </Card>
                </Grid>

            </Grid>

        );
    }
}


const mapStateToProps = state => ({
    users: state.authReducer.adminReducers.adminUsersReducers.users,
    userLoading: state.authReducer.adminReducers.adminUsersReducers.loading,
    adverts:state.authReducer.adminReducers.advertReducer.adverts,
    advertLoading:state.authReducer.adminReducers.advertReducer.loading
})

export default connect(mapStateToProps,{fetchUsers,fetchAdverts})(UsersCard);