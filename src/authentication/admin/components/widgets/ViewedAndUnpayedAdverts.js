import React, {Component} from 'react';
import {Card, CardContent, CardHeader, Divider} from "@material-ui/core";
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
import Typography from "@material-ui/core/Typography";
import AttachMoneyIcon from '@material-ui/icons/AttachMoney'
import CloseIcon from '@material-ui/icons/Close'
import IconButton from "@material-ui/core/IconButton";

import withStyles from "@material-ui/core/styles/withStyles";
import viewedAndUnpayedStyle from "../styles/viewedAndUnpayedStyle";
import ImageZoomer from "./ImageZoomer";

class ViewedAndUnpayedAdverts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewedAdverts: null,
            showerPayerCard:false,
            onProcess:0,
            status:'primary',
            showImage:false
        }

    }

    showDetail = (viewedAdvert) => {
        this.setState({
            viewedAdverts: viewedAdvert,
            showerPayerCard:true,
            onProcess:viewedAdvert.id
        })
    }
    closePayerCard = ()=>{
        this.setState({
            showerPayerCard:false
        })
    }

    process = (view)=>{
        let id = this.state.onProcess
        if(id===0){
            return 'Show detail'
        }else if(id===view.id){
            return 'On process'
        }else {
            return 'Show detail'
        }
    }

    showImage = ()=>{
        this.setState({
            showImage:!this.state.showImage
        })
    }

    pay = ()=>{
       console.log(this.state.viewedAdverts)
    }

    render() {
        const {classes} = this.props
        return (
            <div>
                <Card>
                    <CardHeader
                        title={'Viewed and not payed adverts'}
                        avatar={<VideocamIcon/>}
                    />
                    <Divider/>
                    <CardContent style={{padding: 0}}>

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
                                                                color={
                                                                    this.state.onProcess===viewedAdvert.id
                                                                    ?
                                                                        'secondary'
                                                                    :
                                                                        'primary'
                                                                }
                                                                onClick={() => this.showDetail(viewedAdvert)}
                                                                style={{textTransform: 'none'}}>
                                                                {
                                                                    this.process(viewedAdvert)
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

                {
                    this.state.showerPayerCard
                    ?
                        (
                            <div style={{display:'flex'}}>
                                <Card className={classes.payerCard}>
                                    <CardHeader
                                        className={classes.payerCardHeader}
                                        title={'Advert payment information'}
                                        avatar={<AttachMoneyIcon/>}
                                        action={<IconButton onClick={this.closePayerCard} color={"inherit"}><CloseIcon/></IconButton>}
                                    />
                                    <Divider/>
                                    <CardContent style={{padding: 0}}>
                                        {
                                            this.state.viewedAdverts === null
                                                ?
                                                (
                                                    <div style={{display: 'flex', justifyContent: 'center', padding: 20}}>
                                                        <Typography>
                                                            There is no selected advert for payment.
                                                        </Typography>
                                                    </div>
                                                )
                                                :
                                                (
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
                                                                <TableCell>Car plate number: </TableCell>
                                                                <TableCell>{this.state.viewedAdverts.car[0].plate_number}</TableCell>
                                                            </TableRow>

                                                            <TableRow>
                                                                <TableCell>Adverted on Tablet: </TableCell>
                                                                <TableCell>{this.state.viewedAdverts.car[0].tablet[0].serial_number}</TableCell>
                                                            </TableRow>

                                                            <TableRow>
                                                                <TableCell>Advert time: </TableCell>
                                                                <TableCell>{this.state.viewedAdverts.advert_time}</TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell>Number of viewers: </TableCell>
                                                                <TableCell>{this.state.viewedAdverts.number_of_viewers}</TableCell>
                                                            </TableRow>

                                                            <TableRow>
                                                                <TableCell>Viewers picture: </TableCell>
                                                                <TableCell>
                                                                    <Button
                                                                        color={
                                                                            this.state.showImage
                                                                            ?
                                                                                'secondary'
                                                                            :
                                                                                'primary'
                                                                        }
                                                                        variant={"outlined"}
                                                                        size={"small"}
                                                                        style={{textTransform:'none'}}
                                                                        onClick={this.showImage}
                                                                    >
                                                                        {
                                                                            this.state.showImage
                                                                                ?
                                                                                'Close image'
                                                                                :
                                                                                'Show image'
                                                                        }
                                                                    </Button>
                                                                </TableCell>
                                                            </TableRow>

                                                            <TableRow>
                                                                <TableCell>
                                                                    <Button
                                                                        color={"secondary"}
                                                                        variant={"outlined"}
                                                                        style={{textTransform:'none'}}
                                                                    >
                                                                        Payment declined
                                                                    </Button>
                                                                </TableCell>
                                                                <TableCell>
                                                                    <Button
                                                                        onClick={this.pay}
                                                                        color={"primary"}
                                                                        variant={"contained"}
                                                                        style={{
                                                                            textTransform:'none',
                                                                            paddingLeft:50,
                                                                            paddingRight:50
                                                                        }}
                                                                    >
                                                                        Pay
                                                                    </Button>
                                                                </TableCell>
                                                            </TableRow>
                                                        </TableBody>
                                                    </Table>

                                                )
                                        }
                                    </CardContent>
                                </Card>
                                {
                                    this.state.showImage
                                    ?
                                        (
                                            <ImageZoomer show={this.state.showImage} advert={this.state.viewedAdverts}/>
                                        )
                                    :
                                        null
                                }
                            </div>
                        )
                    :
                        (
                            <div></div>
                        )
                }

            </div>
        );
    }
}

export default withStyles(viewedAndUnpayedStyle)(ViewedAndUnpayedAdverts);