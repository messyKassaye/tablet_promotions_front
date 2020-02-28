import React from "react";
import CardContent from "@material-ui/core/CardContent";
import {Card} from "@material-ui/core";
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

class Cars extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            showAddIcon:true
        }
      this.openCarsRegistrationDialog = this.openCarsRegistrationDialog.bind(this)
    }


openCarsRegistrationDialog = ()=>{
     this.props.showCarRegistrationModal(true)
}


    render() {
        const {show} = this.props
        const {classes} = this.props
        const {t}= this.props
        return (
            <div>
                <Card>
                    <CardHeader
                        className={classes.header}
                        title={this.props.loading?<Skeleton style={{backgroundColor:'white'}} variant='rect' width={250} height={6}/>
                        :t('driver.cars.title') }
                        action={
                            this.props.loading
                            ?
                                (<Skeleton style={{backgroundColor:'white'}} variant='circle' width={40} height={40}/> )

                            :
                                (
                                    show?(
                                        <IconButton
                                            color='inherit'
                                            onClick={this.openCarsRegistrationDialog}
                                        >
                                            <AddIcon/>
                                        </IconButton>
                                    ):''
                                )
                        }
                    />
                    <Divider/>
                    <CardContent>
                        {this.props.loading ? (
                            <React.Fragment>
                                <Skeleton height={6} />
                                <Skeleton height={6} width="80%" />
                            </React.Fragment>
                        ) :
                            (
                               <div className={classes.scroll_wrapper}>
                                   {
                                       this.props.user.relations.cars.length>0
                                       ?
                                           (this.props.user.relations.cars.map(cars=>(
                                                   <Card key={cars.id} className={classes.scroll_child}>
                                                       <CardHeader
                                                           style={{color:"white"}}
                                                       title={`${cars.plate_number}`}
                                                       subheader={cars.car_category[0].name}
                                                       avatar={<Avatar width={40} height={40}>{cars.car_category[0].name[0]}</Avatar>}
                                                       />
                                                       <Divider/>
                                                       <CardContent>
                                                           <Typography style={{color:"white"}} variant="body2" color="textSecondary" component="p">
                                                               {`${t('driver.cars.adverts')} = ${cars.adverts.length}`}
                                                           </Typography>
                                                       </CardContent>
                                                   </Card>
                                           )))
                                       :
                                       (
                                          <span>Please register your car now and start advertising now</span>
                                       )
                                   }
                               </div>
                            )

                        }
                    </CardContent>
                </Card>
            </div>
        );
    }


}

const mapStateToProps = state=>(
    {
        user: state.userData.user,
        loading:state.userData.loading
    }
)

export default translate('common')(withStyles(carStyle)(connect(mapStateToProps,{showCarRegistrationModal})(Cars)))
