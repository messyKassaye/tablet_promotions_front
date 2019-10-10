import React from "react";
import {connect} from "react-redux";
import {me} from "../../../state/actions/usersActions";
import Skeleton from "@material-ui/lab/Skeleton";
import withStyles from "@material-ui/core/styles/withStyles";
import advertsStyle from "../../style/adverts";
import Table from "@material-ui/core/Table";
import Paper from "@material-ui/core/Paper";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TablePagination from "@material-ui/core/TablePagination";
import {CircularProgress} from "@material-ui/core";
const columns = [
    {
        id: 'company_name',
        label: 'Company name',
        minWidth: 170
    },
    {
        id: 'phone_no',
        label: 'Phone no',
        minWidth: 170,
        align: 'right',
        format: value => value.toLocaleString(),
    },
    {
        id: 'media_type',
        label: 'Media type',
        minWidth: 170,
        align: 'right',
        format: value => value.toLocaleString(),
    },
    {
        id: 'payment',
        label: 'Payment',
        minWidth: 170,
        align: 'right',
        format: value => value.toFixed(2),
    },
    {
        id: 'advertising_time',
        label: 'Advertising time',
        minWidth: 170,
        align: 'right',
        format: value => value.toFixed(2),
    },
    {
        id: 'financing_time',
        label: 'Financing time',
        minWidth: 170,
        align: 'right',
        format: value => value.toFixed(2),
    },
];

const rows = [];
class Adverts extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            page:0,
            rowsPerPage:10
        }

        this.handleChangePage = this.handleChangePage.bind(this)
        this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this)

    }

     handleChangePage = (event, newPage) => {

    };

     handleChangeRowsPerPage = event => {
         const {rowsPerPage} = this.state
         [rowsPerPage]+event.target.value
         this.setState(rowsPerPage)
         this.setState({
             rowsPerPage
         })
    };

    componentDidMount() {
        this.props.me()


    }

    render() {
        const {classes} = this.props
        return (
            <div>
                {
                    this.props.loading
                    ?
                        (
                            <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                                <CircularProgress/>
                            </div>
                        )
                    :
                        (
                            <Paper className={classes.root}>
                                <div className={classes.tableWrapper}>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                {columns.map(column => (
                                                    <TableCell
                                                        key={column.id}
                                                        align={column.align}
                                                        style={{ minWidth: column.minWidth }}
                                                    >
                                                        {column.label}
                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {
                                                this.props.user.
                                                map(items=>items.relations.cars.
                                                map(cars=>cars.adverts.map(advert=>(
                                                    <TableRow hover role="checkbox" tabIndex={-1} key={advert.id}>
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
                                                        <TableCell key='financing_time' align={columns[1].align}>
                                                            {
                                                              advert.financing_time
                                                            }
                                                        </TableCell>
                                                    </TableRow>
                                                ))))
                                            }
                                        </TableBody>
                                    </Table>
                                </div>
                                <TablePagination
                                    rowsPerPageOptions={[10, 25, 100]}
                                    component="div"
                                    count={rows.length}
                                    rowsPerPage={this.state.rowsPerPage}
                                    page={this.state.page}
                                    backIconButtonProps={{
                                        'aria-label': 'previous page',
                                    }}
                                    nextIconButtonProps={{
                                        'aria-label': 'next page',
                                    }}
                                    onChangePage={this.handleChangePage}
                                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                />
                            </Paper>
                        )
                }
            </div>
        );
    }

}

const mapStateToProps = state=> ({
    user: state.userData.user,
    loading:state.userData.loading
})

export default withStyles(advertsStyle)(connect(mapStateToProps,{me})(Adverts))