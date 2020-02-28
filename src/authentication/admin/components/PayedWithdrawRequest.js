import React, {Component} from 'react';
import {Card, CardContent, CardHeader, Container} from "@material-ui/core";
import AttachMoneyIcon from '@material-ui/icons/AttachMoney'
import Divider from "@material-ui/core/Divider";
import {fetchWithdrawal} from "../state/action/WithdrawAction";
import {connect} from "react-redux";
import Grid from "@material-ui/core/Grid";
import Skeleton from "@material-ui/lab/Skeleton";
import {grey} from "@material-ui/core/colors";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import {payedWithdrawRequest as columns} from "../data/columns";
import {StyledTableCell} from "./AdminAdverts";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
class PayedWithdrawRequest extends Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {
        this.props.fetchWithdrawal()
    }

    filterPayedAdvert = (data)=>{
        return data.filter(withdraw=>{
            return withdraw.status === 'Payed'
        })
    }

    render() {
        return (
            <Container maxWidth={"md"}>
                <Card>
                    <CardHeader
                     title={'Payed withdraw requests'}
                     avatar={<AttachMoneyIcon/>}
                    />
                    <Divider/>
                    <CardContent style={{padding:0}}>
                        {
                            this.props.loading
                                ?
                                (
                                    <Grid container spacing={2}>
                                        <Skeleton
                                            variant={"rect"}
                                            width={'100%'}
                                            height={250}
                                            style={{backgroundColor:grey[500]}}
                                        />
                                    </Grid>
                                )
                                :
                                (
                                    <Paper style={{overflow:'auto',borderRadius:0}}>
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
                                                    this.filterPayedAdvert(this.props.withdraws).length>0
                                                        ?
                                                        (
                                                            this.filterPayedAdvert(this.props.withdraws).map(withdraw=>(
                                                                <TableRow key={withdraw.id}>
                                                                    <TableCell align='left'>{`${withdraw.user.first_name} ${withdraw.user.last_name}`}</TableCell>
                                                                    <TableCell align='left'>{`${withdraw.payer.first_name} ${withdraw.payer.last_name}`}</TableCell>
                                                                    <TableCell>{`${withdraw.amount} ETB`}</TableCell>
                                                                    <TableCell>
                                                                        {
                                                                            `${withdraw.payment_date}`
                                                                        }
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        <div>
                                                                            <Button
                                                                                style={{textTransform:'none'}}
                                                                                size='small'
                                                                                color='secondary'
                                                                                variant='outlined'>
                                                                                More info
                                                                            </Button>

                                                                        </div>
                                                                    </TableCell>
                                                                </TableRow>
                                                            ))
                                                        )
                                                        :
                                                        (
                                                            <TableRow>
                                                                <TableCell colSpan={5}>
                                                                    <Typography>There is no registered users</Typography>
                                                                </TableCell>
                                                            </TableRow>
                                                        )
                                                }
                                            </TableBody>
                                        </Table>
                                    </Paper>
                                )
                        }

                    </CardContent>
                </Card>
            </Container>
        );
    }
}

const mapStateToProps = state=>({
    withdraws:state.authReducer.adminReducers.withdrawReducer.withdrawals,
    loading:state.authReducer.adminReducers.withdrawReducer.loading
})

export default connect(mapStateToProps,{fetchWithdrawal})
(PayedWithdrawRequest);