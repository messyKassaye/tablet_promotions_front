 import React from "react";
import IconButton from "@material-ui/core/IconButton";
import NotificationIcon from '@material-ui/icons/Notifications'
 import withStyles from "@material-ui/core/styles/withStyles";
 import Badge from "@material-ui/core/Badge/Badge";
 import {connect} from "react-redux";
 import Skeleton from "@material-ui/lab/Skeleton";
 import {Link} from "react-router-dom";
class Notifications extends React.Component{

    constructor(props) {
        super(props);

    }

    filterNewNotifications = (notifications)=>{
        return notifications.filter(notification=>{
            return notification.status===0;
        })
    }

    render() {
        const StyledBadge1 = withStyles(theme => ({
            badge: {
                right: -3,
                border: `2px solid ${theme.palette.background.paper}`,
                padding: '0 4px',
            },
        }))(Badge);
        return (
            <div>
                {
                    this.props.loading
                        ?
                        (
                            <IconButton color='inherit'>
                                <Skeleton variant='circle'  width={40} height={40}/>
                            </IconButton>
                        )
                        :
                        (
                            <IconButton
                                component={Link}
                                to={`/auth/${this.props.user.relations.role[0].name}/notifications`}
                                color='inherit'
                            >
                                {
                                    this.filterNewNotifications(this.props.user.relations.notifications).length>0
                                        ?
                                        (
                                            <StyledBadge1 badgeContent={`${this.filterNewNotifications(this.props.user.relations.notifications).length}`} color="secondary">
                                                <NotificationIcon/>
                                            </StyledBadge1>
                                        )
                                        :
                                        (
                                            <NotificationIcon/>

                                        )
                                }
                            </IconButton>

                        )
                }

            </div>
        );
    }

}

 const mapStateToProps = state=> ({
     user: state.userData.user,
     loading:state.userData.loading
 })
export default connect(mapStateToProps,null)(Notifications)
