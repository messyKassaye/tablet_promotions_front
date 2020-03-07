import React, {Component} from 'react';
import {Box, Grid, Card, CardContent, Divider, Tab, Tabs, Typography} from "@material-ui/core";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import PhoneIcon from "@material-ui/icons/Phone";
import RoomIcon from "@material-ui/icons/Room";
import withStyles from "@material-ui/core/styles/withStyles";
import userStyle from "../../style/usersStyle";
import ProfileTab from "./ProfileTab";
import ActionTab from "./ActionTab";
import CompanyCard from "../CompanyCard";
import AdvertCard from "../AdvertCard";
import {grey} from "@material-ui/core/colors";
class AdvertiserTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value:0,
            totalAdvert:0
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

    totalAdvert = company=>{
        let totalAdvert = 0
        company.map(comp=>{
            totalAdvert += comp.adverts.length
        })
        return totalAdvert
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
                        <Tab className={classes.tabs}  label='Adverts' {...this.a11yProps(1)} />
                        <Tab className={classes.tabs}  label='Companies' {...this.a11yProps(2)} />
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
                            {
                                    this.props.users.relations.companies.length>0
                                    ?
                                        (
                                            <Grid container spacing={2}>
                                                <Grid item md={9} xs={12}>
                                                    <div style={{display:'flex',flexDirection:'column',alignItems:'flex-end'}}>
                                                        <Typography color={"primary"}>{`${this.totalAdvert(this.props.users.relations.companies)} adverts`}</Typography>
                                                    </div>
                                                </Grid>
                                                {
                                                    this.props.users.relations.companies
                                                        .map(company=>(
                                                            company.adverts.map(advert=>(
                                                                <Grid item md={9} xs={12} sm={12}>
                                                                    <AdvertCard advert={advert}/>
                                                                </Grid>
                                                            ))
                                                        ))
                                                }
                                            </Grid>
                                        )
                                    :
                                        (
                                            <Grid item md={9} xs={12} sm={12}>
                                                <Typography color={"secondary"}>There is no registered advert</Typography>
                                            </Grid>
                                        )
                                }
                        </this.TabPanel>

                        <this.TabPanel value={this.state.value} index={2}>
                            <Grid>
                                {
                                    this.props.users.relations.companies.length>0
                                        ?
                                        (
                                            <Grid item md={9} xs={12} sm={12}>
                                               <div style={{display:'flex',flexDirection:'column',alignItems:'flex-end'}}>
                                                   <Typography color={"primary"}>
                                                       {`${this.props.users.relations.companies.length} company`}
                                                   </Typography>
                                               </div>
                                                {
                                                    this.props.users.relations.companies.map(company=>(
                                                        <CompanyCard company={company}/>
                                                    ))
                                                }
                                            </Grid>
                                        )
                                        :
                                        (
                                            <Grid item md={9} xs={12} sm={12}>
                                                <Typography color={"secondary"}>There is no registered company</Typography>
                                            </Grid>
                                        )

                                }
                            </Grid>
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

export default withStyles(userStyle)(AdvertiserTab);