import React, {Component} from 'react';
import {Container, Grid, Typography,Chip,Divider,Button} from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import userStyle from "../../style/usersStyle";
import MusicVideoIcon from '@material-ui/icons/MusicVideo';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import TimelineIcon from '@material-ui/icons/Timeline';
import {green, grey} from "@material-ui/core/colors";
import BusinessIcon from '@material-ui/icons/Business';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney'
import {Link} from "react-router-dom";
import VisibilityIcon from '@material-ui/icons/Visibility';
import {connect} from "react-redux";
import {showMainDialog} from "../../../admin/state/action/dialogAction";

class AdvertProfileTab extends Component {

    showReceiptImage = advert=>{
        const page = <div>
            <img src={advert.payment_status.receipt_image}/>
        </div>
        this.props.showMainDialog({
            show:true,
            page:page,
            title:'Add new advert',
            actions:{
                on:false,
                path:'',
                id:''
            }
        })
    }

    totalPayment=(totalView,payment)=>{
        return totalView*payment;
    }
    render() {
        const {advert, classes} = this.props
        return (
            <Container maxWidth={"lg"}>
                <Grid container spacing={2}>
                    <Grid item md={12} xs={12} sm={12}>
                        <div className={classes.profileContainer}>

                            <div className={classes.profileRowCard}>
                                <Typography className={classes.profileRowFirstLabel}>
                                    <MusicVideoIcon color={"primary"} style={{marginRight: 10}}/> Media type:
                                </Typography>
                                <Typography className={classes.profileRowSecondLabel}>
                                    {advert.advert_media_type.name}
                                </Typography>
                            </div>

                            <div className={classes.profileRowCard}>
                                <Typography className={classes.profileRowFirstLabel}>
                                    <PlayArrowIcon color={"primary"} style={{marginRight: 10}}/> Expected play:
                                </Typography>
                                <Typography className={classes.profileRowSecondLabel}>
                                    {advert.required_views_number.toLocaleString()}
                                </Typography>
                            </div>

                            <div className={classes.profileRowCard}>
                                <Typography className={classes.profileRowFirstLabel}>
                                    <PlayArrowIcon color={"primary"} style={{marginRight: 10}}/> Current play:
                                </Typography>
                                <Typography className={classes.profileRowSecondLabel}>
                                    {advert.views.toLocaleString()}
                                </Typography>
                            </div>
                            <div className={classes.profileRowCard}>
                                <Typography className={classes.profileRowFirstLabel}>
                                    <VisibilityIcon color={"primary"} style={{marginRight: 10}}/> Number of viewers:
                                </Typography>
                                <Typography className={classes.profileRowSecondLabel}>
                                    {advert.peoplesView.toLocaleString()}
                                </Typography>
                            </div>

                            <div className={classes.profileRowCard}>
                                <Typography className={classes.profileRowFirstLabel}>
                                    <AttachMoneyIcon color={"primary"} style={{marginRight: 10}}/>
                                    Total payment:
                                </Typography>
                                <Typography className={classes.profileRowSecondLabel}>
                                    {`${this.totalPayment(advert.required_views_number,
                                        this.props.advert.advert_media_type.per_view_payment).toLocaleString()} ETB`
                                    }
                                </Typography>
                            </div>

                            <div className={classes.profileRowCard}>
                                <Typography className={classes.profileRowFirstLabel}>
                                    <TimelineIcon color={"primary"} style={{marginRight: 10}}/> Status:
                                </Typography>
                                <Chip label={advert.status}
                                      size={"small"}
                                      style={{backgroundColor:green[500],color:'white'}}
                                />
                            </div>

                            <div style={{marginTop:50,display:'flex',flexDirection:'column'}}>
                                <Typography className={classes.addressLabel}>
                                    <AttachMoneyIcon fontSize={"small"} color={"primary"} style={{marginRight:10}}/>
                                    Payment status
                                </Typography>
                                <Divider style={{marginBottom:15}}/>
                                {
                                    advert.payment_status.approved_by===null
                                    ?
                                        (
                                            <Typography color={"secondary"}>Not payed yet</Typography>
                                        )
                                    :
                                        (
                                            <div style={{display:'flex',flexDirection:'column'}}>

                                                <div className={classes.profileRowCard}>
                                                    <Typography className={classes.profileRowFirstLabel}>
                                                         Payer full name:
                                                    </Typography>
                                                    <Typography className={classes.profileRowSecondLabel}>
                                                        {advert.payment_status.deposited_by_name}
                                                    </Typography>
                                                </div>

                                                <div className={classes.profileRowCard}>
                                                    <Typography className={classes.profileRowFirstLabel}>
                                                        Transaction Ref number:
                                                    </Typography>
                                                    <Typography className={classes.profileRowSecondLabel}>
                                                        {advert.payment_status.transaction_ref_number}
                                                    </Typography>
                                                </div>

                                                <div className={classes.profileRowCard}>
                                                    <Typography className={classes.profileRowFirstLabel}>
                                                        Transaction date:
                                                    </Typography>
                                                    <Typography className={classes.profileRowSecondLabel}>
                                                        {advert.payment_status.transaction_date}
                                                    </Typography>
                                                </div>

                                                <div className={classes.profileRowCard}>
                                                    <Typography className={classes.profileRowFirstLabel}>
                                                        Receipt image:
                                                    </Typography>
                                                    <Typography className={classes.profileRowSecondLabel}>
                                                        <Button
                                                         color={"primary"}
                                                         variant={"outlined"}
                                                         size={"small"}
                                                         onClick={()=>this.showReceiptImage(advert)}
                                                         style={{textTransform:'none'}}
                                                        >
                                                            Show
                                                        </Button>
                                                    </Typography>
                                                </div>

                                                <div className={classes.profileRowCard}>
                                                    <Typography className={classes.profileRowFirstLabel}>
                                                        Payment approved by:
                                                    </Typography>
                                                    <Typography className={classes.profileRowSecondLabel}>
                                                        {`${advert.payment_status.approved_by.first_name} 
                                                          ${advert.payment_status.approved_by.last_name}`}
                                                    </Typography>
                                                </div>

                                            </div>
                                        )
                                }
                            </div>

                            <div style={{marginTop:50,display:'flex',flexDirection:'column'}}>
                                <Typography className={classes.addressLabel}>
                                    <BusinessIcon fontSize={"small"} color={"primary"} style={{marginRight:10}}/>
                                    Company
                                </Typography>
                                <Divider style={{marginBottom:15}}/>
                                <Typography className={classes.profileRowSecondLabel}>
                                    {advert.company.name}
                                </Typography>
                                <Typography className={classes.profileRowSecondLabel}>
                                    {advert.company.phone}
                                </Typography>
                                <Typography className={classes.profileRowSecondLabel}>
                                    {advert.company.website}
                                </Typography>
                            </div>

                        </div>
                    </Grid>
                </Grid>
            </Container>
        );
    }
}

export default connect(null,{showMainDialog})(withStyles(userStyle)(AdvertProfileTab));