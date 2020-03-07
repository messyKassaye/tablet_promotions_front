import React, {Component} from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import userStyle from "../../style/usersStyle";
import {Box, Card, CardContent, Divider, Tab, Tabs, Typography} from "@material-ui/core";
import ProfileTab from "./ProfileTab";
class DownloaderTab extends Component {

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
                    </CardContent>
                </Card>

            </div>
        );
    }
}

export default withStyles(userStyle)(DownloaderTab);