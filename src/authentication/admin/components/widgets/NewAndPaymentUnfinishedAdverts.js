import React, {Component} from 'react';
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
import {unfinishedPaymentColumn as columns} from "../../data/columns";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import Button from "@material-ui/core/Button";
import {StyledTableCell} from "../AdminAdverts";
import {connect} from "react-redux";
import {Typography} from "@material-ui/core";
import {showMainDialog} from "../../state/action/dialogAction";
import DeleteMessage from "../../dialogs/component/DeleteMessage";
import withStyles from "@material-ui/core/styles/withStyles";


class NewAndPaymentUnfinishedAdverts extends Component {

    totalPayment = (requiredViews,payment)=>{
        return requiredViews*payment
    }

    removeAdvert = (advert)=>{
      this.props.showMainDialog({
          show:true,
          page:<DeleteMessage message={`Are you sure you want to delete ${advert.product_name}`}/>,
          title:'confirm',
          actions:{
              on:true,
              path:'adverts',
              id:advert.id
          }
      })
    }

    render() {
        return (
            <Card style={{maxWidth:'97%'}}>
                <CardHeader
                    avatar={<VideoCamIcon/>}
                    title='New and payment unfinished adverts'
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
                                <Paper style={{overflow:'auto',borderRadius:0,maxHeight:'300px'}}>
                                    <Table stickyHeader>
                                        <TableHead>
                                            <TableRow>
                                                {columns.map(column => (
                                                    <TableCell
                                                        key={column.id}
                                                        align={column.align}
                                                        style={{minWidth: column.minWidth,position:'sticky',top:0,backgroundColor: '#3C4252',
                                                            color: 'white',zIndex:1000}}
                                                    >
                                                        {column.label}
                                                    </TableCell>
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
                                                                    {`${this.totalPayment(advert.required_views_number,advert.media.per_view_payment).toLocaleString()} ETB`}
                                                                </TableCell>

                                                                <TableCell key={'actions'}>
                                                                    <div style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                                                                        <Button
                                                                            onClick={()=>this.removeAdvert(advert)}
                                                                            color='secondary'
                                                                            variant='outlined'
                                                                            style={{textTransform:'none',marginRight:10}}
                                                                            size='small'>
                                                                            Remove
                                                                        </Button>
                                                                        <Button
                                                                            color='secondary'
                                                                            variant='outlined'
                                                                            style={{textTransform:'none'}}
                                                                            size='small'>
                                                                            Detail
                                                                        </Button>
                                                                    </div>
                                                                </TableCell>

                                                            </TableRow>
                                                        ))
                                                    )
                                                :
                                                    (
                                                        <TableRow>
                                                            <TableCell colSpan={9}>
                                                                There is no new adverts yet ):
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

export default connect(mapStateToProps,{showMainDialog})(NewAndPaymentUnfinishedAdverts);
