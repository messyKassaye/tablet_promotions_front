import React, {Component} from 'react';
import {Card, CardContent, Table, TableBody,
    TableCell, TableRow,Button} from "@material-ui/core";

class WithdrawRequestPayment extends Component {
    render() {
        return (
            <Card elevation={0}>
                <CardContent style={{padding:0}}>
                    <Table>
                        <TableBody>

                            <TableRow>
                                <TableCell>
                                    Request id:
                                </TableCell>
                                <TableCell>
                                    {`${this.props.withdraws.id}`}
                                </TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell>
                                    Total amount:
                                </TableCell>
                                <TableCell>
                                    {`${this.props.withdraws.amount} ETB`}
                                </TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell>
                                    Bank name:
                                </TableCell>
                                <TableCell>
                                    {`${this.props.withdraws.bank_account.bank.bank_name}`}
                                </TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell>
                                    Account holder name:
                                </TableCell>
                                <TableCell>
                                    {`${this.props.withdraws.bank_account.account_holder_full_name}`}
                                </TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell>
                                    Account number:
                                </TableCell>
                                <TableCell>
                                    {`${this.props.withdraws.bank_account.account_number}`}
                                </TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell>
                                    Actions
                                </TableCell>
                                <TableCell>
                                    <Button
                                        color={"secondary"}
                                        size={"small"}
                                        style={{textTransform:'none'}}
                                        variant={"outlined"}>
                                        Add to print table
                                    </Button>
                                </TableCell>
                            </TableRow>

                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        );
    }
}

export default WithdrawRequestPayment;