import React, {Component} from 'react';
import {Card} from "@material-ui/core";
import VideocamIcon from '@material-ui/icons/Videocam'
import CardHeader from "@material-ui/core/CardHeader";
import {onAirColumns as columns} from "../../data/columns";
import Divider from "@material-ui/core/Divider";
import CardContent from "@material-ui/core/CardContent";
import Table from "@material-ui/core/Table";
import {connect} from "react-redux";
import Grid from "@material-ui/core/Grid";
import Skeleton from "@material-ui/lab/Skeleton";
import {grey} from "@material-ui/core/colors";
import Paper from "@material-ui/core/Paper";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import {StyledTableCell} from "../AdminAdverts";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
class OnAirAdverts extends Component {

    totalPayment = (requiredViews,payment)=>{
        return requiredViews*payment
    }
    render() {
        return (
            <Card style={{marginTop:20}}>
                <CardHeader
                    avatar={<VideocamIcon/>}
                 title={'On air adverts'}
                    action={
                        <div style={{display:'flex',justifyContent:'center',alignItems:'flex-end'}}>
                            {
                                this.props.loading
                                    ?
                                    (
                                        <Skeleton
                                            width={100}
                                            height={20}
                                            variant='rect'
                                            style={{backgroundColor:grey[500]}}/>
                                    )
                                    :
                                    (
                                        <div style={{textAlign:'center'}}>
                                            <Typography color='primary'>{`${this.props.adverts.length} adverts`}</Typography>
                                        </div>
                                    )
                            }
                        </div>
                    }
                />
                <Divider/>
                <CardContent>
                    {
                        this.props.loading
                            ?
                            (
                                <Grid container spacing={2}>
                                    <Grid item md={12} xs={12}>
                                        <Skeleton width='100%' height={200} style={{backgroundColor:grey[500]}}/>
                                    </Grid>
                                </Grid>
                            )
                            :
                            (
                                <Paper style={{overflow:'auto'}}>
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
                                                this.props.adverts.length>0
                                                ?
                                                    (
                                                        this.props.adverts.map(advert => (
                                                            <TableRow hover role="checkbox" tabIndex={-1}
                                                                      key={advert.id}>
                                                                <TableCell key='company_name'>
                                                                    {advert.company.name}
                                                                </TableCell>

                                                                <TableCell key='phone' align={columns[1].align}>
                                                                    {advert.company.phone}
                                                                </TableCell>

                                                                <TableCell key='product_name' align={columns[1].align}>
                                                                    {advert.product_name}
                                                                </TableCell>

                                                                <TableCell key='required_views' align={columns[1].align}>
                                                                    {advert.required_views_number.toLocaleString()}
                                                                </TableCell>
                                                                <TableCell key={'current_views'}>
                                                                    {
                                                                            advert.views.length>0
                                                                            ?
                                                                                (
                                                                                   <div>
                                                                                       <span style={{marginRight:10}}>{advert.views.length.toLocaleString()}</span>
                                                                                       <Button
                                                                                           color='secondary'
                                                                                           variant='outlined'
                                                                                           size='small'>
                                                                                           Detail
                                                                                       </Button>
                                                                                   </div>
                                                                                )
                                                                            :
                                                                                (
                                                                                    <span>No views</span>
                                                                                )
                                                                    }
                                                                </TableCell>

                                                                <TableCell key='media_type' align={columns[1].align}>
                                                                    {
                                                                        advert.media.name
                                                                    }
                                                                </TableCell>

                                                                <TableCell key='total_payment'>
                                                                    {`${this.totalPayment(advert.required_views_number,advert.media.per_view_payment).toLocaleString()} ETB`}
                                                                </TableCell>
                                                            </TableRow>
                                                        ))
                                                    )
                                                :
                                                    (
                                                        <TableRow>
                                                            <TableCell colSpan={9} align='center' style={{width:'100%'}}>
                                                                <Typography style={{textAlign:'left'}}>
                                                                    There is no adverts on air
                                                                </Typography>
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
        );
    }
}

const mapStateToProps = state=>({
    loading:state.authReducer.adminReducers.advertReducer.loading,
})

export default connect(mapStateToProps)(OnAirAdverts);
