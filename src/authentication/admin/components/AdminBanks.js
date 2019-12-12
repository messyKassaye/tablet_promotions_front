import React, {Component} from 'react';
import {CardHeader, Container} from "@material-ui/core";
import {Card,CardContent} from "@material-ui/core";
import {IconButton} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add'
import {showMainDialog} from "../state/action/dialogAction";
import {connect} from "react-redux";
import {fetchAdminBanks} from "../state/action/AdminBankAction";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import FourByFourSkeleton from "../../advertisers/components/widgets/customSkeleton";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import EditIcon from '@material-ui/icons/Edit'
class AdminBanks extends Component {

    constructor(props) {
        super(props);

    }

    addNewBank = ()=>{
        this.props.showMainDialog({'show':true,'page':'AddNewBank',title:'Add new bank',actions:{on:false,path:'',id:''}})
    }

    componentDidMount() {
            this.props.fetchAdminBanks()
    }

    handleButtonClick = (eventType,titles,bank)=>{
        this.props.showMainDialog({'show':true,'page':eventType,title: titles,data:bank,actions:{on:false,path:'',id:''}})
    }

    render() {
        return (
            <Container maxWidth='lg'>
                <Card>
                    <CardHeader
                     title={'List of banks'}
                     action={
                         <IconButton color='primary' onClick={this.addNewBank}>
                            <AddIcon/>
                         </IconButton>
                     }
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
                                       this.props.banks.length>0
                                        ?
                                           (
                                               this.props.banks.map(bank=>(
                                                   <Grid key={bank.id} item md={4} xs={12}>
                                                       <Card  style={{backgroundColor:'#31418F',color:'white'}}>
                                                           <CardHeader
                                                               title={bank.bank_name}
                                                               avatar={<Avatar src={bank.logo_path}></Avatar>}

                                                           />
                                                           <CardContent style={{display:'flex',flexDirection:'column',justifyContent:'start'}}>
                                                               <div style={{display:'flex',alignItems:'center'}}>
                                                                   <Typography>Accounts: </Typography>
                                                                   {
                                                                       bank.accounts.length>0
                                                                       ?
                                                                           (
                                                                               <IconButton color='inherit'>
                                                                                   <EditIcon/>
                                                                               </IconButton>
                                                                           )
                                                                       :
                                                                           (
                                                                               <div>
                                                                                   <IconButton
                                                                                       onClick={()=>this.handleButtonClick('BankSetter',`Set your account`,bank)}
                                                                                       color='inherit'>
                                                                                       <AddIcon/>
                                                                                   </IconButton>
                                                                               </div>
                                                                           )
                                                                   }

                                                               </div>
                                                               <div style={{display:'flex',flexDirection:'column'}}>
                                                                   {
                                                                       bank.accounts.length>0
                                                                       ?
                                                                           (
                                                                               bank.accounts.map(item=>(
                                                                                   <Typography>{`Account holder full name: ${item.account_holder_full_name}`}</Typography>
                                                                               ))
                                                                           )
                                                                       :
                                                                           (
                                                                               <span>Account is not set.</span>
                                                                           )
                                                                   }
                                                               </div>
                                                           </CardContent>
                                                           <CardActions style={{display:'flex',justifyContent:'flex-end',alignItems:'end'}}>

                                                               <Button
                                                                   onClick=
                                                                       {()=>this.handleButtonClick('Remove',`Are you sure you want to remove ${bank.bank_name}`,bank)}
                                                                   variant='text'
                                                                   color='inherit'
                                                                   style={{textTransform:'capitalize'}}>
                                                                   Remove
                                                               </Button>

                                                               <Button
                                                                   onClick={()=>this.handleButtonClick('BankEditor',`Edit ${bank.bank_name}`,bank)}
                                                                   variant='outlined'
                                                                   color='inherit'
                                                                   style={{textTransform:'capitalize'}}>
                                                                   Edit
                                                               </Button>
                                                           </CardActions>
                                                       </Card>
                                                   </Grid>
                                               ))
                                           )
                                       :
                                           (
                                               <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                                                   <span>There is no registered bank. add new bank</span>
                                               </div>
                                           )
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
    banks:state.authReducer.adminReducers.bankReducer.banks,
    loading:state.authReducer.adminReducers.bankReducer.loading
})
export default connect(mapStateToProps,{showMainDialog,fetchAdminBanks})(AdminBanks);
