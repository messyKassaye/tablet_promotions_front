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

    registerCarWorkingPlace = (car,id)=>{
        const  page = <AddressCard
            info={'Your car is registered to our system. Now we need your car work place/city'}
            element={car}
            type={'cars'}
            id={id}
            label={'Select on which city your car is working on now.'}
            btnText={'Set my car place'}
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


    render() {
        const {show} = this.props
        const {classes} = this.props
        const {t} = this.props
        return (
            <div>
                <Card style={{backgroundColor: grey[100]}}>
                    <CardHeader
                        title={this.props.loading ?
                            <Skeleton style={{backgroundColor: 'white'}} variant='rect' width={250} height={6}/>
                            : t('driver.cars.title')}
                        action={
                            this.props.loading
                                ?
                                (<Skeleton style={{backgroundColor: 'white'}} variant='circle' width={40} height={40}/>)

                                :
                                (
                                    show ? (
                                        <IconButton
                                            color='inherit'
                                            onClick={this.openCarsRegistrationDialog}
                                        >
                                            <AddIcon/>
                                        </IconButton>
                                    ) : ''
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
                                                <Grid item md={6} sm={12} xs={12}>
                                                    <Card key={cars.id}>
                                                        <CardHeader
                                                            title={`${cars.plate_number}`}
                                                            subheader={cars.car_category[0].name}
                                                            avatar={<Avatar width={40}
                                                                            height={40}>{cars.car_category[0].name[0]}</Avatar>}
                                                        />
                                                        <Divider/>
                                                        <CardContent>
                                                            <Typography variant="body2" color="textSecondary"
                                                                        component="p">
                                                                {`${t('driver.cars.adverts')} = ${cars.adverts.length}`}
                                                            </Typography>

                                                            <div style={{display: 'flex', flexDirection: 'row',
                                                                marginTop:10,}}>
                                                                <Typography>
                                                                    Work place:
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
                                                                                    <Typography>Not assigned</Typography>
                                                                                    <Button
                                                                                        color={"primary"}
                                                                                        variant={"outlined"}
                                                                                        style={{
                                                                                            textTransform: 'none',
                                                                                            marginLeft: 15,
                                                                                            marginTop:-5
                                                                                        }}
                                                                                        onClick={()=>this.registerCarWorkingPlace(cars,cars.id)}
                                                                                    >
                                                                                        Assign now
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
                                                    <Typography>There is no registered car by your name. Register your
                                                        car now and get more income.</Typography>
                                                    <Button
                                                        color={"primary"}
                                                        variant={"outlined"}
                                                        style={{textTransform: 'none', marginTop: 20}}
                                                        onClick={this.openCarsRegistrationDialog}
                                                    >
                                                        Register now
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
