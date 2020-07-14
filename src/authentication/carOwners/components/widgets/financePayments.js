import React from "react";
import {Table, Typography,Container} from "@material-ui/core";
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
        id:1,
        minWidth: 250,
        label: 'Company name',
        format: value => value.toLocaleString(),
    },
    {
        id:2,
        minWidth: 250,
        label: 'Adverted product',
        align:'left',
        format: value => value.toLocaleString(),
    },
    {
        id:'advert_time',
        minWidth: 170,
        label: 'Advert time',
        align:'left',
        format: value => value.toLocaleString(),
    },
    {
        id:'total_payment',
        minWidth: 150,
        label: 'Total payment',
        align:'left',
        format: value => value.toLocaleString(),
    },
    {
        id:'status',
        minWidth: 150,
        label: 'Status',
        align:'left',
        format: value => value.toLocaleString(),
    }
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
            <Container maxWidth={'md'}>
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
                                                                {column.label}
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
                                                                            <TableCell align={"left"}>{row.car_advert.map(car=>{
                                                                                return car.company_name
                                                                            })}</TableCell>
                                                                            <TableCell align={"left"}>{row.car_advert.map(car=>{
                                                                                return car.product_name
                                                                            })}</TableCell>
                                                                            <TableCell align={"left"}>{row.car_advert.map(car=>{
                                                                                return car.advert_time
                                                                            })}</TableCell>
                                                                            <TableCell align={"left"}>{row.total_payment}</TableCell>
                                                                            <TableCell align={"left"}>{row.car_advert.map(car=>{
                                                                                return car.status
                                                                            })}</TableCell>
                                                                        </TableRow>
                                                                    )
                                                                })
                                                            )
                                                        :
                                                            (
                                                               <TableRow>
                                                                   <TableCell style={{textAlign:'center'}}>There is no payment data</TableCell>
                                                               </TableRow>
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
            </Container>
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
