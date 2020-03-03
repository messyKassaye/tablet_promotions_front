import React, {Component} from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import myAdvertsForPhone from "../../styles/myAdvertForPhoneStyle";
import Typography from "@material-ui/core/Typography";
import {deepPurple, green, red} from "@material-ui/core/colors";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import AdvertPaymentTransaction from "../../../commons/components/AdvertPaymentTransaction";
import {connect} from "react-redux";
import {showMainDialog} from "../../../admin/state/action/dialogAction";
import AdvertMediaFileUploader from "../../../commons/components/AdvertMediaFileUploader";

class MyAdvertsForPhone extends Component {

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

    paymentStatus = advert => {
        if (advert.payment_status === null && advert.status === 'on_progress') {
            return <div style={{display: 'flex', flexDirection: 'column'}}>
                <span style={{color: red[500]}}>Payment is not done.</span>
                <Button
                    onClick={() => {
                        this.props.showMainDialog({
                            show: true,
                            page: <AdvertPaymentTransaction advert={advert}/>,
                            title: `Payment for ${advert.product_name}`,
                            actions: {
                                on: false,
                                path: '',
                                id: ''
                            }
                        })
                    }}
                    color='primary'
                    variant='outlined'
                    size='small' style={{textTransform: "none"}}>
                    Pay now
                </Button>
            </div>
        } else if (advert.payment_status !== null && advert.status === 'on_advert') {
            return <div style={{display: 'flex', flexDirection: 'column'}}>
                {
                    advert.media_path === 'not_assigned'
                        ?
                        (
                            <AdvertMediaFileUploader advert={advert}/>
                        )
                        :
                        (
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'flex-end'
                            }}>
                                <span>This product is On advert Air</span>
                            </div>
                        )
                }
            </div>
        } else if (advert.payment_status !== null && advert.status === 'on_progress') {
            return <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-end'}}>
                <span>Payment is done and on process</span>
                <Button
                    onClick={() => this.complain(advert)}
                    color='primary'
                    variant='outlined'
                    size='small' style={{textTransform: 'none'}}>
                    Complain
                </Button>
            </div>
        }
    }


    render() {
        const {classes} = this.props
        return (
           <div className={classes.container}>
               {
                   <div className={classes.myAdvertHeader}>
                       {
                           this.paymentStatus(this.props.adverts)
                       }
                   </div>
               }
               <div className={classes.innerCard}>
                   <div>
                       <Typography style={{color:green[500]}}>Media status</Typography>
                       <Typography>{`Type : ${this.props.adverts.advert_media_type.name}`}</Typography>
                       <Typography>{`Payment : ${this.props.adverts.advert_media_type.per_view_payment} ETB`}</Typography>
                       <Divider className={classes.divider}/>
                   </div>
               </div>

               <div className={classes.innerCard}>
                   <div>
                       <Typography style={{color:green[500]}}>Advertisement place</Typography>
                       <div>
                           <Typography>
                               {`Country : ${this.props.adverts.places.map(place=>{return place.country})}`}
                           </Typography>
                           <Typography>
                               {`City : ${this.props.adverts.places.map(place=>{return place.city})}`}
                           </Typography>
                       </div>
                       <Divider className={classes.divider}/>
                   </div>
               </div>

               <div className={classes.innerCard}>
                   <div>
                       <Typography style={{color:green[500]}}>Advertisement views</Typography>
                       <div>
                           <Typography>
                               {`Expected view : ${this.props.adverts.required_views_number.toLocaleString()}`}
                           </Typography>
                           <div style={{display:'flex',flexDirection:'row',justifyContent:'start',alignItems:"center"}}>
                               <Typography>
                                   {`Current views :  ${this.props.adverts.car_advert.length}`}
                               </Typography>
                           </div>
                       </div>
                       <Divider className={classes.divider}/>
                   </div>
               </div>

               <div className={classes.innerCard}>

                   <div>
                       <Typography style={{color:green[500]}}>Payment status</Typography>
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

                               {
                                   this.props.adverts.payment_status !== null
                                       ?
                                       ''
                                       :
                                       (
                                           <Button
                                               onClick={()=>this.payNow(this.props.adverts)}
                                               style={{textTransform:'capitalize',marginLeft:10}}
                                               color='secondary'
                                               variant='outlined'
                                               size={"small"}>
                                               Pay now
                                           </Button>
                                       )
                               }

                           </div>
                       </div>
                       <Divider className={classes.divider}/>
                   </div>
               </div>

           </div>
        );
    }
}

export default connect(null,{showMainDialog})(withStyles(myAdvertsForPhone)(MyAdvertsForPhone));
