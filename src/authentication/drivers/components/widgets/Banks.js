import React from "react";
import {bankAccountFetch} from "../../../state/actions/bankAccountAction";
import {connect} from "react-redux";
import {showBankAccountSetterModal} from "../../state/actions/dialogActions";
import Button from "@material-ui/core/Button";
import ChevronRightIcon from "@material-ui/core/SvgIcon/SvgIcon";
import Skeleton from "@material-ui/lab/Skeleton";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from '@material-ui/icons/MoreVert'
import {CardContent, Menu} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import {red} from "@material-ui/core/colors";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import {Link} from "react-router-dom";
import ListItemText from "@material-ui/core/ListItemText";

const selectedBankAccount = {}
class Banks extends React.Component{

    constructor(props) {
        super(props);
        this.state ={
            anchorEl:null
        }
        this.showMenu = this.showMenu.bind(this)
        this.closeMenu = this.closeMenu.bind(this)
        this.edit = this.edit.bind(this)
        this.delete = this.delete.bind(this)

    }


    componentDidMount() {
        this.props.bankAccountFetch()
    }



    closeMenu = (event)=>{
        this.setState({
            anchorEl:null
        })
    }

    setAccount = ()=>{
        this.props.showBankAccountSetterModal(true)

    }

    showMenu = (bankAccount)=>(event)=>{
        this.selectedBankAccount= bankAccount
        this.setState({anchorEl:event.currentTarget})
    }

    edit = ()=>{
        this.closeMenu()
        console.log(this.selectedBankAccount)
    }

    delete = ()=>{
        this.closeMenu()
        console.log(this.selectedBankAccount)
    }

    render() {
        return (
            <div>
                {
                    this.props.loading
                    ?
                        (<div style={{display:'flex',flexDirection:'row'}}>
                            <Grid container spacing={2}>
                                <Grid item md={3} sm={12}>
                                    <Skeleton variant='rect' width='100%' height={150}/>
                                </Grid>

                                <Grid item md={3} sm={12}>
                                    <Skeleton variant='rect' width='100%' height={150}/>
                                </Grid>
                            </Grid>
                        </div>)
                    :
                        (
                            this.props.accounts.length>0
                                ?
                                (
                                    <div style={{display:'flex',flexDirection:'column'}}>
                                        <Card elevation={0}>
                                            <CardHeader
                                            title='Your banks'
                                            action={
                                                <Button

                                                    onClick={this.setAccount}
                                                    variant='contained'
                                                    color='primary'
                                                    style={{textTransform:'capitalize'}}>New account</Button>
                                            }
                                            />
                                        </Card>
                                        <Grid container spacing={2}>
                                            {
                                                this.props.accounts.map(banks=>(
                                                    <Grid key={banks.id} item md={4} sm={12}>
                                                        <Card style={{backgroundColor:'#31418F',color:'white'}}>
                                                            <CardHeader
                                                                avatar={
                                                                    <Avatar style={{backgroundColor: red[500]}} src={banks.bank.logo_path}>
                                                                    </Avatar>
                                                                }
                                                                title={banks.bank.bank_name}
                                                                action={
                                                                    <IconButton
                                                                        aria-controls='setting-profile'
                                                                        aria-haspopup='true'
                                                                        onClick={this.showMenu(banks)}
                                                                        aria-label="settings"
                                                                        color='inherit'>
                                                                        <MoreVertIcon />
                                                                    </IconButton>
                                                                }
                                                            />
                                                            <Menu
                                                                id='setting-profile'
                                                                anchorEl={this.state.anchorEl}
                                                                keepMounted
                                                                open={Boolean(this.state.anchorEl)}
                                                                onClose={this.closeMenu}
                                                            >
                                                                <List
                                                                    component='nav'
                                                                    aria-labelledby='nested-menu'
                                                                >
                                                                    <ListItem button>
                                                                        <ListItemText
                                                                            onClick={this.edit}
                                                                            primary='Edit'/>
                                                                    </ListItem>

                                                                    <ListItem button  >
                                                                        <ListItemText
                                                                            onClick={this.delete}
                                                                            primary='Remove'/>
                                                                    </ListItem>
                                                                </List>
                                                            </Menu>
                                                            <CardContent >
                                                                <Typography variant="body2" component="p" style={{marginBottom:10}}>
                                                                  <span style={{fontSize:'1.2em'}}>
                                                                      Account number:
                                                                  </span> {banks.account_number}
                                                                </Typography>
                                                                <Typography variant="body2" component="p">
                                                                  <span style={{fontSize:'1.2em'}}>
                                                                      Account Holder full name:
                                                                  </span> {banks.account_holder_name}
                                                                </Typography>
                                                            </CardContent>
                                                        </Card>
                                                    </Grid>
                                                ))
                                            }
                                        </Grid>
                                    </div>
                                )
                                :
                                (
                                    <div style={{display:'flex',flexDirection:'column',justifyContent:'start',alignItems:'start'}}>
                                        <span style={{marginBottom:20}}>You haven't set you bank account before.please set your account now.</span>
                                        <Button color='primary' variant='contained' onClick={this.setAccount}>
                                            <span style={{marginRight:10}}>Set account</span>
                                            <ChevronRightIcon/>
                                        </Button>
                                    </div>
                                )
                        )
                }
            </div>
        );
    }


}

const mapStateToProps = state=>({
    accounts:state.authReducer.bankAccountReducer.accounts,
    loading:state.authReducer.bankAccountReducer.loading
})

export default connect(mapStateToProps,{bankAccountFetch,showBankAccountSetterModal})(Banks)