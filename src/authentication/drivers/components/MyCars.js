import React from "react";
import {connect} from "react-redux";
import {Card, Dialog} from "@material-ui/core";
import CardHeader from "@material-ui/core/CardHeader";
import Skeleton from "@material-ui/lab/Skeleton";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import myCarStyle from "../style/myCarsStyle";
import withStyles from "@material-ui/core/styles/withStyles";
import CardMedia from "@material-ui/core/CardMedia";
import {deepOrange, red} from "@material-ui/core/colors";
import Button from "@material-ui/core/Button";
import AddIcon from '@material-ui/icons/Add'
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import {categoriesFetch} from "../state/actions/categoriesActions";
import {showCarRegistrationModal} from "../state/actions/dialogActions";
import {sentDialogValue} from "../state/actions/dialogActions";
import Cars from "./widgets/Cars";
import CircularProgress from "@material-ui/core/CircularProgress";
import {translate} from "react-i18next";
import DirectionsCarIcon from '@material-ui/icons/DirectionsCar'

class MyCars extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            show:false
        }

        this.handleChange = this.handleChange.bind(this)
        this.a11yProps = this.a11yProps.bind(this)
        this.TabPanel = this.TabPanel.bind(this)
        this.registerCars = this.registerCars.bind(this)
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

    registerCars = ()=>{
        this.props.showCarRegistrationModal(true)
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

    componentDidMount() {
        this.props.categoriesFetch()
    }

    render() {
        const {classes} = this.props
        const {t} = this.props
        return (
            <div className={classes.root}>

                <Card style={{borderRadius: 0, backgroundColor: '#3C4252', color: 'white'}}>
                    <Tabs

                        value={this.state.value}
                        onChange={this.handleChange}>
                        <Tab className={classes.tabs} label={`${t('driver.cars.my_cars')}`} {...this.a11yProps(0)} />
                        <Tab className={classes.tabs} label={`${t('driver.cars.cars_rule_and_regulation')}`} {...this.a11yProps(1)} />
                    </Tabs>
                </Card>
                <this.TabPanel value={this.state.value} index={0}>
                    {
                        this.props.loading?
                            (
                                <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                                    <CircularProgress/>
                                </div>
                            )
                            :
                            this.props.categories.length>0?
                                (
                                    <Cars show={true}/>
                                )
                                :
                                (
                                    <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                                        <span style={{marginBottom:20}}>No car is found Registered by you. Start registering your car now</span>
                                        <Button color='primary' variant='contained' onClick={this.registerCars}>
                                            <span style={{marginRight:10}}>Register</span>
                                            <ChevronRightIcon/>
                                        </Button>

                                    </div>
                                )


                    }
                </this.TabPanel>
                <this.TabPanel value={this.state.value} index={1}>
                    {
                        this.props.loading ?
                            (<Skeleton variant='rect' width={200} height={200}/>)
                            :
                           ( this.props.categories.map(items => (
                                <div key={items.id} className={classes.root}>
                                    <Card style={{borderRadius:0,marginBottom:20}}>
                                        <CardHeader
                                            title={items.name}
                                            avatar={<DirectionsCarIcon/>}
                                        />
                                    </Card>
                                    {
                                        items.child.length>0
                                        ?
                                            (
                                                <Grid container  spacing={3}>
                                                    {
                                                        items.child.map(child => (

                                                            <Grid key={child.id} item md={6} xs={12}>
                                                                <Card>
                                                                    <CardHeader
                                                                        avatar={
                                                                            <Avatar style={{backgroundColor: red[500]}}>
                                                                                {child.name[0]}
                                                                            </Avatar>
                                                                        }
                                                                        title={child.name}
                                                                        subheader={items.name}
                                                                    />
                                                                    <CardMedia style={{height: 10, paddingTop: '56%'}}
                                                                               image={child.image}
                                                                    />
                                                                    <CardContent>
                                                                        <Typography variant="body2" color="textSecondary"
                                                                                    component="p">
                                                                            {child.description}
                                                                        </Typography>
                                                                    </CardContent>
                                                                </Card>
                                                            </Grid>
                                                        ))
                                                    }
                                                </Grid>
                                            )
                                        :
                                            (
                                               <div style={{display:"flex",flexDirection:'column',alignItems:'center'}}>
                                                   <Typography color={"primary"}>
                                                       {`There is now registered car under ${items.name}`}
                                                   </Typography>
                                               </div>
                                            )
                                    }
                                </div>
                            )))
                    }
                </this.TabPanel>

            </div>
        )
    }

}

const mapStateToProps = state => ({
    categories: state.authReducer.driversReducers.categoriesData.categories,
    loading: state.authReducer.driversReducers.categoriesData.loading,
})

export default translate('common')
(withStyles(myCarStyle)(connect(mapStateToProps, {categoriesFetch,showCarRegistrationModal,sentDialogValue})(MyCars)))