import React, {Component} from 'react';
import {Container} from "@material-ui/core";
import {connect} from "react-redux";
import Skeleton from "@material-ui/lab/Skeleton";
import {green, grey} from "@material-ui/core/colors";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import NotificationIcon from '@material-ui/icons/Notifications'
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
class NotificationDetails extends Component {

    renderComponent = notification=>{
        switch (notification.entity.id) {
            case 1:
                return this.advertPayedNotification(notification)

        }
    }

    advertPayedNotification = notification=>{
        return <Card>
            <Typography style={{color:green[600]}}>
                {notification.message}
            </Typography>
        </Card>
    }
    render() {
        return (
            <Container>
                {
                    this.props.loading
                    ?
                        (
                            <Skeleton variant='rect' width='100%' height={200} style={{backgroundColor:grey[500]}}/>
                        )
                    :
                        (

                                <Card>
                                    <CardHeader
                                     title={'Notifications'}
                                     avatar={<NotificationIcon/>}
                                    />
                                    <Divider/>
                                    <CardContent>
                                        {
                                            this.props.user.relations.notifications.map(notification=>(
                                                <Card>
                                                    <CardHeader
                                                     title={notification.entity.name}
                                                    />
                                                    <CardContent>
                                                        <Typography>{notification.entity.message}</Typography>
                                                    </CardContent>
                                                </Card>
                                            ))
                                        }
                                    </CardContent>
                                </Card>
                        )
                }
            </Container>
        );
    }
}

const mapStateToProps = state => ({
    user: state.userData.user,
    loading: state.userData.loading
})

export default connect(mapStateToProps)(NotificationDetails);
