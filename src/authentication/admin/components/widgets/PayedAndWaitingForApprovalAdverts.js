import React, {Component} from 'react';

import {
    payedAndNotApprovedAdvertsColumn as columns,
} from "../../data/columns";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import VideoCamIcon from '@material-ui/icons/Videocam'
import Divider from "@material-ui/core/Divider";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Skeleton from "@material-ui/lab/Skeleton";
import {grey} from "@material-ui/core/colors";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import Button from "@material-ui/core/Button";
import {StyledTableCell} from "../AdminAdverts";
import AdvertPaymentApproval from "../../dialogs/component/AdvertPaymentApproval";
import {showMainDialog} from "../../state/action/dialogAction";
import {connect} from "react-redux";
import {Typography} from "@material-ui/core";
class PayedAndWaitingForApprovalAdverts extends Component {

    constructor(props) {
        super(props);

    }


    showPaymentStatus = adverts=>{
        this.props.showMainDialog({show:true,
            page:<AdvertPaymentApproval advert={adverts}/>,
            title:'Payment status for advert',
            actions:{on:false,path:'',id:''}})
    }

    totalPayments = (requiredViews,payment)=>{
        return requiredViews*payment
    }

    render() {
        return (
        <Card style={{marginBottom:25,maxWidth:'97%'}}>
            <CardHeader
                avatar={<VideoCamIcon/>}
                title={'Payed and waiting for approval adverts '}
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
            <CardContent style={{padding:0}}>
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
                            <Paper style={{overflow:'auto',width:'100%',position:'relative',borderRadius:0}}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            {columns.map(column => (
                                                <StyledTableCell
                                                    key={column.id}
                                                    align={column.align}
                                                    style={{minWidth: column.minWidth,position:'sticky',top:0,zIndex:100}}
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
                                                            <TableCell key={'media'}>
                                                                {advert.media.name}
                                                            </TableCell>

                                                            <TableCell key='total_payment'>
                                                                {`${this.totalPayments(advert.required_views_number,advert.media.per_view_payment).toLocaleString()} ETB`}
                                                            </TableCell>
                                                            <TableCell>
                                                                <Button
                                                                    onClick={()=>this.showPaymentStatus(advert)}
                                                                    color='secondary'
                                                                    style={{textTransform:'none'}}
                                                                    variant='outlined'>
                                                                    Show
                                                                </Button>
                                                            </TableCell>
                                                        </TableRow>
                                                    ))
                                                )
                                            :
                                                (
                                                    <TableRow>
                                                        <TableCell colSpan={9}>
                                                            There is no waiting adverts for approval
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


export default connect(mapStateToProps,{showMainDialog})(PayedAndWaitingForApprovalAdverts);
