import React from "react";
import {financeFetch} from "../../state/actions/financeActions";
import {withdrawalFetch} from "../../state/actions/withdrawalActions";

import {connect} from "react-redux";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Button from "@material-ui/core/Button";
import Skeleton from "@material-ui/lab/Skeleton";
import CardContent from "@material-ui/core/CardContent";
import {Table} from "@material-ui/core";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import financeWithdrawalStyle from "../../style/financeWithdrawalStyle";
import withStyles from "@material-ui/core/styles/withStyles";
import TableBody from "@material-ui/core/TableBody";
import {showBankAccountSetterModal} from "../../state/actions/dialogActions";
import {showWithdrawalRequestDialog} from "../../state/actions/dialogActions";
import {translate} from "react-i18next";
const StyledTableCell = withStyles(theme => ({
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
        id:'requested_at',
        minWidth: 170,
        label: 'Requested at',
        format: value => value.toLocaleString(),
    },
    {
        id:'bank_account',
        minWidth: 170,
        label: 'Bank name',
        align:'left',
        format: value => value.toLocaleString(),
    },
    {
        id:'amount',
        minWidth: 170,
        label: 'Amount',
        align:'right',
        format: value => value.toLocaleString(),
    },
    {
        id:'description',
        minWidth: 170,
        label: 'Description',
        align:'left',
        format: value => value.toLocaleString(),
    },
    {
        id:'status',
        minWidth: 170,
        label: 'Status',
        align:'right',
        format: value => value.toLocaleString(),
    },
    {
        id:'processing',
        minWidth: 170,
        label: 'Process',
        align:'right',
        format: value => value.toLocaleString(),
    }
]
class FinanceWithdrawal extends React.Component{

    constructor(props) {
        super(props);

        this.showWithdrawalDialog = this.showWithdrawalDialog.bind(this)

    }

    componentDidMount() {
        this.props.withdrawalFetch()
    }

    showWithdrawalDialog = ()=>{
        if(this.props.accounts.length>0){
            this.props.showWithdrawalRequestDialog(true)
        }else {
            this.props.showBankAccountSetterModal(true)
        }
    }

    render() {
        const {classes,t} = this.props
        return (
            <div>
                {
                    this.props.loading
                    ?
                        (
                            <div style={{display:'flex',flexDirection:'column'}}>
                                <Skeleton variant='rect' width='80%' height={20} style={{marginBottom:10}}/>
                                <Skeleton variant='rect' width='60%' height={20} style={{marginBottom:10}}/>
                                <Skeleton variant='rect' width='40%' height={20}/>
                            </div>
                        )
                    :
                        (
                            <Card elevation={0}>
                                <CardHeader
                                    title={`${t('driver.finance.withdraws.title')}`}
                                    action={
                                        <Button
                                            onClick={this.showWithdrawalDialog}
                                            variant='contained'
                                            color='primary'
                                            style={{textTransform:'capitalize'}}>
                                            {`${t('driver.finance.withdraws.new_request')}`}
                                        </Button>
                                    }
                                />
                                <CardContent>
                                       <Table>
                                           <TableHead>
                                               <TableRow>
                                                   {columns.map(column => (
                                                       <StyledTableCell
                                                           key={column.id}
                                                           align={column.align}
                                                           style={{ minWidth: column.minWidth }}
                                                       >
                                                           {`${t(`driver.finance.withdraws.table.${column.id}`)}`}
                                                       </StyledTableCell>
                                                   ))}
                                               </TableRow>
                                           </TableHead>
                                           <TableBody>
                                               {
                                                   this.props.withdrawals.length<0
                                                   ?
                                                       (
                                                           <div style={{display:'flex',flexDirection:'row',justifyContent:'center',padding:10}}>
                                                               <span style={{textAlign:'center'}}>You haven't any withdrawal request</span>
                                                           </div>
                                                       )
                                                   :
                                                       (
                                                           this.props.withdrawals.map(row=>{
                                                               return (
                                                                   <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                                                       {columns.map(column => {
                                                                           const value = row[column.id];
                                                                           if (column.id==='processing'){
                                                                               return <TableCell key={column.id} align={column.align}>
                                                                                   <Button variant='outlined' color='secondary' style={{textTransform:'capitalize'}}>Show</Button>
                                                                               </TableCell>
                                                                           }
                                                                           if(column.id==='bank_account'){
                                                                               const values = row['bank_account'];
                                                                               return  <TableCell key={column.id} align={column.align}>
                                                                                   {values.bank.bank_name}
                                                                               </TableCell>
                                                                           }
                                                                           return (
                                                                               <TableCell key={column.id} align={column.align}>
                                                                                   {value}
                                                                               </TableCell>
                                                                           );
                                                                       })}
                                                                   </TableRow>
                                                               )
                                                           })
                                                       )
                                               }
                                           </TableBody>
                                       </Table>
                                </CardContent>
                            </Card>
                        )
                }
            </div>
        );
    }


}

const mapStateToProps = state=>({
    withdrawals:state.authReducer.driversReducers.withdrawalsData.withdrawals,
    loading:state.authReducer.driversReducers.withdrawalsData.loading,
    accounts:state.authReducer.bankAccountReducer.accounts,

})

export default translate('common')
(withStyles(financeWithdrawalStyle)
(connect(mapStateToProps,{withdrawalFetch,showWithdrawalRequestDialog,showBankAccountSetterModal})(FinanceWithdrawal)))