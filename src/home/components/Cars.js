import {Container,Typography} from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import carsStyle from "./styles/carsStyle";
import {translate} from "react-i18next";
import React, {Component} from 'react';
import {fetchCars} from "../state/action/carsAction";
import {connect} from "react-redux";
import Skeleton from "@material-ui/lab/Skeleton";
class Cars extends Component {

    componentDidMount() {
        this.props.fetchCars()
    }

    render() {
        const {classes,t} = this.props
        return (
            <div>
                <div className={classes.jumbotron}>
                    <h1>{t('home.cars.cars_message')}</h1>
                </div>
                <Container maxWidth={"lg"} className={classes.container}>
                    {
                        this.props.loading
                        ?
                            (
                               <div className={classes.container}>
                                   <div className={classes.innerClasses}>
                                       <div className={classes.card}>
                                           <div>
                                               <Skeleton variant={"text"} width={'90%'} height={20}/>
                                               <Skeleton variant={"text"} width={'70%'} height={20}/>
                                               <Skeleton variant={"text"} width={'50%'} height={20}/>
                                           </div>
                                           <Skeleton variant={"rect"} width={200} height={80}/>
                                       </div>
                                   </div>
                               </div>
                            )
                        :
                            (
                              this.props.categories.map(cars=>cars.child.map(car=>{
                                    if (car.id%2===0){
                                        return  <div className={classes.innerClasses}>
                                            <div className={classes.card}>
                                                <div className={classes.definition_card}>
                                                    <Typography color={"primary"} variant={"h5"}>
                                                        {t(`home.${car.name}`)}
                                                    </Typography>
                                                    <span className={classes.description}>{car.description}</span>
                                                </div>
                                                <img width={350} height={200} src={car.image}/>
                                            </div>
                                        </div>
                                    }else {
                                      return  <div className={classes.innerClasses2}>
                                            <div className={classes.card}>
                                                <img width={350} height={200} src={car.image}/>
                                                <div className={classes.definition_card}>
                                                    <Typography color={"primary"}  variant={"h5"}>
                                                        {t(`home.${car.name}`)}
                                                    </Typography>
                                                    <span className={classes.description2}>{car.description}</span>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                  }
                              ))
                            )
                    }
                </Container>
            </div>
        );
    }
}
const mapStateToProps = state=>({
    categories:state.homeReducer.categoriesReducer.categories,
    loading:state.homeReducer.categoriesReducer.loading
})

export default connect(mapStateToProps,{fetchCars})
(withStyles(carsStyle)(translate('common')(Cars)))