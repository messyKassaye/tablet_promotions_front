import React, {Component} from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import advertInTableStyle from "../styles/advertsInTableStyle";
import {advertsInTableColumn as columns} from "../../data/columns";
import {Card, CardContent, CardHeader, Container, Divider} from "@material-ui/core";
import VideocamIcon from "@material-ui/icons/Videocam";
import Skeleton from "@material-ui/lab/Skeleton";
import {grey} from "@material-ui/core/colors";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import {StyledTableCell} from "../AdminAdverts";
import TableBody from "@material-ui/core/TableBody";
import Grid from "@material-ui/core/Grid";
import {connect} from "react-redux";
import {fetchAdverts} from "../../state/action/advertsAction";
import TableCell from "@material-ui/core/TableCell";
import Button from "@material-ui/core/Button";
import nFormatter from "../../../services/MainServices";

class AdvertsInTable extends Component {

    calculatePayment = (expectedViews,paymentPerView)=>{
        return expectedViews * paymentPerView
    }
    render() {
        const {classes} = this.props
        return (
            <Grid container spacing={2}>
                <Grid item md={12} lg={12}>
                    <Container maxWidth={"lg"} style={{padding:0,marginTop:10}}>
                        <Card>
                            <CardHeader
                                title={'All adverts'}
                                avatar={<VideocamIcon/>}
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
                                                style={{backgroundColor: grey[500], padding: 0, position: 'relative'}}
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
                                                            >
                                                                {column.label}
                                                            </StyledTableCell>
                                                        ))}
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {
                                                        this.props.adverts
                                                            .map(advert=>(
                                                                <TableRow hover role="checkbox" tabIndex={-1}
                                                                          key={advert.id}>

                                                                    <TableCell key='request_id'
                                                                               align={columns[1].align}>
                                                                        {advert.company.name}
                                                                    </TableCell>

                                                                    <TableCell key='request_at'
                                                                               align={columns[1].align}>
                                                                        {advert.product_name}
                                                                    </TableCell>
                                                                    <TableCell key='ban_name'
                                                                               align={columns[1].align}>
                                                                        {advert.media.name}
                                                                    </TableCell>
                                                                    <TableCell key='full_name'
                                                                               align={columns[1].align}>
                                                                        {nFormatter(advert.required_views_number)}
                                                                    </TableCell>

                                                                    <TableCell key='full_name'
                                                                               align={columns[1].align}>
                                                                        {nFormatter(advert.current_view)}
                                                                    </TableCell>

                                                                    <TableCell key='holder_full_name'
                                                                               align={columns[1].align}>
                                                                        {`${nFormatter(this.calculatePayment(advert.required_views_number,advert.media.per_view_payment))} ETB`}
                                                                    </TableCell>
                                                                    <TableCell key='holder_full_name'
                                                                               align={columns[1].align}>
                                                                        {advert.status}
                                                                    </TableCell>
                                                                </TableRow>
                                                            ))
                                                    }
                                                </TableBody>
                                            </Table>
                                        )
                                }
                            </CardContent>
                        </Card>
                    </Container>
                </Grid>
            </Grid>
        );
    }
}
const mapStateToProps = state=>({
    adverts:state.authReducer.adminReducers.advertReducer.adverts,
    loading:state.authReducer.adminReducers.advertReducer.loading
})

export default connect(mapStateToProps,{fetchAdverts})
(withStyles(advertInTableStyle)(AdvertsInTable));