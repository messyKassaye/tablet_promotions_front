import React, {Component} from 'react';
import {Card, CardContent, CardHeader, Container, Divider} from "@material-ui/core";
import AttachMoneyIcon from '@material-ui/icons/AttachMoney'
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import {withdrawColumns as columns} from "../data/columns";
import {printableWithdrawColumns as PrintColumns} from "../data/columns";
import {StyledTableCell} from "./AdminAdverts";
import TableBody from "@material-ui/core/TableBody";
import Table from "@material-ui/core/Table";
import {connect} from "react-redux";
import {fetchWithdrawal} from "../state/action/WithdrawAction";
import Skeleton from "@material-ui/lab/Skeleton";
import {grey} from "@material-ui/core/colors";
import TableCell from "@material-ui/core/TableCell";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {showMainDialog} from "../state/action/dialogAction";
import WithdrawRequestPaymentAsset from "../dialogs/component/WithdrawRequestPaymentAsset";

class WithdrawalRequest extends Component {

    constructor(props) {
        super(props);
        this.state = {
            printableData:[]
        }

    }

    componentDidMount() {
        this.props.fetchWithdrawal()
    }

    filterNewWithdraw = (data) => {
        return data.filter(withdraw => {
            return withdraw.status === 'pending'
        })
    }

    showDetail = (withdraw)=>{
        const {printableData} = this.state
        printableData.push(withdraw)
        this.setState(printableData)
    }

    payNow = (withdraw)=>{
        this.props.showMainDialog({
            show:true,
            page:<WithdrawRequestPaymentAsset withdraws={withdraw}/>,
            title:'Withdraw payment request',
            actions:{
                on:false,
                path:'',
                id:null
            }
        })
    }

    render() {
        return (
            <Container maxWidth={"md"}>
                <Card>
                    <CardHeader
                        title={'New withdraw requests'}
                        avatar={<AttachMoneyIcon/>}
                    />
                    <Divider/>
                    <CardContent style={{overflow: 'auto', padding: 0}}>
                        {
                            this.props.loading
                                ?
                                (
                                    <Skeleton
                                        width={'100%'}
                                        height={150}
                                        style={{backgroundColor: grey[500],padding:0,position:'relative'}}
                                    />
                                )
                                :
                                (
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                {columns.map(column => (
                                                    <StyledTableCell
                                                        key={column.id}
                                                        align={column.align}
                                                        style={{minWidth: column.minWidth}}
                                                    >
                                                        {column.label}
                                                    </StyledTableCell>
                                                ))}
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {
                                                this.filterNewWithdraw(this.props.withdrawals)
                                                    ?
                                                    (
                                                        this.filterNewWithdraw(this.props.withdrawals)
                                                            .map(withdraw => (
                                                                <TableRow hover role="checkbox" tabIndex={-1}
                                                                          key={withdraw.id}>

                                                                    <TableCell key='request_id'
                                                                               align={columns[1].align}>
                                                                        {withdraw.id}
                                                                    </TableCell>

                                                                    <TableCell key='request_at'
                                                                               align={columns[1].align}>
                                                                        {withdraw.requested_at}
                                                                    </TableCell>

                                                                    <TableCell key='full_name'
                                                                               align={columns[1].align}>
                                                                        {`${withdraw.user.first_name} ${withdraw.user.last_name}`}
                                                                    </TableCell>

                                                                    <TableCell key='ban_name'
                                                                               align={columns[1].align}>
                                                                        {withdraw.bank_account.bank.bank_name}
                                                                    </TableCell>

                                                                    <TableCell key='holder_full_name'
                                                                               align={columns[1].align}>
                                                                        {withdraw.bank_account.account_holder_full_name}
                                                                    </TableCell>


                                                                    <TableCell key='account_number'
                                                                               align={columns[1].align}>
                                                                        {
                                                                            withdraw.bank_account.account_number
                                                                        }
                                                                    </TableCell>

                                                                    <TableCell key='amount'
                                                                               align={columns[1].align}>
                                                                        {
                                                                            `${withdraw.amount} ETB`
                                                                        }
                                                                    </TableCell>

                                                                    <TableCell key={'actions'}>
                                                                        <div style={{display:'flex',flexDirection:'row'}}>
                                                                            <Button
                                                                                variant={"outlined"}
                                                                                size={"small"}
                                                                                color={"primary"}
                                                                                onClick={()=>this.showDetail(withdraw)}
                                                                                style={{textTransform: 'none',marginRight:10}}>
                                                                                {
                                                                                    'Add to print'
                                                                                }
                                                                            </Button>
                                                                            <Button
                                                                                variant={"outlined"}
                                                                                size={"small"}
                                                                                color={"secondary"}
                                                                                onClick={()=>this.payNow(withdraw)}
                                                                                style={{textTransform: 'none'}}>
                                                                                {
                                                                                    'Payed'
                                                                                }
                                                                            </Button>
                                                                        </div>
                                                                    </TableCell>
                                                                </TableRow>
                                                            ))
                                                    )
                                                    :
                                                    (
                                                        <TableRow>
                                                            <TableCell colSpan={9} align='center'
                                                                       style={{width: '100%'}}>
                                                                <Typography style={{textAlign: 'left'}}>
                                                                    There is no viewed adverts
                                                                </Typography>
                                                            </TableCell>
                                                        </TableRow>
                                                    )

                                            }
                                        </TableBody>

                                    </Table>
                                )
                        }

                    </CardContent>
                </Card>

                {
                    this.state.printableData.length>0
                    ?
                        (
                            <Card style={{marginTop:20}}>
                                <CardHeader
                                 title={'Printable withdraw requests'}
                                 avatar={<AttachMoneyIcon/>}
                                 action={
                                     <Button
                                      color={"primary"}
                                      variant={"outlined"}
                                      size={"small"}
                                      style={{textTransform:'none'}}
                                     >
                                         Print
                                     </Button>
                                 }
                                />
                                <CardContent style={{padding:0,overflow:'auto'}}>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                {PrintColumns.map(column => (
                                                    <StyledTableCell
                                                        key={column.id}
                                                        align={column.align}
                                                        style={{minWidth: column.minWidth}}
                                                    >
                                                        {column.label}
                                                    </StyledTableCell>
                                                ))}
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {
                                                this.state.printableData
                                                    .map(prints => (
                                                        <TableRow hover role="checkbox" tabIndex={-1}
                                                                  key={prints.id}>

                                                            <TableCell key='request_id'
                                                                       align={PrintColumns[1].align}>
                                                                {prints.id}
                                                            </TableCell>

                                                            <TableCell key='full_name'
                                                                       align={PrintColumns[1].align}>
                                                                {`${prints.user.first_name} ${prints.user.last_name}`}
                                                            </TableCell>

                                                            <TableCell key='phone'
                                                                       align={PrintColumns[1].align}>
                                                                {`${prints.user.phone}`}
                                                            </TableCell>

                                                            <TableCell key='ban_name'
                                                                       align={PrintColumns[1].align}>
                                                                {prints.bank_account.bank.bank_name}
                                                            </TableCell>

                                                            <TableCell key='holder_full_name'
                                                                       align={PrintColumns[1].align}>
                                                                {prints.bank_account.account_holder_full_name}
                                                            </TableCell>


                                                            <TableCell key='account_number'
                                                                       align={PrintColumns[1].align}>
                                                                {
                                                                    prints.bank_account.account_number
                                                                }
                                                            </TableCell>

                                                            <TableCell key='amount'
                                                                       align={PrintColumns[1].align}>
                                                                {
                                                                    `${prints.amount} ETB`
                                                                }
                                                            </TableCell>
                                                        </TableRow>
                                                    ))
                                            }
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>
                        )
                    :
                        (
                            <span></span>
                        )
                }
            </Container>
        );
    }
}

const mapStateToProps = state => ({
    withdrawals: state.authReducer.adminReducers.withdrawReducer.withdrawals,
    loading: state.authReducer.adminReducers.withdrawReducer.loading
})

export default connect(mapStateToProps, {fetchWithdrawal,showMainDialog})(WithdrawalRequest);