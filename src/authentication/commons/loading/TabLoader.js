import React, {Component} from 'react';
import {Card, Divider, Tab, Tabs} from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import {grey} from "@material-ui/core/colors";
import withStyles from "@material-ui/core/styles/withStyles";
import userStyle from "../style/usersStyle";
class TabLoader extends Component {
    constructor(props) {
        super(props);
        this.state ={
            value:0
        }

    }

    a11yProps = (index) => {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    render() {
        const {classes} = this.props
        return (
            <Card elevation={0} style={{borderRadius: 0}}>
                <Tabs
                    value={this.state.value}
                    textColor={"primary"}
                    indicatorColor={"primary"}
                    variant={"scrollable"}
                    onChange={this.handleChange}>
                    <Tab className={classes.tabs} label={<Skeleton width={150} variant={"text"} style={{backgroundColor:grey[500]}}/>} {...this.a11yProps(0)} />
                    <Tab className={classes.tabs}  label={<Skeleton width={150} variant={"text"} style={{backgroundColor:grey[500]}}/>} {...this.a11yProps(1)} />
                    <Tab className={classes.tabs}  label={<Skeleton width={150} variant={"text"} style={{backgroundColor:grey[500]}}/>} {...this.a11yProps(2)} />
                    <Tab className={classes.tabs}  label={<Skeleton width={150} variant={"text"} style={{backgroundColor:grey[500]}}/>} {...this.a11yProps(2)} />

                </Tabs>
                <Divider/>
            </Card>
        );
    }
}

export default withStyles(userStyle)(TabLoader);