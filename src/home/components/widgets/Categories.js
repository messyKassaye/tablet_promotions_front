import React, {Component} from 'react';
import {Container, Grid} from "@material-ui/core";
import FourByFourSkeleton from "../../../authentication/commons/loading/customSkeleton";
import {connect} from "react-redux";
import {fetchCars} from "../../state/action/carsAction";
import {green} from "@material-ui/core/colors";
import CategoriesStyle from "../styles/CategorieStyle";
import withStyles from "@material-ui/core/styles/withStyles";
import {translate} from "react-i18next";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import LocalTaxiIcon from '@material-ui/icons/LocalTaxi';
import Skeleton from "@material-ui/lab/Skeleton";
import Divider from "@material-ui/core/Divider";
import Avatar from "@material-ui/core/Avatar";
class Categories extends Component {

    componentDidMount() {
        this.props.fetchCars()
    }

    render() {
        const {classes,t}=this.props
        return (
            <div className={classes.categories}>
                <Container maxWidth={"lg"}>
                    {
                        /* display cars type */
                        this.props.loading
                            ?
                            (
                                <Grid container spacing={2}>
                                    <Grid item md={12} xs={12}>
                                        <Skeleton variant={"rect"} width={'100%'} height={100} style={{backgroundColor:'#242424'}}/>
                                        <Skeleton variant={"rect"} width={'100%'} height={100} style={{backgroundColor:'#242424'}}/>
                                    </Grid>
                                </Grid>
                            )
                            :
                            (
                                <Card elevation={0} style={{backgroundColor:"transparent"}}>
                                        <CardContent className={classes.mainContent}>
                                            <div style={{textAlign:'center',marginBottom:20}}>
                                                <Typography variant='h3'>{t('home.categories.title')}</Typography>
                                            </div>
                                            <Grid container spacing={2}>

                                                {
                                                    this.props.categories.map(category=>(
                                                        <Grid item md={12} xs={12} sm={12} key={category.id}>
                                                            <Card>
                                                                <CardHeader
                                                                 title={category.name}
                                                                 avatar={<LocalTaxiIcon/>}
                                                                />
                                                                <Divider/>
                                                                <CardContent>
                                                                    <Grid container spacing={2}>
                                                                        {
                                                                            category.child.map(child=>(
                                                                                <Grid item md={4} xs={12} sm={12} key={child.id}>
                                                                                    <Card>
                                                                                        <CardContent>
                                                                                            <div className={classes.carsHeader}>
                                                                                                <Avatar className={classes.large} variant='rounded' src={child.image}></Avatar>
                                                                                                <Typography style={{marginTop:10}}>{child.name}</Typography>
                                                                                            </div>
                                                                                            <div className={classes.description}>
                                                                                                <Typography>{child.description}</Typography>
                                                                                            </div>

                                                                                        </CardContent>
                                                                                    </Card>
                                                                                </Grid>
                                                                            ))
                                                                        }
                                                                    </Grid>
                                                                </CardContent>
                                                            </Card>

                                                        </Grid>
                                                    ))
                                                }

                                            </Grid>
                                        </CardContent>
                                    </Card>
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

export default withStyles(CategoriesStyle)(connect(mapStateToProps,{fetchCars})(translate('common')(Categories)));