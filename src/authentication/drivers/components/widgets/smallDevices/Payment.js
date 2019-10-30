import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import {deepPurple} from "@material-ui/core/colors";
import {Typography} from "@material-ui/core";
class Payment extends React.Component{

    constructor(props) {
        super(props);

    }

    render() {
        const {payments}=this.props
        return (
            <Grid container spacing={2}>
                {
                    payments.map(payment=>(
                        <Grid key={payment.id} item xs={12}>
                            <Paper style={{display:'flex',flexDirection:'column',backgroundColor:deepPurple[500],color:'white',padding:5}}>
                                <div style={{display:'flex',flexDirection:'row',marginBottom:10}}>
                                    <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                                        <Typography variant="body2">Payed at = </Typography>
                                    </div>
                                    <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                                        <Typography variant="body2">{payment.payed_at}</Typography>
                                    </div>
                                </div>

                                <div style={{display:'flex',flexDirection:'row'}}>
                                    <div style={{display:'flex',justifyContent:'end',alignItems:'center'}}>
                                        <Typography variant="body2">Amount = </Typography>
                                    </div>
                                    <div style={{display:'flex',justifyContent:'start',alignItems:'center'}}>
                                        <Typography variant="body2">{payment.amount}</Typography>
                                    </div>
                                </div>

                                <div style={{display:'flex',flexDirection:'row'}}>
                                    <div style={{display:'flex',justifyContent:'end',alignItems:'center'}}>
                                        <Typography variant="body2">Week = </Typography>
                                    </div>
                                    <div style={{display:'flex',justifyContent:'start',alignItems:'center'}}>
                                        <Typography variant="body2">{payment.week}</Typography>
                                    </div>
                                </div>

                                <div style={{display:'flex',flexDirection:'row'}}>
                                    <div style={{display:'flex',justifyContent:'end',alignItems:'center'}}>
                                        <Typography variant="body2">Payment type = </Typography>
                                    </div>
                                    <div style={{display:'flex',justifyContent:'start',alignItems:'center'}}>
                                        <Typography variant="body2">{payment.payment_type}</Typography>
                                    </div>
                                </div>
                            </Paper>
                        </Grid>
                    ))
                }
            </Grid>
        );
    }


}

export default Payment