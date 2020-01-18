import React, {Component} from 'react';
import {Card, CardContent, CardHeader, Container, IconButton, Divider, CardActions, Button} from "@material-ui/core";
import AttachMoneyIcon from '@material-ui/icons/AttachMoney'
import AddIcon from '@material-ui/icons/Add'
import {connect} from "react-redux";
import {showMainDialog} from "../state/action/dialogAction";
import AddNewCurrency from "../dialogs/component/AddNewCurrency";
import Grid from "@material-ui/core/Grid";
import FourByFourSkeleton from "../../advertisers/components/widgets/customSkeleton";
import DeleteMessage from "../dialogs/component/DeleteMessage";
import AddNewRole from "../dialogs/component/AddNewRole";
import {fetchCurrency} from "../state/action/currencyAction";
import {green} from "@material-ui/core/colors";

class Currency extends Component {

    addNewCurrency = ()=>{
    this.props.showMainDialog({
        show:true,
        page:<AddNewCurrency form={{type:'',data:null}}/>,
        title:'Add new Currency',
        actions:{
            on:false,
            path:'',
            id:''
        }
    })
    }

    handleButtonClick = (component,titles,action)=>{
        this.props.showMainDialog({'show':true,'page':component,title: titles,actions:action})
    }

    componentDidMount() {
        this.props.fetchCurrency()
    }

    render() {
        return (
            <Container>
                <Card>
                    <CardHeader
                     title={'List of available currencies'}
                     avatar={<AttachMoneyIcon/>}
                     action={<IconButton color='inherit' onClick={this.addNewCurrency}><AddIcon/></IconButton>}
                    />
                    <Divider/>
                    <CardContent>
                        <Grid container spacing={2}>
                        {
                         this.props.loading
                         ?
                             (
                                <FourByFourSkeleton/>
                             )
                         :
                             (
                                this.props.currency.map(currency=>(
                                    <Grid item md={4} xs={12}>
                                        <Card style={{backgroundColor:green[500],color:'white'}}>
                                            <CardHeader
                                             title={currency.name}
                                             subheader={currency.symbol}
                                            />
                                            <CardActions style={{display:"flex",justifyContent:'flex-end'}}>
                                                <Button
                                                    color='inherit'
                                                    variant='text'
                                                    style={{textTransform:'none'}}
                                                    onClick={()=>this.handleButtonClick(
                                                        <DeleteMessage message={`Are you sure. you want to remove ${currency.name}`}/>,
                                                        'Confirmation',
                                                        {on:true,path:`currencies`,id:currency.id}
                                                    )}
                                                >
                                                    Remove
                                                </Button>
                                                <Button
                                                    color='inherit'
                                                    variant='outlined'
                                                    onClick={()=>this.handleButtonClick(<AddNewCurrency form={{type:'Edit',data:currency}}/>,`Edit ${currency.name}`,currency)}
                                                    style={{textTransform:'none'}}
                                                >
                                                    Edit
                                                </Button>
                                            </CardActions>
                                        </Card>
                                    </Grid>
                                ))
                             )
                        }
                        </Grid>
                    </CardContent>
                </Card>

            </Container>
        );
    }
}

const mapStateToProps = state=>({
    currency: state.authReducer.adminReducers.currenciesReducer.currency,
    loading:state.authReducer.adminReducers.currenciesReducer.loading
})

export default connect(mapStateToProps,{showMainDialog,fetchCurrency})(Currency)