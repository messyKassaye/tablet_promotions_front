import React from "react";
import {connect} from "react-redux";
import {Card} from "@material-ui/core";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import bankTransactionStyle from "../../styles/bankTransactions";
import withStyles from "@material-ui/core/styles/withStyles";
import {translate} from "react-i18next";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import {deepOrange, deepPurple, green, grey, red} from "@material-ui/core/colors";
import Divider from "@material-ui/core/Divider";
import {withRouter} from 'react-router-dom'
import {show} from "../../state/action/advertAction";
import {tabletPromotionBanks} from "../../state/action/companyBankAction";
import Skeleton from "@material-ui/lab/Skeleton";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControl from "@material-ui/core/FormControl";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import {showAdvertPaymentConfirmDialog} from "../../state/action/advertiserDialogActions";

const GreenRadio = withStyles({
    root: {
        color: 'white',
        '&$checked': {
            color: deepOrange[300],
        },
    },
    checked: {},
})(props => <Radio color="default" {...props} />);
class BankTransactions extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            value: '',
            selectedBank: []
        }

        this.confirmPayment  = this.confirmPayment.bind(this)


    }

    componentDidMount() {
        let id = this.props.match.params.id
        this.props.show(id)
        this.props.tabletPromotionBanks()

    }

    totalPaymentCalculator = (expectedViews,perviewPayment)=>{
        return expectedViews *perviewPayment;
    }

    handleChange = (event)=>{
        let selectedData = this.props.banks.filter(bank=>bank.abbreviation===event.target.value);

        this.setState({
           value:event.target.value,
            selectedBank:selectedData
       })
    }

    confirmPayment = ()=>{
        let id = this.props.match.params.id
        this.props.showAdvertPaymentConfirmDialog({"show":true,"advert_id":id})
    }


    render() {
        const {t} = this.props
        const {classes} = this.props
        return (
            <div>
                <Card>
                    <CardHeader
                        className={classes.header}
                        title={t('advertiser.bank_transaction.title')}
                    />
                    <CardContent>
                        {
                            this.props.loading
                            ?
                                (
                                    <Skeleton variant={'rect'} width='100%' height={100}/>
                                )
                            :
                                (
                                    <div className={classes.content}>
                                        <Typography variant='h6' style={{color:green[500],textAlign:'justify'}} >

                                            {`${t('advertiser.bank_transaction.upload_succeed')}${this.props.advert.product_name}
                                             ${t('advertiser.bank_transaction.be')}${this.props.advert.advert_places[0].city} 
                                             ${t('advertiser.bank_transaction.last')}`}
                                        </Typography>
                                        <Paper className={classes.receipt}>
                                            <Typography variant='h5'>Payment</Typography>
                                            <Divider style={{backgroundColor:grey[500],marginBottom:20}}/>
                                            <div style={{marginBottom:10}}>
                                                <span  color='inherit'>{`Unit price:
                                                 ${this.props.advert.advert_media_type.per_view_payment} 
                                                 ${this.props.advert.advert_media_type.currency.symbol}`}</span>
                                            </div>

                                            <div style={{marginBottom:10}}>
                                                <span  color='inherit'>{`Expected views: ${this.props.advert.required_views_number.toLocaleString()}`}</span>
                                            </div>

                                            <div style={{marginBottom:10}}>
                                                <span  color='inherit'>{`Total payment: 
                                                ${this.totalPaymentCalculator(
                                                    this.props.advert.required_views_number,
                                                    this.props.advert.advert_media_type.per_view_payment).toLocaleString()
                                                }
                                                 ${this.props.advert.advert_media_type.currency.symbol}`}</span>
                                            </div>
                                            <div>
                                                <Typography color='inherit' gutterBottom variant={'h5'}>Pay via</Typography>
                                            </div>
                                            <div className={classes.banks_list}>
                                                {
                                                    this.props.banksLoading
                                                    ?
                                                        (
                                                            <CircularProgress/>
                                                        )
                                                    :
                                                        (
                                                            <div style={{display:'flex',flexDirection:'column'}}>
                                                                <FormControl component='fieldset'>
                                                                    <RadioGroup
                                                                        className={classes.groups}
                                                                        aria-label="gender"
                                                                        name="role_id"
                                                                        onChange={this.handleChange}>
                                                                        {
                                                                            this.props.banks.map(item=>(
                                                                                <FormControlLabel
                                                                                    key={item.id}
                                                                                    value={item.abbreviation}
                                                                                    control={<GreenRadio />}
                                                                                    label={item.abbreviation} />
                                                                            ))

                                                                        }
                                                                    </RadioGroup>
                                                                </FormControl>
                                                                {
                                                                    this.state.selectedBank.length>0
                                                                    ?
                                                                        (
                                                                            <div style={{marginTop:20}}>
                                                                                {this.state.selectedBank.map(item=>(
                                                                                    <div style={{display:'flex',flexDirection:'column'}}>
                                                                                        <div key={item.id}>
                                                                                            <Typography  color='inherit' gutterBottom>{`Bank name: ${item.bank_name}`}</Typography>
                                                                                            <Typography  color='inherit' gutterBottom>{`Account holder: ${item.account_holder_fullName}`}</Typography>
                                                                                            <Typography  color='inherit' gutterBottom>{`Account number: ${item.account_number}`}</Typography>
                                                                                             <span style={{color:grey[400]}}>Send us your payment by the above information and after payment please check out your payment below.</span>
                                                                                        </div>
                                                                                    </div>
                                                                                ))}
                                                                            </div>
                                                                        )
                                                                    :''
                                                                }
                                                            </div>
                                                        )
                                                }
                                            </div>
                                            <div>
                                                <Divider style={{backgroundColor:grey[500],marginBottom:20}}/>
                                                <div style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                                                    <Typography>If you pay. confirm your payment by clicking confirm</Typography>
                                                    <Button onClick={this.confirmPayment} color='secondary' variant='contained' style={{textTransform:'capitalize',marginLeft:20}}>
                                                        confirm
                                                    </Button>
                                                </div>
                                            </div>
                                        </Paper>

                                    </div>
                                )

                        }
                    </CardContent>
                </Card>
            </div>
        );
    }

}

const mapStateToProps = state=>({
    advert: state.authReducer.advertisersReducers.advertData.advert,
    loading:state.authReducer.advertisersReducers.advertData.showLoading,
    banks:state.authReducer.advertisersReducers.banksData.banks,
    banksLoading:state.authReducer.advertisersReducers.banksData.loading
})

export default translate('common')
(connect(mapStateToProps,{show,tabletPromotionBanks,showAdvertPaymentConfirmDialog})(withStyles(bankTransactionStyle)(withRouter(BankTransactions))))