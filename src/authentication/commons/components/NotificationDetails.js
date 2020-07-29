import React, {Component} from 'react';
import {Container} from "@material-ui/core";
import {connect} from "react-redux";
import Skeleton from "@material-ui/lab/Skeleton";
import {deepOrange, green, grey} from "@material-ui/core/colors";
import NotificationIcon from '@material-ui/icons/Notifications'
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Grid from "@material-ui/core/Grid";
import Chip from "@material-ui/core/Chip";
import Avatar from "@material-ui/core/Avatar";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";
import {updateNotification} from "../state/actions/NotificationAction";

class NotificationDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formData: {
                message: '',
                status: 1
            }
        }

    }

    componentDidMount() {
        setTimeout(() => {
            this.updateNotification();
        }, 3000)
    }

    filterNewNotifications = (notifications) => {
        return notifications.filter(notification => {
            return notification.status === 0;
        })
    }

    updateNotification = () => {
        const data = this.filterNewNotifications(this.props.user.relations.notifications)
        for (let i = 0; i < data.length; i++) {
            const {formData} = this.state;
            this.props.updateNotification(formData, data[i].id)
        }
    }

    handleButtonEvent = notification => {
        switch (notification.entity.id) {
            case 1:
                return <Button
                component={Link}
                to={`/auth/${this.props.user.relations.role[0].name.toLowerCase().trim()}/${notification.path}`}
                color='primary'
                variant='outlined'
                style={{textTransform:'none'}}
                size='small'>
                Go to advert
            </Button>
            case 2:
                return <Button
                    component={Link}
                    to={`/auth/${this.props.user.relations.role[0].name.toLowerCase()}/${notification.path}`}
                    color='primary'
                    variant='outlined'
                    style={{textTransform:'none'}}
                    size='small'>
                    show advert
                </Button>

        }
    }

    render() {
        return (
            <Container>

                {
                    /* New notifications */
                    <Grid container spacing={2}>
                        <Grid item md={8} sm={12}>
                            <Card>
                                <CardHeader
                                    style={{backgroundColor: '#3C4252', color: 'white'}}
                                    title={'New notifications'}
                                    avatar={<NotificationIcon color='inherit'/>}
                                />
                                <Divider/>
                                <CardContent>
                                    {
                                        this.props.loading
                                            ?
                                            (
                                                <Skeleton variant='rect' width='100%' height={200}
                                                          style={{backgroundColor: grey[500]}}/>
                                            )
                                            :
                                            (
                                                <div>
                                                    {
                                                        this.filterNewNotifications(this.props.user.relations.notifications).length > 0
                                                            ?
                                                            (
                                                                <div>
                                                                    {
                                                                        this.filterNewNotifications(this.props.user.relations.notifications)
                                                                            .map(notification => (
                                                                                <Card key={notification.id}
                                                                                      style={{marginBottom: 15}}>
                                                                                    <CardHeader
                                                                                        title={notification.entity.message}
                                                                                        subheader={notification.entity.name}
                                                                                        avatar={<Avatar width={40}
                                                                                                        height={40}>N</Avatar>}
                                                                                        action={
                                                                                            <Chip color='secondary'
                                                                                                  size="small" label="New"/>
                                                                                        }
                                                                                    />
                                                                                    <Divider/>
                                                                                    <CardContent>
                                                                                        <Typography>{notification.message}</Typography>
                                                                                        <div style={{
                                                                                            display: 'flex',
                                                                                            flexDirection: 'row',
                                                                                            justifyContent: 'flex-end'
                                                                                        }}>
                                                                                            {this.handleButtonEvent(notification)}
                                                                                        </div>
                                                                                    </CardContent>
                                                                                </Card>
                                                                            ))
                                                                    }
                                                                </div>
                                                            )
                                                            :
                                                            (
                                                                <Typography>No new notifications.</Typography>
                                                            )

                                                    }
                                                </div>
                                            )
                                    }
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid item md={4} sm={12}>
                            <Card style={{backgroundColor: green[500], color: 'white'}}>
                                <CardContent>
                                    <Typography>You're all caught up!</Typography>
                                    <Typography>Check back later for new notifications</Typography>
                                </CardContent>
                            </Card>

                        </Grid>

                    </Grid>
                }



                {
                    /* earlier notifications */
                    <Grid container spacing={2}>
                        <Grid item md={8}>
                            <Card style={{marginTop: 20}}>
                                <CardHeader
                                    style={{backgroundColor: '#3C4252', color: 'white'}}
                                    title={'Earlier notifications'}
                                    avatar={<NotificationIcon color='inherit'/>}
                                />
                                <CardContent>
                                    {
                                        this.props.loading
                                            ?
                                            (
                                                <Skeleton width='100%' height={200}
                                                          style={{backgroundColor: grey[500]}}/>
                                            )
                                            :
                                            (
                                                this.props.user.relations.notifications.map(notification => (
                                                    <Card key={notification.id} style={{marginBottom: 15}}>
                                                        <CardHeader
                                                            title={notification.entity.message}
                                                            subheader={notification.entity.name}
                                                            avatar={<Avatar width={40} height={40}>N</Avatar>}
                                                            action={
                                                                <Chip color='default' size="small"
                                                                      label={notification.created_at}/>
                                                            }
                                                        />
                                                        <Divider/>
                                                        <CardContent>
                                                            <Typography>{notification.message}</Typography>
                                                            <div style={{
                                                                display: 'flex',
                                                                flexDirection: 'row',
                                                                justifyContent: 'flex-end'
                                                            }}>
                                                                {this.handleButtonEvent(notification)}
                                                            </div>
                                                        </CardContent>
                                                    </Card>
                                                ))
                                            )
                                    }
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                }
            </Container>
        );
    }
}

const mapStateToProps = state => ({
    user: state.userData.user,
    loading: state.userData.loading
})

export default connect(mapStateToProps, {updateNotification})(NotificationDetails);
