import React from "react";
import {bankFetch} from "../../state/actions/banksActions";
import {connect} from "react-redux";
import {Card, CircularProgress,Container} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import myCarStyle from "../style/myCarsStyle";
import withStyles from "@material-ui/core/styles/withStyles";
import FinanceDashboard from "./widgets/financeDashboard";
import FinancePayments from "./widgets/financePayments";
import FinanceWithdrawal from "./widgets/financeWithdrawal";
import CardContent from "@material-ui/core/CardContent";
import {translate} from "react-i18next";
class Finances extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            value: 0,
        }

    }

    handleChange = (event, newValue) => {
        this.setState({
            value: newValue
        })
    }

    componentDidMount() {
        this.props.bankFetch()
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
        const {classes,t} = this.props
        return (
            <div>
                {
                    this.props.loading
                    ?
                        (
                            <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                                <CircularProgress/>
                            </div>
                        )
                    :
                        (
                            <Container maxWidth={'md'}>
                                <Card style={{borderRadius: 0, backgroundColor: '#3C4252', color: 'white'}}>
                                    <Tabs

                                        value={this.state.value}
                                        onChange={this.handleChange}>
                                        <Tab className={classes.tabs} label={`${t('driver.finance.dashboard')}`} {...this.a11yProps(0)} />
                                        <Tab className={classes.tabs}  label={`${t('driver.finance.payment')}`} {...this.a11yProps(1)} />
                                        <Tab className={classes.tabs}  label={`${t('driver.finance.withdraw')}`} {...this.a11yProps(2)} />

                                    </Tabs>
                                </Card>
                                <Card>
                                    <CardContent>
                                        <this.TabPanel value={this.state.value} index={0}>
                                            <FinanceDashboard/>
                                        </this.TabPanel>

                                        <this.TabPanel value={this.state.value} index={1}>
                                            <FinancePayments/>
                                        </this.TabPanel>

                                        <this.TabPanel value={this.state.value} index={2}>
                                            <FinanceWithdrawal/>
                                        </this.TabPanel>
                                    </CardContent>
                                </Card>
                            </Container>
                        )
                }
            </div>
        );
    }


}

const mapStateToProps = state=>({
    banks:state.authReducer.banksReducer.banks,
    loading: state.authReducer.banksReducer.loading
})

export default translate('common')
(withStyles(myCarStyle)(connect(mapStateToProps,{bankFetch})(Finances)))