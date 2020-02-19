import React, {Component} from 'react';
import {Container,Grid,AppBar} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import {fetchAdverts} from "../state/action/advertsAction";
import {connect} from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
import TableCell from "@material-ui/core/TableCell";
import adminAdvertStyle from "./styles/adminAdvertStyle";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from '@material-ui/icons/Add'
import {showMainDialog} from "../state/action/dialogAction";
import PayedAndWaitingForApprovalAdverts from "./widgets/PayedAndWaitingForApprovalAdverts";
import NewAndPaymentUnfinishedAdverts from "./widgets/NewAndPaymentUnfinishedAdverts";
import OnAirAdverts from "./widgets/OnAirAdverts";
import AddNewAdvert from "../../commons/components/AddNewAdvert";
import {fetchCompanies} from "../state/action/adminCompaniesAction";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PhoneIcon from '@material-ui/icons/Phone';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';
export const StyledTableCell = withStyles(theme => ({
    head: {
        backgroundColor: '#3C4252',
        color: theme.palette.common.white,
        position:'sticky'
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const rows = [];
class AdminAdverts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value:0
        }

    }
    handleChange = (value)=>{
        this.setState({
            value:value
        })
    }

    componentDidMount() {
        this.props.fetchAdverts()
        this.props.fetchCompanies()
    }

    addNewAdvert = ()=>{
        this.props.showMainDialog({
            show:true,
            page:<AddNewAdvert company={this.props.company}/>,
            title:'Add new advert',
            actions:{
                on:false,
                path:'',
                id:''
            }
        })
    }

    unfinishedPaymentAdverts = (data)=>{
      const unfinishedPaymentAdverts =  data.filter(items=>{
          return items.payment === null
      })
        return unfinishedPaymentAdverts
    }

    payedAndWaitingApprovalAdverts = (data)=>{
        const payedAndWaitingForApprovalAdverts = data.filter(advert=>{
            return advert.payment !== null && advert.status==='on_progress'
        })
        return payedAndWaitingForApprovalAdverts
    }

    onAirAdverts = (data)=>{
        const  onAirAdverts = data.filter(advert=>{
            return advert.status==='on_advert'
        })

        return onAirAdverts
    }


    render() {
        const {classes,t} = this.props
        return (
            <Container maxWidth='md'>
                <div style={{display:'flex',flexDirection:'column'}}>

                    <Card style={{marginBottom:20}}>
                        <CardHeader
                         title='Adverts'
                         action={
                             <IconButton color='inherit' onClick={this.addNewAdvert}>
                                 <AddIcon/>
                             </IconButton>
                         }
                        />
                    </Card>

                    <Grid container spacing={2}>
                        <Grid item md={12} xs={12} sm={12}>
                            {/*payed and waiting for payment adverts*/}
                            <PayedAndWaitingForApprovalAdverts
                                adverts={this.payedAndWaitingApprovalAdverts(this.props.adverts)}
                            />
                        </Grid>

                        <Grid item md={12} xs={12} sm={12}>
                            {/*On air adverts*/}
                            <OnAirAdverts adverts={this.onAirAdverts(this.props.adverts)}/>
                        </Grid>

                        <Grid item md={12} xs={12} sm={12}>
                            {/*Unfinished payment adverts*/}
                            <NewAndPaymentUnfinishedAdverts
                                adverts={this.unfinishedPaymentAdverts(this.props.adverts)}
                            />
                        </Grid>

                    </Grid>

                </div>
            </Container>
        );
    }
}

const mapStateToProps = state=>({
    loading:state.authReducer.adminReducers.advertReducer.loading,
    adverts:state.authReducer.adminReducers.advertReducer.adverts,
    company:state.authReducer.adminReducers.adminCompanyReducer.company,
})

export default connect(mapStateToProps,{fetchAdverts,showMainDialog,fetchCompanies})
(withStyles(adminAdvertStyle)(AdminAdverts));
