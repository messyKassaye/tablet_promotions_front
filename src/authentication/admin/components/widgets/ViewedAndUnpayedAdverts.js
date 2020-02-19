import React, {Component} from 'react';
import {Card, CardContent, CardHeader,Divider} from "@material-ui/core";
import VideocamIcon from '@material-ui/icons/Videocam'
import {viewedAdvertsColumn as columns} from "../../data/columns";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import {StyledTableCell} from "../AdminAdverts";
import TableBody from "@material-ui/core/TableBody";
import Paper from "@material-ui/core/Paper";
import TableCell from "@material-ui/core/TableCell";
import Button from "@material-ui/core/Button";
import LoadingButton from "../../../../home/components/widgets/LoadingButton";
import Typography from "@material-ui/core/Typography";
import {green} from "@material-ui/core/colors";

class ViewedAndUnpayedAdverts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewedAdverts:null
        }

    }

    showDetail = (viewedAdvert)=>{
        this.setState({
            viewedAdverts:viewedAdvert
        })
    }

    render() {
        return (
            <Card>
                <CardHeader
                 title={'Viewed and not payed adverts'}
                 avatar={<VideocamIcon/>}
                />
                <Divider/>
                <CardContent style={{padding:0}}>

                    <Paper style={{overflow:'auto',width:'100%',position:'relative',borderRadius:0,maxHeight:500}}>
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
                                            variant={"contained"}
                                            color={"primary"}
                                            onClick={()=>this.showDetail(viewedAdvert)}
                                            style={{textTransform:'none'}}>Detail</Button>
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

                    <div>
                        {
                            this.state.viewedAdverts===null
                            ?
                                (
                                    <div style={{display:'flex',justifyContent:'center',padding:20}}>
                                        <Typography style={{color:green[500]}}>
                                            There is no selected advert for payment.
                                        </Typography>
                                    </div>
                                )
                            :
                                (
                                    <div style={{display:'flex',flexDirection:'column',alignItems:'center',padding:20}}>
                                        <div style={{width:'70%'}}>
                                            <Card>
                                                <CardContent>
                                                    <Table>
                                                        <TableBody>
                                                            <TableRow>
                                                                <TableCell>Company name: </TableCell>
                                                                <TableCell>{this.state.viewedAdverts.advert[0].company.name}</TableCell>
                                                            </TableRow>

                                                            <TableRow>
                                                                <TableCell>Product name: </TableCell>
                                                                <TableCell>{this.state.viewedAdverts.advert[0].product_name}</TableCell>
                                                            </TableRow>

                                                            <TableRow>
                                                                <TableCell>Advert time: </TableCell>
                                                                <TableCell>{this.state.viewedAdverts.advert_time}</TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell>Number of viewers: </TableCell>
                                                                <TableCell>{this.state.viewedAdverts.number_of_viewers}</TableCell>
                                                            </TableRow>
                                                        </TableBody>
                                                    </Table>

                                                </CardContent>
                                            </Card>
                                        </div>
                                    </div>
                                )
                        }
                    </div>
                </CardContent>
            </Card>
        );
    }
}

export default ViewedAndUnpayedAdverts;