import React, {Component} from 'react';
import {Box, Button, Card, CardContent, Divider, Grid, Tab, Tabs, Typography} from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import {grey} from "@material-ui/core/colors";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import PhoneIcon from "@material-ui/icons/Phone";
import RoomIcon from "@material-ui/icons/Room";
import withStyles from "@material-ui/core/styles/withStyles";
import userStyle from "../../style/usersStyle";
import ProfileTab from "./ProfileTab";
import ActionTab from "./ActionTab";
class DriverTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value:0
        }

    }

    handleChange = (event, newValue) => {
        this.setState({
            value: newValue
        })
    }

    a11yProps = (index) => {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    TabPanel = (props) => {
        const {children, value, index, ...other} = props;

        return (
            <Typography
                component="div"
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                <Box  style={{paddingLeft:0,paddingRight:0}} p={4}>{children}</Box>
            </Typography>
        );
    }

    render() {
        const {classes} = this.props
        return (
            <div>
                <Card elevation={0} style={{borderRadius: 0}}>
                    <Tabs
                        value={this.state.value}
                        textColor={"primary"}
                        indicatorColor={"primary"}
                        variant={"scrollable"}
                        onChange={this.handleChange}>
                        <Tab className={classes.tabs} label='Profile' {...this.a11yProps(0)} />
                        <Tab className={classes.tabs}  label='Cars' {...this.a11yProps(1)} />
                        <Tab className={classes.tabs}  label='Finances' {...this.a11yProps(2)} />
                        <Tab className={classes.tabs}  label='Actions' {...this.a11yProps(3)} />
                    </Tabs>
                    <Divider/>
                </Card>

                <Card style={{borderRadius:0}} elevation={0}>
                    <CardContent>
                        <this.TabPanel value={this.state.value} index={0}>
                              <ProfileTab users={this.props.users}/>
                        </this.TabPanel>

                        <this.TabPanel value={this.state.value} index={1}>

                        </this.TabPanel>

                        <this.TabPanel value={this.state.value} index={2}>

                        </this.TabPanel>
                        <this.TabPanel value={this.state.value} index={3}>
                            <ActionTab/>
                        </this.TabPanel>
                    </CardContent>
                </Card>
            </div>
        );
    }
}

export default withStyles(userStyle)(DriverTab);