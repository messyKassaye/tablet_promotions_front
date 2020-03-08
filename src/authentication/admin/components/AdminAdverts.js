import React, {Component} from 'react';
import {Container,Grid,Chip,Box,Typography,IconButton,
    Card,CardHeader,CardContent,Tab,Tabs,TableCell,Divider,Button} from "@material-ui/core";
import {fetchAdverts} from "../state/action/advertsAction";
import {connect} from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
import adminAdvertStyle from "./styles/adminAdvertStyle";
import AddIcon from '@material-ui/icons/Add'
import {showMainDialog} from "../state/action/dialogAction";
import AddNewAdvert from "../../commons/components/AddNewAdvert";
import {fetchCompanies} from "../state/action/adminCompaniesAction";
import AdvertCard from "../../commons/components/AdvertCard";
import SingleLoading from "../../commons/loading/SingleLoading";
import {green} from "@material-ui/core/colors";
import LoadingButton from "../../../home/components/widgets/LoadingButton";
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
            value:0,
            submitted: false,
            loading: false,
            finished: false,
        }

    }
    handleChange = (event, newValue) => {
        this.setState({
            value: newValue
        })
    }

    componentDidMount() {
        this.props.fetchAdverts()
        this.props.fetchCompanies()
    }

    a11yProps = (index) => {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    TabPanel = (props) => {
        const {children, value, index, ...other} = props;

        return (
            <Typography
                component="div"
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                <Box  style={{paddingLeft:0,paddingRight:0}} p={4}>{children}</Box>
            </Typography>
        );
    }

    addNewAdvert = ()=>{
        this.props.showMainDialog({
            show:true,
            page:<AddNewAdvert form={{type:'',data:null}} company={this.props.company}/>,
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
            return advert.payment !== null && advert.status==='on_progress' && advert.media_path!=='not_asigned'
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
                <Grid container spacing={2}>

                   <Grid item md={9} xs={12} sm={12}>
                       <Grid item md={12} xs={12} sm={12}>

                           <Card style={{borderRadius: 0}} elevation={0}>
                               <Tabs
                                   value={this.state.value}
                                   textColor={"primary"}
                                   indicatorColor={"primary"}
                                   variant={"scrollable"}
                                   onChange={this.handleChange}>
                                   <Tab className={classes.tabs} label='Payed adverts' {...this.a11yProps(0)} />
                                   <Tab className={classes.tabs}  label='On air advert' {...this.a11yProps(1)} />
                                   <Tab className={classes.tabs}  label='Non-payed advert' {...this.a11yProps(2)} />
                                   <Tab className={classes.tabs}  label='Completed advert' {...this.a11yProps(3)} />
                               </Tabs>
                               <Divider/>
                           </Card>

                           <Card style={{borderRadius:0}} elevation={0}>
                               <CardContent>
                                   <this.TabPanel value={this.state.value} index={0}>
                                           {
                                               this.props.loading
                                               ?
                                                   (
                                                       <Grid container spacing={2}>
                                                           <SingleLoading height={200}/>
                                                           <SingleLoading height={200}/>
                                                           <SingleLoading height={200}/>
                                                       </Grid>
                                                   )
                                               :
                                                   (
                                                      <Grid container spacing={2}>
                                                          {
                                                              this.payedAndWaitingApprovalAdverts(this.props.adverts).length>0
                                                              ?
                                                                  (
                                                                      this.payedAndWaitingApprovalAdverts(this.props.adverts)
                                                                          .map(advert=>(
                                                                              <Grid key={advert.id} item md={12} xs={12} sm={12}>
                                                                                  <AdvertCard advert={advert} action={true}/>
                                                                              </Grid>
                                                                          ))
                                                                  )
                                                              :
                                                                  (
                                                                      <Typography color={"primary"}>No new advert is found ):</Typography>
                                                                  )
                                                          }

                                                      </Grid>
                                                   )
                                           }
                                   </this.TabPanel>

                                   <this.TabPanel value={this.state.value} index={1}>
                                       {
                                           this.props.loading
                                           ?
                                               (
                                                   <Grid container spacing={2}>
                                                       <SingleLoading height={200}/>
                                                       <SingleLoading height={200}/>
                                                       <SingleLoading height={200}/>
                                                   </Grid>
                                               )
                                           :
                                               (
                                                   <Grid container spacing={2}>
                                                       {
                                                           this.onAirAdverts(this.props.adverts).length>0
                                                           ?
                                                               (
                                                                   this.onAirAdverts(this.props.adverts)
                                                                       .map(advert=>(
                                                                           <Grid key={advert.id} item md={12} xs={12} sm={12}>
                                                                               <AdvertCard
                                                                                   advert={advert}
                                                                                   headerAction={<Chip label={'On air'} size={"small"} style={{backgroundColor:green[500],color:'white'}}/>}/>
                                                                           </Grid>
                                                                       ))
                                                               )
                                                           :
                                                               (
                                                                   <Typography color={"primary"}>We couldn't find adverts on tab advert air</Typography>
                                                               )
                                                       }
                                                   </Grid>
                                               )
                                       }
                                   </this.TabPanel>

                                   <this.TabPanel value={this.state.value} index={2}>
                                       {
                                           this.props.loading
                                           ?
                                               (
                                                   <Grid container spacing={2}>
                                                       <SingleLoading height={200}/>
                                                       <SingleLoading height={200}/>
                                                       <SingleLoading height={200}/>
                                                   </Grid>
                                               )
                                           :
                                               (
                                                   <Grid container spacing={2}>
                                                       {
                                                           this.unfinishedPaymentAdverts(this.props.adverts)
                                                               .map(advert=>(
                                                                   <Grid key={advert.id} item md={12} xs={12} sm={12}>
                                                                       <AdvertCard advert={advert}/>
                                                                   </Grid>
                                                               ))
                                                       }
                                                   </Grid>
                                               )
                                       }
                                   </this.TabPanel>
                               </CardContent>
                           </Card>
                       </Grid>
                   </Grid>

                    <Grid item md={3}>
                        <Button
                            color={"primary"}
                            variant={"outlined"}
                            className={classes.newAdvertButton}
                            onClick={this.addNewAdvert}
                        >
                            Add new advert
                        </Button>
                    </Grid>
                   </Grid>
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
