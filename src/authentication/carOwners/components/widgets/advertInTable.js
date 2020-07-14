import React from "react";
import {connect} from "react-redux";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
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
        label: 'Plate number',
        minWidth: 170
    },
    {
        id: 'phone_no',
        label: 'Total adverts',
        align: 'right',
        format: value => value.toLocaleString(),
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
                                                        this.props.user.relations.cars.map(cars =>(
                                                            <TableRow hover role="checkbox" tabIndex={-1}
                                                                      key={cars.id}>
                                                                <TableCell key='company_name'>
                                                                    {cars.plate_number}
                                                                </TableCell>
                                                                <TableCell key='phone' align={columns[1].align}>
                                                                    {cars.adverts}
                                                                </TableCell>

                                                            </TableRow>
                                                        ))
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
