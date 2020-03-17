import React, {Component} from 'react';
import {Typography} from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import {updateAdvert} from "../../state/action/advertsAction";
import {updateAdvertPaymentTransaction} from "../../state/action/advertPaymentTransactionAction";
import {showMainDialog} from "../../state/action/dialogAction";
import {connect} from "react-redux";
import LoadingButton from "../../../../home/components/widgets/LoadingButton";
import {green, grey} from "@material-ui/core/colors";
class AdvertPaymentApproval extends Component {

    constructor(props) {
        super(props);
        this.state = {

            submitted: false,
            loading: false,
            finished: false,
            message:'',
            messageColor:'black',
            formData:{
                status:''
            }
        }
    }


    totalPayment=(totalView,payment)=>{
        return totalView*payment;
    }

    approve = (advertId)=>{
        this.setState({
            message:'Approval on process',
            submitted: true,
            loading: true,
        })

        const {formData} = this.state
        formData['status']='on_advert'
        this.setState(formData)
        this.props.updateAdvertPaymentTransaction(this.props.advert.payment_status.id)
    }
    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.response.status) {
            this.setState({
                loading: false,
                finished: false,
                submitted: false,
                message:nextProps.response.message,
                messageColor:green[500]
            })
            setTimeout(()=>{
                this.props.showMainDialog({'show':false,'page':null,'title':'',actions:{on:false,path:'',id:''}})
            },2000)
        }
    }

    render() {
        const {loading} = this.state;
        const {finished} = this.state
        const setLoading = !finished && loading;
        const isEnabled = true
        return (

            <div style={{display:'flex',flexDirection:'column'}}>
                <Table>
                    <TableBody>

                        <TableRow>
                            <TableCell align='justify'>Product name</TableCell>
                            <TableCell align='justify'>{this.props.advert.product_name}</TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell>Total payment</TableCell>
                            <TableCell>{`${this.totalPayment(this.props.advert.required_views_number,this.props.advert.advert_media_type.per_view_payment).toLocaleString()} ETB`}</TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell>Payed via:</TableCell>
                            <TableCell>{this.props.advert.payment_status.bank.bank_name}</TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell>Payer name:</TableCell>
                            <TableCell>{this.props.advert.payment_status.deposited_by_name}</TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell>Transaction ref number</TableCell>
                            <TableCell>{this.props.advert.payment_status.transaction_ref_number}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                <div style={{display:'flex',flexDirection:'column',justifyContent:'center'}}>
                    <Typography>Receipt image</Typography>
                    <img src={this.props.advert.payment_status.receipt_image}/>
                </div>
                <div style={{display:'flex',flexDirection:'row',justifyContent:'flex-end',alignItems:'center',marginTop:20}}>

                {
                    this.props.advert.payment_status.approved_by===null
                    ?
                        (
                            <div>
                            <Typography style={{color:`${this.state.messageColor}`,marginRight:10}}>{this.state.message}</Typography>
                                <LoadingButton
                                    style={{textTransform:'none'}}
                                    color="primary"
                                    variant="contained"
                                    onClick={()=>this.approve(this.props.advert.id)}
                                    disabled={!isEnabled || this.state.submitted}
                                    loading={setLoading}
                                    text={'Approve'}
                                    done={finished}>
                                    Approve
                                </LoadingButton>
                            </div>
                        )
                    :
                        (
                            <div style={{display:'flex',flexDirection:'row'}}>
                                <Typography color={"primary"}>
                                    {`Payment is approved by: `}
                                </Typography>
                                <Typography style={{color:grey[500],marginLeft:15}}>
                                    {`${this.props.advert.payment_status.approved_by.first_name} ${this.props.advert.payment_status.approved_by.last_name}`}
                                </Typography>
                            </div>
                        )
                }
                </div>
            </div>
        );
    }
}

const mapStateToProps = state=>({
    response: state.authReducer.adminReducers.advertReducer.response,
    user:state.userData.user
})

export default connect(mapStateToProps,{updateAdvertPaymentTransaction,showMainDialog})(AdvertPaymentApproval);
