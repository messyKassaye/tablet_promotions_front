import React from "react";
import CardContent from "@material-ui/core/CardContent";
import {Card} from "@material-ui/core";
import CardHeader from "@material-ui/core/CardHeader";
import {connect} from "react-redux";
import Skeleton from "@material-ui/lab/Skeleton";
import Typography from "@material-ui/core/Typography";
import {green} from "@material-ui/core/colors";
import Button from "@material-ui/core/Button";
import carStyle from "../../style/carsStyle";
import withStyles from "@material-ui/core/styles/withStyles";
import CardActions from "@material-ui/core/CardActions";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from '@material-ui/icons/Add'
import {showCarRegistrationModal} from "../../state/actions/dialogActions";

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
        return (
            <div>
                <Card>
                    <CardHeader
                        className={classes.header}
                        title={this.props.loading?<Skeleton style={{backgroundColor:'white'}} variant='rect' width={250} height={6}/>:'Your cars status' }
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
                    <CardContent className={classes.container}>
                        {this.props.loading ? (
                            <React.Fragment>
                                <Skeleton height={6} />
                                <Skeleton height={6} width="80%" />
                            </React.Fragment>
                        ) :
                            (
                               <div className={classes.root}>
                                   {
                                       this.props.user.map(items=>items.relations.cars).length>0
                                       ?
                                           (this.props.user.map(items=>items.relations.cars.map(cars=>(
                                               <Card key={cars.id} className={classes.inner_card}>
                                                   <CardContent>
                                                       <Typography gutterBottom variant="h5" component="h2">
                                                           {cars.plate_number}
                                                       </Typography>
                                                       <Typography variant="body2" color="textSecondary" component="p">
                                                           Plate number
                                                       </Typography>
                                                       <Button variant='contained' color='primary' style={{textTransform:'capitalize'}}>Detail</Button>
                                                   </CardContent>
                                                   <CardActions style={{display:'flex',alignItems:'start',justifyContent:'flex-end'}}>
                                                       <Typography gutterBottom variant="h6" component="h6" component="p" style={{color:green[500]}}>
                                                           {`= ${cars.adverts.length} adverts`}
                                                       </Typography>
                                                   </CardActions>
                                               </Card>
                                           ))))
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

export default withStyles(carStyle)(connect(mapStateToProps,{showCarRegistrationModal})(Cars))