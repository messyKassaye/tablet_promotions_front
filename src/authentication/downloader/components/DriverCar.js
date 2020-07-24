import React, {Component} from 'react';
import {connect} from "react-redux";
import {me} from "../../state/actions/usersActions";
import {Card, CardHeader, CardContent, Grid, Button} from "@material-ui/core";
import DirectionsCarIcon from "@material-ui/icons/DirectionsCar";
import Skeleton from "@material-ui/lab/Skeleton";
import {green, grey} from "@material-ui/core/colors";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import {translate} from "react-i18next";
import FourByFourSkeleton from "../../commons/loading/customSkeleton";
class DriverCar extends Component {
    render() {
        const {t} = this.props
        return (
            <Card>
                <CardHeader
                    title={'My car'}
                    style={{backgroundColor:'#3C4252',color:'white'}}
                    avatar={<DirectionsCarIcon/>}/>
                    <Divider/>
                <CardContent>
                    {
                        this.props.loading
                        ?
                            (
                                <Grid container spacing={2}>
                                    <FourByFourSkeleton/>
                                </Grid>
                            )
                        :
                            (
                                <Grid container spacing={2}>
                                    {
                                        this.props.user.relations.driver_car.length > 0
                                            ?
                                            (this.props.user.relations.driver_car.map(cars => (
                                                <Grid key={cars.id} item md={6} lg={6} sm={12} xs={12}>
                                                    <Card>
                                                        <CardHeader
                                                            title={`${cars.plate_number}`}
                                                            subheader={cars.car_category[0].name}
                                                            avatar={<Avatar width={40}
                                                                            height={40}>{cars.car_category[0].name[0]}</Avatar>}
                                                        />
                                                        <CardContent>
                                                            <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                                                                <Typography>
                                                                    {`${t('driver.cars.adverts')}: `}
                                                                </Typography>
                                                                <Typography color={"primary"} style={{marginLeft:10}}>
                                                                    {cars.adverts}
                                                                </Typography>
                                                            </div>

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
                                                                                </div>
                                                                            )
                                                                    }
                                                                </div>
                                                            </div>


                                                            <div style={{display:'flex',flexDirection:'row',marginTop:8}}>
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
                                                                                </div>
                                                                            )
                                                                    }
                                                                </div>
                                                            </div>

                                                            <div style={{display:'flex',flexDirection:'row',marginTop:8}}>
                                                                <Typography>
                                                                    {`${t('driver.driver.title')}:`}
                                                                </Typography>
                                                                {
                                                                    cars.driver_link==null
                                                                        ?
                                                                        (
                                                                            <div style={{
                                                                                display:'flex',
                                                                                flexDirection:'row',
                                                                                marginLeft:10}}>
                                                                                <Typography>No assigned</Typography>
                                                                            </div>
                                                                        )
                                                                        :
                                                                        (
                                                                            <div>
                                                                                {
                                                                                    cars.driver==null
                                                                                        ?
                                                                                        (
                                                                                            <div style={{display:'flex',flexDirection:'row'}}>
                                                                                                <Typography
                                                                                                    style={{
                                                                                                        display:'flex',
                                                                                                        flexDirection:'row',
                                                                                                        color:green[500],
                                                                                                        marginLeft:10}}>
                                                                                                    Driver link is sent but not registered yet.
                                                                                                </Typography>
                                                                                            </div>
                                                                                        )
                                                                                        :
                                                                                        (
                                                                                            <Typography
                                                                                                color={"primary"}
                                                                                                style={{
                                                                                                    display:'flex',
                                                                                                    flexDirection:'row',
                                                                                                    marginLeft:10}}>
                                                                                                {`${cars.driver.first_name} ${cars.driver.last_name}`}
                                                                                            </Typography>
                                                                                        )
                                                                                }
                                                                            </div>
                                                                        )
                                                                }
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
        );
    }
}

const mapStateToProps = state => (
    {
        user: state.userData.user,
        loading: state.userData.loading
    }
)

export default translate('common')(connect(mapStateToProps,{me})(DriverCar));