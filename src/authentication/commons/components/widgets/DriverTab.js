import React, {Component} from 'react';
import {Box, Button, Card, CardContent, CardHeader, Divider, Grid, Tab, Tabs, Typography} from "@material-ui/core";
import {grey} from "@material-ui/core/colors";
import withStyles from "@material-ui/core/styles/withStyles";
import userStyle from "../../style/usersStyle";
import ProfileTab from "./ProfileTab";
import ActionTab from "./ActionTab";
import CarsCard from "../CarsCard";
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney'
import BankAccountCard from "../BankAccountCard";
import MoneyWithdrawCard from "../MoneyWithdrawCard";
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
        const {classes,users} = this.props
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
                              <ProfileTab users={users}/>
                        </this.TabPanel>

                        <this.TabPanel value={this.state.value} index={1}>
                         <Grid container spacing={2}>
                             <Grid item md={9} xs={12}>
                                 <div style={{display:'flex',flexDirection:'column',alignItems:'flex-end'}}>
                                     <Typography color={"primary"}>{`${users.relations.cars.length} cars`}</Typography>

                                 </div>
                             </Grid>
                             {
                                 users.relations.cars.map(car=>(
                                     <Grid item md={9} xs={12} sm={12}>
                                         <CarsCard car={car}/>
                                     </Grid>
                                 ))
                             }
                         </Grid>
                        </this.TabPanel>

                        <this.TabPanel value={this.state.value} index={2}>
                            <Grid container spacing={2}>

                                <Grid item md={9} xs={12} sm={12}>
                                        <div style={{display:'flex',flexDirection:'row'}}>
                                            <Typography style={{color:grey[500],marginRight:20}}>Total balance: </Typography>
                                            <Typography color={"primary"}>
                                                {`${users.relations.balance.balance.toLocaleString()} ETB`}
                                            </Typography>
                                        </div>
                                </Grid>

                                <Grid item md={9} xs={12} sm={12}>
                                    <Typography
                                        style={{display:'flex',flexDirection:'row',justifyContent:'flex-start',color:grey[500]}}>
                                       <AccountBalanceIcon fontSize={"small"} color={"primary"} style={{marginRight:15}}/> Bank account
                                    </Typography>
                                </Grid>

                                    {
                                        users.relations.bank_account.length>0
                                        ?
                                            (
                                                users.relations.bank_account.map(bank=>(
                                                    <Grid item md={9} sm={12}>
                                                        <BankAccountCard bankAccount={bank}/>
                                                    </Grid>
                                                ))
                                            )
                                        :
                                            (
                                                <Grid item md={9} xs={12}>
                                                    <Typography color={"secondary"}>Bank is not set</Typography>
                                                </Grid>
                                            )

                                    }

                                <Grid item md={9} xs={12} sm={12}>
                                    <Typography
                                        style={{display:'flex',flexDirection:'row',justifyContent:'flex-start',color:grey[500]}}>
                                        <AttachMoneyIcon fontSize={"small"} color={"primary"} style={{marginRight:15}}/> Money withdraws
                                    </Typography>
                                </Grid>
                                <Grid item md={12} xs={12} sm={12}>
                                    <MoneyWithdrawCard withdraws={users.withdraws}/>
                                </Grid>

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

export default withStyles(userStyle)(DriverTab);