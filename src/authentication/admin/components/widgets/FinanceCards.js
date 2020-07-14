import React, {Component} from 'react';
import {Card, CardHeader, CardContent, Grid, Avatar,IconButton,Typography} from "@material-ui/core";
import BusinessIcon from '@material-ui/icons/Business';
import {deepOrange, deepPurple, green, grey} from "@material-ui/core/colors";
import AttachMoneyIcon from '@material-ui/icons/AttachMoney'
import AddIcon from '@material-ui/icons/Add'
import {fetchAdminBanks} from "../../state/action/AdminBankAction";
import {fetchCurrency} from "../../state/action/currencyAction";
import {showMainDialog} from "../../state/action/dialogAction";
import {fetchPaymentPercentage} from "../../state/action/PaymentPercentageAction";
import {connect} from "react-redux";
import Skeleton from "@material-ui/lab/Skeleton";
import AddNewBank from "../../dialogs/component/AddNewBank";
import withStyles from "@material-ui/core/styles/withStyles";
import financeToolStyle from "../styles/financeToolStyle";
import AddNewCurrency from "../../dialogs/component/AddNewCurrency";
import EditIcon from '@material-ui/icons/Edit'
import AddPaymentPercentage from "../../../commons/components/AddPaymentPercentage";
class FinanceCards extends Component {

    componentDidMount() {
        this.props.fetchAdminBanks()
        this.props.fetchCurrency()
        this.props.fetchPaymentPercentage()
    }

    addNewBank = ()=>{
        this.props.showMainDialog({'show':true,'page':<AddNewBank form={{type:'',data:null}}/>,title:'Add new bank',actions:{on:false,path:'',id:''}})
    }

    addNewCurrency = ()=>{
        this.props.showMainDialog({
            show:true,
            page:<AddNewCurrency form={{type:'',data:null}}/>,
            title:'Add new Currency',
            actions:{
                on:false,
                path:'',
                id:''
            }
        })
    }

    editPaymentPercentage = (data)=>{
        console.log("data:"+data)
        this.props.showMainDialog({
            show:true,
            page:<AddPaymentPercentage form={{type:'Edit',data:data}}/>,
            title:'Edit payment percentage',
            actions:{
                on:false,
                path:'',
                id:''
            }
        })
    }

    render() {
        const {classes} = this.props
        return (
            <Grid container spacing={2} style={{marginTop: 20}}>
                <Grid item md={12} xs={12} sm={12}>
                    <Card>
                        <CardHeader
                            style={{backgroundColor:'#3C4252',color:'white'}}
                            title={'Finance tools'}
                            avatar={<BusinessIcon/>}/>
                        <CardContent>
                            <Grid container spacing={2}>

                                <Grid item md={4} xs={12} sm={12}>
                                    <Card style={{backgroundColor:green[500],color:'white'}}>
                                        <CardHeader
                                        title={'Banks'}
                                        avatar={<BusinessIcon/>}
                                        action={
                                            this.props.bankLoading
                                            ?
                                                (
                                                    <Skeleton
                                                    variant={"circle"}
                                                    width={40}
                                                    height={40}
                                                    style={{backgroundColor:grey[500]}}/>
                                                )
                                            :
                                                (
                                                    <IconButton
                                                        color={"inherit"}
                                                        onClick={this.addNewBank}
                                                    >
                                                        <AddIcon/>
                                                    </IconButton>
                                                )
                                        }/>
                                        <CardContent style={{display:'flex',flexDirection:'row',width:'auto'}}>
                                            {
                                                this.props.bankLoading
                                                ?
                                                    (
                                                        <div style={{
                                                            display:'flex',
                                                            flexDirection:'row'
                                                        }}>
                                                            <React.Fragment>
                                                                <Skeleton
                                                                    variant={"rect"}
                                                                    width={300}
                                                                    height={50}
                                                                    style={{backgroundColor:grey[500]}}/>
                                                            </React.Fragment>
                                                        </div>
                                                    )
                                                :
                                                    (
                                                      <div style={{display:'flex',flexDirection:'row',width:'100%',overFlowX:'auto'}}>
                                                              {
                                                                  this.props.banks.map(bank=>(
                                                                          <Card key={bank.id} style={{width:'100%',position:'relative',marginRight:20}}>
                                                                              <CardHeader
                                                                                  style={{padding:10}}
                                                                              title={bank.abbreviation}
                                                                              avatar={<Avatar src={bank.logo_path}/>}
                                                                              />
                                                                          </Card>
                                                                  ))
                                                              }
                                                      </div>
                                                    )
                                            }
                                        </CardContent>
                                    </Card>
                                </Grid>

                                <Grid item md={4} xs={12} sm={12}>
                                    <Card style={{backgroundColor:deepPurple[500],color:'white'}}>
                                        <CardHeader
                                            title={'Currencies'}
                                            avatar={<AttachMoneyIcon/>}
                                            action={
                                                this.props.currencyLoading
                                                ?
                                                    (
                                                      <Skeleton
                                                      variant={'circle'}
                                                      width={40}
                                                      height={40}
                                                      style={{backgroundColor:grey[500]}}/>
                                                    )
                                                :
                                                    (
                                                        <IconButton
                                                            onClick={()=>this.addNewCurrency()}
                                                            color={'inherit'}>
                                                            <AddIcon/>
                                                        </IconButton>
                                                    )
                                            }/>
                                        <CardContent>
                                            {
                                                this.props.currencyLoading
                                                ?
                                                    (
                                                        <React.Fragment>
                                                            <Skeleton
                                                            variant={"rect"}
                                                            width={300}
                                                            height={50}
                                                            style={{backgroundColor:grey[500]}}/>
                                                        </React.Fragment>
                                                    )
                                                :
                                                    (
                                                        <Grid container spacing={2}>
                                                            {
                                                                this.props.currency.map(
                                                                    currency=>(
                                                                        <Grid key={currency.id} item md={6}>
                                                                            <Card>
                                                                                <CardHeader
                                                                                    style={{padding:10}}
                                                                                title={currency.symbol}
                                                                                subheader={currency.name}
                                                                                avatar={<Avatar>{currency.symbol.charAt(0)}</Avatar>}/>
                                                                            </Card>
                                                                        </Grid>
                                                                    )
                                                                )
                                                            }
                                                        </Grid>
                                                    )
                                            }
                                        </CardContent>
                                    </Card>
                                </Grid>

                                <Grid item md={4} xs={12} sm={12}>
                                    <Card style={{backgroundColor:deepOrange[500],color:'white'}}>
                                        <CardHeader
                                            title={'Payment percentage'}
                                            avatar={<AttachMoneyIcon/>}
                                            action={
                                                this.props.paymentPercentageLoading
                                                ?
                                                    (
                                                        <Skeleton
                                                        variant={"circle"}
                                                        width={40}
                                                        height={40}
                                                        style={{backgroundColor:grey[500]}}/>
                                                    )
                                                :
                                                    (
                                                        <IconButton
                                                            onClick={()=>this.editPaymentPercentage(this.props.paymentPercentage)}
                                                            color={'inherit'}>
                                                            <EditIcon/>
                                                        </IconButton>
                                                    )
                                            }
                                        />
                                        <CardContent style={{padding:10}}>
                                            {
                                                this.props.paymentPercentageLoading
                                                ?
                                                    (
                                                        <React.Fragment>
                                                            <Skeleton
                                                                variant={"rect"}
                                                                width={300}
                                                                height={50}
                                                                style={{backgroundColor:grey[500]}}/>
                                                        </React.Fragment>
                                                    )
                                                :
                                                    (
                                                       <Grid container spacing={2}>
                                                           {
                                                               this.props.paymentPercentage.map(
                                                                   percentages=>(
                                                                           <Grid key={percentages.id} item md={12} xs={12}>
                                                                               <div>
                                                                                   <Typography
                                                                                       style={{color:'white'}}
                                                                                       variant={"h3"}>
                                                                                       {`${percentages.car_owners_percentage} %`}
                                                                                   </Typography>
                                                                                   <Typography style={{textAlign:'center'}}>Car owners payment</Typography>
                                                                               </div>
                                                                           </Grid>
                                                                   )
                                                               )
                                                           }
                                                       </Grid>
                                                    )
                                            }
                                        </CardContent>
                                    </Card>
                                </Grid>

                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        );
    }
}
const mapStateToProps = state=>({
    banks:state.authReducer.adminReducers.bankReducer.banks,
    bankLoading:state.authReducer.adminReducers.bankReducer.loading,
    currency:state.authReducer.adminReducers.currenciesReducer.currency,
    currencyLoading:state.authReducer.adminReducers.currenciesReducer.loading,
    paymentPercentage: state.authReducer.adminReducers.paymentPercentageReducer.paymentPercentage,
    paymentPercentageLoading:state.authReducer.adminReducers.paymentPercentageReducer.loading
})
export default connect(mapStateToProps,{fetchAdminBanks,fetchCurrency,showMainDialog,fetchPaymentPercentage})
(withStyles(financeToolStyle)(FinanceCards));