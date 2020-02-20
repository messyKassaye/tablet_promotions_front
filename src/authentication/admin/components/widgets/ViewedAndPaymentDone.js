import React, {Component} from 'react';
import {Card, CardContent, CardHeader,Divider} from "@material-ui/core";
import VideocamIcon from '@material-ui/icons/Videocam'
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import {viewedAdvertsColumn as columns} from "../../data/columns";
import {StyledTableCell} from "../AdminAdverts";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

class ViewedAndPaymentDone extends Component {
    render() {
        return (
            <Card>
                <CardHeader
                 title={'Viewed and payed adverts'}
                 avatar={<VideocamIcon/>}
                />
                <Divider/>
                <CardContent>
                    <Paper style={{
                        overflow: 'auto',
                        width: '100%',
                        position: 'relative',
                        borderRadius: 0,
                        maxHeight: 500
                    }}>
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

                                    this.props.adverts.length > 0
                                        ?
                                        (
                                            this.props.adverts.map(viewedAdvert => (
                                                <TableRow hover role="checkbox" tabIndex={-1}
                                                          key={viewedAdvert.id}>

                                                    <TableCell key='product_name' align={columns[1].align}>
                                                        {viewedAdvert.advert[0].product_name}
                                                    </TableCell>

                                                    <TableCell key='plate_number' align={columns[1].align}>
                                                        {viewedAdvert.car[0].plate_number}
                                                    </TableCell>

                                                    <TableCell key='required_views' align={columns[1].align}>
                                                        {viewedAdvert.car[0].tablet[0].serial_number}
                                                    </TableCell>


                                                    <TableCell key='advert_time' align={columns[1].align}>
                                                        {
                                                            viewedAdvert.advert_time
                                                        }
                                                    </TableCell>

                                                    <TableCell key={'actions'}>
                                                        <Button
                                                            variant={"outlined"}
                                                            color={"primary"}
                                                            onClick={() => this.showDetail(viewedAdvert)}
                                                            style={{textTransform: 'none'}}>
                                                            {
                                                                'Detail'
                                                            }
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        )
                                        :
                                        (
                                            <TableRow>
                                                <TableCell colSpan={9} align='center' style={{width: '100%'}}>
                                                    <Typography style={{textAlign: 'left'}}>
                                                        There is no viewed adverts
                                                    </Typography>
                                                </TableCell>
                                            </TableRow>
                                        )
                                }

                            </TableBody>
                        </Table>
                    </Paper>

                </CardContent>
            </Card>
        );
    }
}

export default ViewedAndPaymentDone;