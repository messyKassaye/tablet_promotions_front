import React, {Component} from 'react';
import {Container} from "@material-ui/core";
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
import {commonFetchAdvertMedia} from "../../commons/state/actions/advertMediaTypeAction";

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
            <Container maxWidth='lg'>
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

                    {/*payed and waiting for payment adverts*/}
                    <PayedAndWaitingForApprovalAdverts
                        adverts={this.payedAndWaitingApprovalAdverts(this.props.adverts)}
                    />

                    {/*On air adverts*/}
                    <OnAirAdverts adverts={this.onAirAdverts(this.props.adverts)}/>

                  {/*Unfinished payment adverts*/}
                  <NewAndPaymentUnfinishedAdverts
                      adverts={this.unfinishedPaymentAdverts(this.props.adverts)}
                  />

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
