import React, {Component} from 'react';
import {
    Avatar, Card, CardActions, CardContent, Container, Grid, Typography,
    Button, Box, Tabs, Tab, Divider, Chip
} from "@material-ui/core";
import {connect} from "react-redux";
import {show} from "../../state/actions/usersActions";
import default_avator from '../../../assets/default_avator.jpg'
import Skeleton from "@material-ui/lab/Skeleton";
import {green, grey} from "@material-ui/core/colors";
import withStyles from "@material-ui/core/styles/withStyles";
import userStyle from "../style/usersStyle";
class UserProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value:0
        }
    }


    componentDidMount() {
        let id = this.props.match.params.id
        this.props.show(id)
    }

    handleChange = (event, newValue) => {
        this.setState({
            value: newValue
        })
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

    render() {
        const {classes} = this.props
        return (
            <Container maxWidth={"lg"}>
                <Grid container spacing={2}>

                    <Grid item md={3} xs={12} sm={12}>
                        <Card style={{backgroundColor:'#3C4252',color:'white'}}>
                            <CardContent
                                style={{display:'flex',flexDirection:'column',alignItems:'center'}}
                            >
                                {
                                    this.props.loading
                                    ?
                                        (
                                            <Skeleton variant={"circle"} width={40} height={40}/>
                                        )
                                    :
                                        (
                                            <div
                                                style={{display:'flex',flexDirection:'column',alignItems:'center'}}
                                            >
                                                {
                                                    this.props.users.attribute.avator==='letter'
                                                    ?
                                                        (
                                                            <Avatar src={default_avator} widt={50} hieght={50}/>
                                                        )
                                                    :
                                                        (
                                                            <Avatar src={this.props.users.attribute.avator}/>
                                                        )
                                                }
                                                <Typography style={{color:grey[500]}}>{this.props.users.relations.role[0].name}</Typography>
                                                <Typography style={{marginTop:10,color:grey[400]}}>{`${this.props.users.attribute.first_name} ${this.props.users.attribute.last_name}`}</Typography>

                                            </div>

                                        )
                                }
                            </CardContent>
                            <CardActions style={{display:'flex',flexDirection:'column',alignItems:'flex-end'}}>
                                <Button
                                 color={"inherit"}
                                 variant={"text"}
                                 style={{textTransform:'none'}}
                                >
                                    Edit profile
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>

                    <Grid item md={9} xs={12} sm={12}>
                        <Card elevation={0} style={{borderRadius: 0}}>
                            <Tabs
                                value={this.state.value}
                                textColor={"primary"}
                                indicatorColor={"primary"}
                                variant={"scrollable"}
                                onChange={this.handleChange}>
                                <Tab className={classes.tabs} label='Profile' {...this.a11yProps(0)} />
                                <Tab className={classes.tabs}  label='My adverts' {...this.a11yProps(1)} />
                                <Tab className={classes.tabs}  label='All adverts' {...this.a11yProps(2)} />
                                <Tab className={classes.tabs}  label='Cars' {...this.a11yProps(3)} />
                            </Tabs>
                            <Divider/>
                        </Card>

                        <Card style={{borderRadius:0}} elevation={0}>
                            <CardContent>
                                <this.TabPanel value={this.state.value} index={0}>

                                </this.TabPanel>

                                <this.TabPanel value={this.state.value} index={1}>

                                </this.TabPanel>

                                <this.TabPanel value={this.state.value} index={2}>

                                </this.TabPanel>
                            </CardContent>
                        </Card>
                    </Grid>

                </Grid>
            </Container>
        );
    }
}
const mapStateToProps = state=>({
    users:state.userData.showUser,
    loading:state.userData.showLoading
})
export default connect(mapStateToProps,{show})
(withStyles(userStyle)(UserProfile));