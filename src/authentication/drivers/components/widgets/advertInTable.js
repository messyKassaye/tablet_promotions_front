import React from "react";
import {connect} from "react-redux";
import CardHeader from "@material-ui/core/CardHeader";
import TextField from "@material-ui/core/TextField";
import CardContent from "@material-ui/core/CardContent";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TablePagination from "@material-ui/core/TablePagination";
import Card from "@material-ui/core/Card";
import Skeleton from "@material-ui/lab/Skeleton";
import advertsStyle from "../../style/adverts";
import withStyles from "@material-ui/core/styles/withStyles";

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
        id: 'company_name',
        label: 'Company name',
        minWidth: 170
    },
    {
        id: 'phone_no',
        label: 'Phone no',
        align: 'right',
        format: value => value.toLocaleString(),
    },
    {
        id: 'media_type',
        label: 'Media type',
        minWidth: 150,
        align: 'right',
        format: value => value.toLocaleString(),
    },
    {
        id: 'payment',
        label: 'Payment',
        align: 'right',
        format: value => value.toFixed(2),
    },
    {
        id: 'advertising_time',
        label: 'Advertising time',
        minWidth: 150,
        align: 'right',
        format: value => value.toFixed(2),
    },
    {
        id: 'weeks',
        label: 'Week',
        align: 'right',
        format: value => value.toFixed(2),
    },
    {
        id: 'status',
        label: 'Payment status',
        minWidth: 150,
        align: 'right',
        format: value => value.toFixed(2),
    },
    {
        id: 'financing_time',
        label: 'Financing time',
        minWidth: 150,
        align: 'right',
        format: value => value.toFixed(2),
    },
];

const rows = [];

class AdvertInTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            rowsPerPage: 10
        }

    }

    render() {
        const {classes} = this.props
        return (
            <div>
                {
                    this.props.loading
                        ?
                        (
                            <Skeleton variant='rect' width='100%' height='500'/>
                        )
                        :
                        (
                            <Card>
                                <CardHeader
                                    className={classes.card_header}
                                    title='Your adverts'
                                />
                                <CardContent>
                                        <div className={classes.tableWrapper}>
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
                                                        this.props.user.map(items => items.relations.cars.map(cars => cars.adverts.map(advert => (
                                                            <TableRow hover role="checkbox" tabIndex={-1}
                                                                      key={advert.id}>
                                                                <TableCell key='company_name'>
                                                                    {advert.detail.company.name}
                                                                </TableCell>
                                                                <TableCell key='phone' align={columns[1].align}>
                                                                    {advert.detail.company.phone}
                                                                </TableCell>
                                                                <TableCell key='media_type' align={columns[1].align}>
                                                                    {advert.detail.advert_media_type.name}
                                                                </TableCell>
                                                                <TableCell key='payment' align={columns[1].align}>
                                                                    {
                                                                        `${advert.detail.advert_media_type.per_view_payment} ${advert.detail.advert_media_type.currency.symbol}`
                                                                    }
                                                                </TableCell>
                                                                <TableCell key='advert_time' align={columns[1].align}>
                                                                    {
                                                                        advert.advert_time
                                                                    }
                                                                </TableCell>
                                                                <TableCell key='weeks' align={columns[1].align}>
                                                                    {
                                                                        `Week ${advert.weeks.map(week => {
                                                                            return week.week_no
                                                                        })}`
                                                                    }
                                                                </TableCell>
                                                                <TableCell key='status' align={columns[1].align}>
                                                                    {
                                                                        advert.status
                                                                    }
                                                                </TableCell>
                                                                <TableCell key='financing_time'
                                                                           align={columns[1].align}>
                                                                    {
                                                                        advert.financing_time === '' ? 'On progress' : advert.financing_time
                                                                    }
                                                                </TableCell>
                                                            </TableRow>
                                                        ))))
                                                    }
                                                </TableBody>
                                            </Table>
                                        </div>

                                </CardContent>
                            </Card>
                        )
                }

            </div>
        );
    }


}

const mapStateToProps = state => ({
    user: state.userData.user,
    loading: state.userData.loading
})

export default withStyles(advertsStyle)(connect(mapStateToProps)(AdvertInTable))
