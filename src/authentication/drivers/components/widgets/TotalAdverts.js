import React from "react";
import {connect} from "react-redux";
import {Card} from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import Skeleton from "@material-ui/lab/Skeleton";
import Typography from "@material-ui/core/Typography";
import authstyle from "../../../auth_style";
import withStyles from "@material-ui/core/styles/withStyles";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
class TotalAdverts extends React.Component{

    constructor(props) {
        super(props);
        this.state={
            totalAdvert:0,
            cars:[]
        }
        this.sum = this.sum.bind(this)


    }
    sum = (cars)=>{
        let result =0
        cars.map(car=>car.map(item=>{
            result += item.adverts.length
        }))
        return result
    }


    more = (data)=>{
        this.setState({
            cars:data
        })
        console.log(this.state.cars)
    }

    render() {
        const  {classes} = this.props
        return (
          <div>
              {
                  this.props.loading?
                      (<Card className={classes.card1}>
                          <CardContent>
                              {
                                  <Typography gutterBottom variant="h5" component="h2">
                                      {
                                          this.sum(this.props.user.map(items=>items.relations.cars))
                                      }
                                  </Typography>
                              }
                              <Typography variant="body2" color="textSecondary" component="p" style={{color:'white'}}>
                                  Total adverts
                              </Typography>

                          </CardContent>
                          <CardActions className={classes.cardActions}>
                              <Button onClick={this.more.bind(this,this.props.user.map(items=>items.relations.cars))} style={{color:'white',textTransform:'capitalize'}}>
                                  <span>More</span><ChevronRightIcon/>
                              </Button>
                          </CardActions>
                      </Card>)
                      :<Skeleton variant='rect' width='100%' height={150}/>

              }
          </div>
        );
    }


}

const mapStateToProps = state=>({
    user: state.userData.user,
    loading:state.userData.loading
})

export default withStyles(authstyle)(connect(mapStateToProps)(TotalAdverts))