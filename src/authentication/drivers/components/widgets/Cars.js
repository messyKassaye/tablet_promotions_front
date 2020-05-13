import React from "react";
import CardContent from "@material-ui/core/CardContent";
import {Card, Button, Grid} from "@material-ui/core";
import CardHeader from "@material-ui/core/CardHeader";
import {connect} from "react-redux";
import Skeleton from "@material-ui/lab/Skeleton";
import Typography from "@material-ui/core/Typography";
import carStyle from "../../style/carsStyle";
import withStyles from "@material-ui/core/styles/withStyles";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import {translate} from "react-i18next";
import AddIcon from '@material-ui/icons/Add'
import {showCarRegistrationModal} from "../../state/actions/dialogActions";
import Avatar from "@material-ui/core/Avatar";
import {grey} from "@material-ui/core/colors";
import {showMainDialog} from "../../../admin/state/action/dialogAction";
import AddressCard from "../../../commons/components/widgets/AddressCard";
import InformationDialog from "../../../commons/components/InformationDialog";

class Cars extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showAddIcon: true
        }
        this.openCarsRegistrationDialog = this.openCarsRegistrationDialog.bind(this)
    }


    openCarsRegistrationDialog = () => {
        this.props.showCarRegistrationModal(true)
    }

    registerCarWorkingPlace = (car,id,t)=>{
        const  page = <AddressCard
            info={`${t('driver.register_car.info')}`}
            element={car}
            type={'cars'}
            id={id}
            label={`${t('driver.register_car.label')}`}
            btnText={`${t('driver.register_car.button_text')}`}
        />

        this.props.showMainDialog({
            show:true,
            page:page,
            title:'Set your car work place',
            actions:{
                path:'',
                id:''
            }
        })
    }

    showHowToAddTablet = (information,titles)=>{
        const  infoPage = <InformationDialog
            information={information}
        />

        this.props.showMainDialog({
            show:true,
            page:infoPage,
            title:titles,
            actions:{
                path:'',
                id:''
            }
        })
    }


    render() {
        const {show} = this.props
        const {classes} = this.props
        const {t} = this.props
        return (
            <div>
                <Card style={{backgroundColor: grey[100]}}>
                    <CardHeader
                        className={classes.header}
                        title={this.props.loading ?
                            <Skeleton style={{backgroundColor: 'white'}} variant='rect' width={250} height={6}/>
                            : t('driver.cars.title')}
                        action={
                            this.props.loading
                                ?
                                (<Skeleton style={{backgroundColor: 'white'}} variant='circle' width={40} height={40}/>)

                                :
                                (
                                    <IconButton
                                        color='inherit'
                                        onClick={this.openCarsRegistrationDialog}
                                    >
                                        <AddIcon/>
                                    </IconButton>
                                )
                        }
                    />
                    <Divider/>
                    <CardContent>
                        {this.props.loading ? (
                                <React.Fragment>
                                    <Skeleton height={6}/>
                                    <Skeleton height={6} width="80%"/>
                                </React.Fragment>
                            ) :
                            (
                                <Grid container spacing={2}>
                                    {
                                        this.props.user.relations.cars.length > 0
                                            ?
                                            (this.props.user.relations.cars.map(cars => (
                                                <Grid key={cars.id} item md={6} sm={12} xs={12}>
                                                    <Card>
                                                        <CardHeader
                                                            title={`${cars.plate_number}`}
                                                            subheader={cars.car_category[0].name}
                                                            avatar={<Avatar width={40}
                                                                            height={40}>{cars.car_category[0].name[0]}</Avatar>}
                                                        />
                                                        <Divider/>
                                                        <CardContent>
                                                            <Typography>
                                                                {`${t('driver.cars.adverts')} = ${cars.adverts.length}`}
                                                            </Typography>

                                                            <div style={{display: 'flex', flexDirection: 'row',
                                                                marginTop:10,}}>
                                                                <Typography>
                                                                    {`${t('driver.work_place.title')}:`}
                                                                </Typography>
                                                                <div
                                                                    style={{
                                                                        display: "flex",
                                                                        flexDirection: 'row', alignItems: 'center'
                                                                    }}>
                                                                    {
                                                                        cars.working_place.length > 0
                                                                            ?
                                                                            (
                                                                                <Typography
                                                                                    color={"primary"}
                                                                                    style={{marginLeft:20}}>
                                                                                    {cars.working_place[0].city}
                                                                                </Typography>
                                                                            )
                                                                            :
                                                                            (

                                                                                <div style={{
                                                                                    display:'flex',
                                                                                    flexDirection:'row',
                                                                                    marginLeft:10}}>
                                                                                    <Typography style={{color:"red"}}>{`${t('driver.work_place.not_assigned')}`}</Typography>
                                                                                    <Button
                                                                                        color={"primary"}
                                                                                        variant={"outlined"}
                                                                                        style={{
                                                                                            textTransform: 'none',
                                                                                            marginLeft: 15,
                                                                                            marginTop:-5
                                                                                        }}
                                                                                        onClick={()=>this.registerCarWorkingPlace(cars,cars.id,t)}
                                                                                    >
                                                                                        {`${t('driver.work_place.button_text')}`}
                                                                                    </Button>
                                                                                </div>
                                                                            )
                                                                    }
                                                                </div>
                                                            </div>


                                                            <div style={{display:'flex',flexDirection:'row',marginTop:20}}>
                                                                <Typography>
                                                                    {`${t('driver.working_tablet.title')}:`}
                                                                </Typography>
                                                                <div
                                                                    style={{
                                                                        display: "flex",
                                                                        flexDirection: 'row', alignItems: 'center'
                                                                    }}>
                                                                    {
                                                                        cars.working_tablet.length>0
                                                                            ?
                                                                            (
                                                                                <Typography
                                                                                    color={"primary"}
                                                                                    style={{marginLeft:20}}>
                                                                                    {cars.working_tablet[0].serial_number}
                                                                                </Typography>
                                                                            )
                                                                            :
                                                                            (
                                                                                <div style={{
                                                                                    display:'flex',
                                                                                    flexDirection:'row',
                                                                                    marginLeft:10}}>
                                                                                    <Typography style={{color:"red"}}>{`${t('driver.working_tablet.not_assigned')}`}</Typography>
                                                                                    <Button
                                                                                        color={"primary"}
                                                                                        variant={"outlined"}
                                                                                        style={{
                                                                                            textTransform: 'none',
                                                                                            marginLeft: 15,
                                                                                            marginTop:-5
                                                                                        }}
                                                                                        onClick={()=>this.showHowToAddTablet(
                                                                                            t('driver.working_tablet.how_to_add'),
                                                                                            t("driver.working_tablet.dialogTitle")
                                                                                        )}
                                                                                    >
                                                                                        {`${t('driver.working_tablet.how_to_assign')}`}
                                                                                    </Button>
                                                                                </div>
                                                                            )
                                                                    }
                                                                </div>
                                                            </div>
                                                        </CardContent>
                                                    </Card>
                                                </Grid>
                                            )))
                                            :
                                            (
                                                <div style={{
                                                    display: "flex",
                                                    flexDirection: 'column',
                                                    alignItems: 'center'
                                                }}>
                                                    <Typography>{`${t('driver.no_car.info')}`}</Typography>
                                                    <Button
                                                        color={"primary"}
                                                        variant={"outlined"}
                                                        style={{textTransform: 'none', marginTop: 20}}
                                                        onClick={this.openCarsRegistrationDialog}
                                                    >
                                                        {`${t("driver.no_car.button_text")}`}
                                                    </Button>
                                                </div>
                                            )
                                    }
                                </Grid>
                            )

                        }
                    </CardContent>
                </Card>
            </div>
        );
    }


}

const mapStateToProps = state => (
    {
        user: state.userData.user,
        loading: state.userData.loading
    }
)

export default translate('common')
(withStyles(carStyle)(connect(mapStateToProps, {showCarRegistrationModal,showMainDialog})(Cars)))
