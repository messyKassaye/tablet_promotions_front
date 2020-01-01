import React from "react";
import {GridListTile} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import {deepPurple} from "@material-ui/core/colors";
import Button from "@material-ui/core/Button";
import CardActions from "@material-ui/core/CardActions";
import withStyles from "@material-ui/core/styles/withStyles";
import boxStyle from "../../styles/boxStyle";
import Divider from "@material-ui/core/Divider";
import {withRouter} from 'react-router-dom'
import AdvertPaymentTransaction from "../../../commons/components/AdvertPaymentTransaction";
import {showMainDialog} from "../../../admin/state/action/dialogAction";
import {connect} from "react-redux";
class AdvertPayment extends React.Component{
    constructor(props) {
        super(props);


        this.payNow = this.payNow.bind(this)

    }

    calculatePayment = (expectedViews,paymentPerView)=>{
        return expectedViews * paymentPerView
    }

    payNow = (advert)=>{
        this.props.showMainDialog({
            show:true,
            page: <AdvertPaymentTransaction advert={advert}/>,
            title: `Payment for ${advert.product_name}`,
            actions:{
                on:false,
                path: '',
                id:''
            }
        })
    }

    render() {
        const {classes} = this.props
        return (
            <GridListTile className={classes.box}>
                <Card elevation={0}>
                    <CardHeader
                     title={'Payment status'}
                     avatar={<AttachMoneyIcon/>}
                    />
                    <Divider/>
                    <CardContent>
                        {
                            <div>
                                <Typography>
                                    {`Total payment : 
                                    ${this.calculatePayment(this.props.adverts.required_views_number,this.props.adverts.advert_media_type.per_view_payment).toLocaleString()} ETB`}
                                </Typography>
                                <div style={{display:'flex',flexDirection:'row',justifyContent:'start',alignItems:"center"}}>
                                    <Typography>
                                        {`Payment : `}
                                    </Typography>
                                    <span style={{color:deepPurple[500]}}>{this.props.adverts.payment_status!==null?'Payed':'Not payed yet'}</span>
                                </div>
                            </div>
                        }
                    </CardContent>
                    {
                        this.props.adverts.payment_status!==null
                        ?
                            ''
                        :
                            (
                                <CardActions style={{display:'flex',justifyContent:'flex-end'}}>
                                    <Button
                                        onClick={()=>this.payNow(this.props.adverts)}
                                        style={{textTransform:'capitalize'}}
                                        color='secondary'
                                        variant='outlined'
                                        size={"small"}>
                                        Pay now
                                    </Button>
                                </CardActions>
                            )
                    }
                </Card>
            </GridListTile>
        );
    }

}

export default connect(null,{showMainDialog})(withRouter(withStyles(boxStyle)(AdvertPayment)))
