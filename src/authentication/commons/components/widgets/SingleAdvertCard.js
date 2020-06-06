import React, {Component} from 'react';
import {green, red} from "@material-ui/core/colors";
import {Avatar, Button, Card, CardContent, CardHeader, Divider, Typography} from "@material-ui/core";
import AdvertPaymentTransaction from "../AdvertPaymentTransaction";
import AdvertMediaFileUploader from "../AdvertMediaFileUploader";
import AdvertPaymentComplain from "../AdvertPaymentComplain";
import {showMainDialog} from "../../../admin/state/action/dialogAction";
import {connect} from "react-redux";
class SingleAdvertCard extends Component {

    complain = advert => {
        this.props.showMainDialog({
            show: true,
            title: `Send your complain`,
            page: <AdvertPaymentComplain advert={advert}/>,
            actions: {
                on: false,
                path: '',
                id: ''
            }
        })
    }
    calculatePayment = (expectedViews,paymentPerView)=>{
        return expectedViews * paymentPerView
    }
    identifyMedia = advert=>{
        if(advert.advert_media_type.name==='Video'){
            return 'Play video'
        }else if(advert.advert_media_type.name==='Audio'){
            return 'Play audio'
        }else {
            return 'Show image'
        }
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
        } else if (advert.payment_status.approved_by !==null && advert.status === 'on_progress') {
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
                                <Typography style={{color:green[500]}}>This product is On advert Air</Typography>
                                <Button
                                    variant={"outlined"}
                                    color={"primary"}
                                    size={"small"}
                                    style={{textTransform:'none'}}
                                    onClick={()=>this.showMedia(advert)}
                                >
                                    {this.identifyMedia(advert)}
                                </Button>
                            </div>
                        )
                }
            </div>
        } else if (advert.payment_status !== null && advert.status === 'on_progress') {
            return <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-end'}}>
                <span>Payment is not done and on process</span>
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
        const {advert} = this.props
        return (
            <Card>
                <CardHeader
                    title={advert.product_name}
                    subheader={advert.company.name}
                    avatar={<Avatar>{advert.product_name.charAt(0)}</Avatar>}/>
                <Divider/>
                <CardContent>
                    <Typography style={{marginBottom:10}}>{`Expected play: ${advert.required_views_number.toLocaleString()}`}</Typography>
                    <Typography style={{marginBottom:10}}>{`Total payment : ${this.calculatePayment(advert.required_views_number,advert.advert_media_type.per_view_payment).toLocaleString()} ETB`}</Typography>
                    <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                        {this.paymentStatus(advert)}
                    </div>
                </CardContent>
            </Card>
        );
    }
}

export default connect(null,{showMainDialog})(SingleAdvertCard);