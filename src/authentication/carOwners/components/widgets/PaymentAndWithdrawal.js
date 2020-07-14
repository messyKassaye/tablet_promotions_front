import React from "react";
import {Card} from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import authstyle from "../../../auth_style";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import CardActions from "@material-ui/core/CardActions";
import {financeFetch} from "../../state/actions/financeActions";
import {connect} from "react-redux";
import Skeleton from "@material-ui/lab/Skeleton";
import Divider from "@material-ui/core/Divider";
import {translate} from "react-i18next";
import {me} from "../../../state/actions/usersActions";

class PaymentAndWithdrawal extends React.Component{

    constructor(props) {
        super(props);

    }

    componentDidMount() {
        this.props.financeFetch()
        this.props.me()
    }

    filterWithdrawal = (data)=>{
        let filteredData = data.filter(items=>{
           return  items.status ==='Payed'
        })
        return filteredData
    }

    filterCredit = (data)=>{
        let filteredData = data.filter(items=>{
            return  items.credit >0
        })

        return filteredData
    }


    render() {
        const {classes} = this.props
        const {t} = this.props
        return (
            <div>
                {
                    this.props.loading &&this.props.paymentLoading
                        ?
                        (
                            <Skeleton variant='rect' width='100%' height={150}/>
                        )
                        :
                        (
                            <Card className={classes.card4}>
                                <CardContent>
                                    <Typography gutterBottom variant="h6" component="h2">
                                        {t('driver.payment_and_withdrawal.title')}
                                    </Typography>
                                    <div style={{display:'flex',flexDirection:'row'}}>
                                        <Typography variant="body2" color="textSecondary" component="p" style={{color:'white'}}>
                                            {t('driver.payment_and_withdrawal.payment')}:
                                            {
                                                this.filterCredit(this.props.payments).length
                                            }
                                        </Typography>

                                        <Divider orientation='vertical' style={{height: 20, padding: 1, marginRight: 10,marginLeft:10,backgroundColor:'white'}}/>

                                        <Typography variant="body2" color="textSecondary" component="p" style={{color:'white'}}>
                                            <span>{t('driver.payment_and_withdrawal.withdraw')}</span>:
                                            {
                                                this.filterWithdrawal(this.props.user.relations.withdraws).length
                                            }
                                        </Typography>
                                    </div>
                                </CardContent>
                                <CardActions className={classes.cardActions}>
                                    <Button style={{color:'white',textTransform:'capitalize'}}>
                                        <span>{t('driver.more')}</span><ChevronRightIcon/>
                                    </Button>
                                </CardActions>
                            </Card>
                        )
                }
            </div>
        );
    }


}

const mapStateToProps = state=>({
    user:state.userData.user,
    loading:state.userData.loading,
    payments:state.authReducer.driversReducers.paymentsData.payments,
    paymentLoading:state.authReducer.driversReducers.paymentsData.loading
})

export default translate('common')
(withStyles(authstyle)(connect(mapStateToProps,{financeFetch,me})(PaymentAndWithdrawal)))