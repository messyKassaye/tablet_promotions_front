import React, {Component} from 'react';
import {
    Avatar, Box,
    Card,
    CardContent,
    CardHeader,
    Container,
    Divider,
    Grid,
    Tab,
    Tabs,
    Typography
} from "@material-ui/core";
import VideocamIcon from '@material-ui/icons/Videocam'
import {connect} from "react-redux";
import SingleLoading from "../loading/SingleLoading";
import AdvertCard from "./AdvertCard";
import {show} from "../../advertisers/state/action/advertAction";
import DriverTab from "./widgets/DriverTab";
import AdvertiserTab from "./widgets/AdvertiserTab";
import withStyles from "@material-ui/core/styles/withStyles";
import userStyle from "../style/usersStyle";
import Skeleton from "@material-ui/lab/Skeleton";
import {grey} from "@material-ui/core/colors";
import default_avator from "../../../assets/default_avator.jpg";
import TabLoader from "../loading/TabLoader";
import ProfileTab from "./widgets/ProfileTab";
import CompanyCard from "./CompanyCard";
import ActionTab from "./widgets/ActionTab";
class AdvertProfile extends Component {
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
                      <Card className={classes.profileCard}>
                          <CardContent className={classes.profileCardContent}>
                              {
                                  this.props.loading
                                  ?
                                      (
                                          <div className={classes.profileCardContent}>
                                              <Skeleton
                                                  variant={"circle"}
                                                  width={40} height={40}
                                                  style={{backgroundColor:grey[500]}}/>
                                              <Skeleton
                                                  variant={"text"} width={80} style={{backgroundColor:grey[500],marginTop:10}}/>
                                          </div>
                                      )
                                  :
                                      (
                                          <div
                                              className={classes.profileCardContent}
                                          >
                                              <Avatar>{this.props.adverts.product_name.charAt(0)}</Avatar>
                                              <Typography style={{marginTop:10,color:grey[400]}}>{this.props.adverts.product_name}</Typography>

                                          </div>

                                      )
                              }
                          </CardContent>
                      </Card>
                    </Grid>

                    <Grid item md={9} xs={12} sm={12}>
                        {
                          this.props.loading
                          ?
                              (
                                  <TabLoader/>
                              )
                          :
                              (
                                  <Grid container spacing={2}>

                                      <Grid item md={12} xs={12} sm={12}>
                                          <Card  style={{borderRadius: 0}} elevation={0}>
                                              <Tabs
                                                  value={this.state.value}
                                                  textColor={"primary"}
                                                  indicatorColor={"primary"}
                                                  variant={"scrollable"}
                                                  onChange={this.handleChange}>
                                                  <Tab className={classes.tabs} label='Profile' {...this.a11yProps(0)} />
                                                  <Tab className={classes.tabs}  label='Advert views' {...this.a11yProps(1)} />
                                                  <Tab className={classes.tabs}  label='Advert places' {...this.a11yProps(2)} />
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
                              )
                        }
                    </Grid>

                </Grid>
            </Container>
        );
    }
}

const mapStateToProps = state=>({
    adverts: state.authReducer.advertisersReducers.advertData.adverts,
    loading: state.authReducer.advertisersReducers.advertData.showLoading
})

export default connect(mapStateToProps,{show})
(withStyles(userStyle)(AdvertProfile));