import React, {Component} from 'react';
import {
    Avatar, Card, CardActions, CardContent, Container, Grid, Typography,
    Button, Box, Tabs, Tab, Divider, Chip
} from "@material-ui/core";
import {connect} from "react-redux";
import {show} from "../../state/actions/usersActions";
import default_avator from '../../../assets/default_avator.jpg'
import Skeleton from "@material-ui/lab/Skeleton";
import {green, grey} from "@material-ui/core/colors";
import withStyles from "@material-ui/core/styles/withStyles";
import userStyle from "../style/usersStyle";
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import PhoneIcon from '@material-ui/icons/Phone';
import RoomIcon from '@material-ui/icons/Room';
import DriverTab from "./widgets/DriverTab";
import TabLoader from "../loading/TabLoader";
import AdvertiserTab from "./widgets/AdvertiserTab";
class UserProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value:0
        }
    }

    a11yProps = (index) => {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    componentDidMount() {
        let id = this.props.match.params.id
        this.props.show(id)
    }



    findTabForRole = role=>{
        if(role===2){
            return <DriverTab users={this.props.users}/>
        }else if(role===3){
            return <AdvertiserTab users={this.props.users}/>
        }else if(role===4){

        }
    }


    render() {
        const {classes} = this.props
        return (
            <Container maxWidth={"lg"}>
                <Grid container spacing={2}>

                    <Grid item md={3} xs={12} sm={12}>
                        <Card className={classes.profileCard}>
                            <CardContent
                                className={classes.profileCardContent}
                            >
                                {
                                    this.props.loading
                                    ?
                                        (
                                            <div className={classes.profileCardContent}>
                                                <Skeleton
                                                    variant={"circle"}
                                                    width={40} height={40}
                                                    style={{backgroundColor:grey[500]}}/>
                                                <Skeleton
                                                    variant={"text"} width={80} style={{backgroundColor:grey[500]}}/>

                                                <Skeleton
                                                    variant={"text"} width={80} style={{backgroundColor:grey[500],marginTop:10}}/>
                                            </div>
                                        )
                                    :
                                        (
                                            <div
                                                className={classes.profileCardContent}
                                            >
                                                {
                                                    this.props.users.attribute.avator==='letter'
                                                    ?
                                                        (
                                                            <Avatar src={default_avator} widt={50} hieght={50}/>
                                                        )
                                                    :
                                                        (
                                                            <Avatar src={this.props.users.attribute.avator}/>
                                                        )
                                                }
                                                <Typography style={{color:grey[500]}}>{this.props.users.relations.role[0].name}</Typography>
                                                <Typography style={{marginTop:10,color:grey[400]}}>{`${this.props.users.attribute.first_name} ${this.props.users.attribute.last_name}`}</Typography>

                                            </div>

                                        )
                                }
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item md={9} xs={12} sm={12}>
                        {
                            this.props.loading
                            ?
                                (
                                    <TabLoader/>
                                )
                            :
                                (
                                   <div>
                                       { this.findTabForRole(this.props.users.relations.role[0].id)}
                                   </div>
                                )
                        }

                    </Grid>

                </Grid>
            </Container>
        );
    }
}
const mapStateToProps = state=>({
    user:state.userData.user,
    users:state.userData.showUser,
    loading:state.userData.showLoading
})
export default connect(mapStateToProps,{show})
(withStyles(userStyle)(UserProfile));