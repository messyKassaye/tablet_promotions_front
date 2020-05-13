import React from "react";
import {Table, Typography} from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import {paymentFetch} from "../../state/actions/paymentActions";
import {connect} from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
import TableCell from "@material-ui/core/TableCell";
import CardHeader from "@material-ui/core/CardHeader";
import Button from "@material-ui/core/Button";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import finacePayment from "../../style/financePayment";
import Payment from "./smallDevices/Payment";
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
        id:'payed_at',
        minWidth: 150,
        label: 'Payed at',
        format: value => value.toLocaleString(),
    },
    {
        id:'amount',
        minWidth: 150,
        label: 'Amount',
        align:'right',
        format: value => value.toLocaleString(),
    },
    {
        id:'description',
        minWidth: 170,
        label: 'Description',
        align:'right',
        format: value => value.toLocaleString(),
    },
    {
        id:'payment_type',
        minWidth: 150,
        label: 'Payment type',
        align:'right',
        format: value => value.toLocaleString(),
    },
    {
        id:'week',
        minWidth: 150,
        label: 'Week',
        align:'right',
        format: value => value.toLocaleString(),
    },
    {
        id:'action',
        minWidth: 170,
        label: 'Actions',
        align:'right',
        format: value => value.toLocaleString(),
    },
]
class FinancePayments extends React.Component{

    constructor(props) {
        super(props);

    }

    componentDidMount() {
        this.props.paymentFetch()
    }

    render() {
        const {classes,t} = this.props
        return (
            <div>
                {
                    this.props.loading
                    ?
                        (
                          <React.Fragment>
                              <Skeleton variant='text'/>
                              <Skeleton variant='rect' width='80%' height={10}/>
                              <Skeleton variant='text' width='80%' height={10}/>
                          </React.Fragment>
                        )
                    :
                        (
                            <div>
                            <div className={classes.small_device}>
                                <Payment payments={this.props.payments}/>
                            </div>
                            <div className={classes.big_device}>
                                <Card elevation={0}>
                                    <CardHeader
                                        title={`${t('driver.finance.payments.title')}`}
                                    />
                                    <CardContent style={{overflow:'auto',maxHeight:250}}>

                                            <Table>
                                                <TableHead>
                                                    <TableRow>
                                                        {columns.map(column => (
                                                            <StyledTableCell
                                                                key={column.id}
                                                                align={column.align}
                                                                style={{ minWidth: column.minWidth }}
                                                            >
                                                                {`${t(`driver.finance.payments.table.${column.id}`)}`}
                                                            </StyledTableCell>
                                                        ))}
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {
                                                        this.props.payments.length>0
                                                        ?
                                                            (
                                                                this.props.payments.map(row=>{
                                                                    return (
                                                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                                                            {columns.map(column => {
                                                                                const value = row[column.id];
                                                                                if(column.id==='detail'){
                                                                                    return (
                                                                                        <TableCell key={column.id} align={column.align}>
                                                                                            {
                                                                                                <Button color='secondary' variant='outlined'>
                                                                                                    Show
                                                                                                </Button>
                                                                                            }
                                                                                        </TableCell>
                                                                                    );
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
                                                        :
                                                            (
                                                               <div>
                                                                   <Typography style={{textAlign:'center'}}>There is no payment data</Typography>
                                                               </div>
                                                            )
                                                    }
                                                </TableBody>
                                            </Table>
                                    </CardContent>
                                </Card>
                                </div>
                    </div>

                        )
                }
            </div>
        );
    }

}

const mapStateToProps = state=>(
    {
        payments: state.authReducer.driversReducers.paymentsData.payments,
        loading:state.authReducer.driversReducers.paymentsData.loading
    }
)

export default translate("common")
(connect(mapStateToProps,{paymentFetch})(withStyles(finacePayment)(FinancePayments)))
