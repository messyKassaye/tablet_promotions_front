import React, {Component} from 'react';
import {Card,CardHeader,CardContent,Grid,Typography,Divider,Button} from "@material-ui/core";
import {green, grey} from "@material-ui/core/colors";
import NotificationIcon from '@material-ui/icons/Notifications'
import Skeleton from "@material-ui/lab/Skeleton";
import {me} from "../../../state/actions/usersActions";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
class NewsAndNotifications extends Component {

    componentDidMount() {
        this.props.me()
    }

    filterNewNotifications = (notifications)=>{
        return notifications.filter(notification=>{
            return notification.status===0 &&notification.entity.id===4;
        })
    }
    render() {
        return (
            <Card>
                <CardHeader
                title={'News and notifications'}
                style={{backgroundColor:green[500],color:'white'}}
                avatar={<NotificationIcon/>}/>
                <CardContent>
                    {
                        this.props.loading
                        ?
                            (
                                <Grid container spacing={2}>
                                    <Grid item md={12} xs={12} sm={12}>
                                        <Skeleton
                                            variant={"rect"}
                                            width={'90%'}
                                            height={100}
                                            style={{backgroundColor:grey[500]}}/>
                                    </Grid>
                                </Grid>
                            )
                        :
                            (
                                <Grid container spacing={2}>
                                    {
                                        this.filterNewNotifications(this.props.user.relations.notifications)
                                            .map(notification=>(
                                                <Grid item md={12} xs={12} sm={12}>
                                                    <Card elevation={0}>
                                                        <CardContent>
                                                            <Typography style={{color:green[500],textAlign:'start'}}>
                                                                {notification.message}
                                                            </Typography>
                                                            <Button
                                                                component={Link}
                                                                to={`/auth/${this.props.user.
                                                                    relations.role[0].name.toLowerCase()}/${notification.notification_path}`}
                                                                color={"primary"}
                                                                size={"small"}
                                                                variant={'outlined'}>
                                                                Show
                                                            </Button>
                                                        </CardContent>
                                                        <Divider/>
                                                    </Card>
                                                </Grid>
                                            ))
                                    }
                                </Grid>
                            )
                    }
                </CardContent>
            </Card>
        );
    }
}

const mapStateToProps = state=> ({
    user: state.userData.user,
    loading:state.userData.loading
})
export default connect(mapStateToProps,{me})(NewsAndNotifications);