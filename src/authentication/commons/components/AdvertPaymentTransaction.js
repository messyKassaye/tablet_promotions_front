import React, {Component} from 'react';
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import {Typography} from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import {connect} from "react-redux";
import {commonFetchTabAdvertsBanks} from "../state/actions/commonTabAdvertsBanksAction";
import {grey} from "@material-ui/core/colors";
import Skeleton from "@material-ui/lab/Skeleton";
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import AdvertPaymentInformation from "./AdvertPaymentInformation";
import {showMainDialog} from "../../admin/state/action/dialogAction";

export const StyledTableCell = withStyles(theme => ({
    head: {
        backgroundColor: '#3C4252',
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);
const columns = [
    {
        id:'bank_name',
        name:'Bank name',
        maxWidth:170,
        align:'left'
    },
    {
        id:'account_holder_name',
        name:'Account holder full name',
        maxWidth:250,
        align:'left'
    },
    {
        id:'account_number',
        name:'Account number',
        maxWidth:250,
        align:'left'
    }
]
class AdvertPaymentTransaction extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isPayed:false
        }
    }


    componentDidMount() {
        this.props.commonFetchTabAdvertsBanks()
    }

    alreadyPayed = ()=>{
        this.setState({
            isPayed:true
        })
    }
    notNow = ()=>{
        this.props.showMainDialog({
            show:false,
            page:null,
            title:'',
            actions:{
                on:false,
                path:'',
                id:''
            }
        })
    }

    totalPayment = (expectedViews,paymentPerView)=>{
        return expectedViews * paymentPerView
    }

    render() {
        return (
            <div style={{display:'flex',flexDirection:'column',marginTop:10}}>
                {
                    this.state.isPayed
                    ?
                        (
                          <AdvertPaymentInformation advert={this.props.advert}/>
                        )
                    :
                        (
                            <div>
                                <Typography>{`Payment status for advertisement of ${this.props.advert.product_name}`}</Typography>
                                <Table>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>Total Payment:</TableCell>
                                            <TableCell>{`${this.totalPayment(this.props.advert.required_views_number,this.props.advert.advert_media_type.per_view_payment).toLocaleString()} ETB`}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                                <Typography style={{marginBottom:10}}>You can pay via the following banks</Typography>

                                {
                                    this.props.loading
                                        ?
                                        (
                                            <Skeleton width='100%' height={250} style={{backgroundColor:grey[500]}}></Skeleton>
                                        )
                                        :
                                        (
                                            <div>
                                                <Table>
                                                    <TableHead>
                                                        <TableRow>
                                                            {
                                                                columns.map(column=>(
                                                                    <StyledTableCell key={column.id} align={column.align} style={{maxWidth:column.maxWidth}}>{column.name}</StyledTableCell>
                                                                ))
                                                            }
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {
                                                            this.props.tabAdvertsBank.length>0
                                                                ?
                                                                (
                                                                    this.props.tabAdvertsBank.map(account=>(
                                                                        <TableRow key={account.id}>
                                                                            <TableCell>
                                                                                {account.bank.bank_name}
                                                                            </TableCell>
                                                                            <TableCell>
                                                                                {
                                                                                    account.account_holder_full_name
                                                                                }
                                                                            </TableCell>

                                                                            <TableCell>
                                                                                {account.account_number}
                                                                            </TableCell>
                                                                        </TableRow>
                                                                    ))
                                                                )
                                                                :
                                                                (
                                                                    <span>No bank data is found</span>
                                                                )
                                                        }
                                                    </TableBody>
                                                </Table>

                                                <div style={{display:'flex',flexDirection:'column'}}>
                                                    <Typography>If you already payed.You can add your payment status by clicking already payed button</Typography>
                                                    <div style={{display:'flex',flexDirection:'row',justifyContent:'flex-end',alignItems:'center'}}>
                                                        <Button
                                                            onClick={this.alreadyPayed}
                                                            color='primary'
                                                            variant='contained'
                                                            style={{textTransform:'none'}}>
                                                            Already payed
                                                        </Button>
                                                        <Button
                                                            onClick={this.notNow}
                                                            color='secondary'
                                                            variant='text'
                                                            style={{textTransform:'none',marginLeft:20}}>
                                                            Not now. I'll pay later
                                                        </Button>
                                                    </div>
                                                </div>

                                            </div>
                                        )
                                }

                            </div>
                        )
                }
            </div>

        );
    }
}

const mapStateToProps = state=>({
    loading:state.authReducer.commonReducer.commonTabAdvertsBanks.loading,
    tabAdvertsBank:state.authReducer.commonReducer.commonTabAdvertsBanks.commonTabAdvertBanks
})

export default connect(mapStateToProps,{commonFetchTabAdvertsBanks,showMainDialog})(AdvertPaymentTransaction)
