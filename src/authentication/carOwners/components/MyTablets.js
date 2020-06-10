import React from "react";
import {connect} from "react-redux";
import {me} from "../../state/actions/usersActions";
import {Avatar, Card, CardContent, CardHeader, Divider, Grid, Typography} from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import myTabletStyle from "../style/myTabletStyle";
import FourByFourSkeleton from "../../commons/loading/customSkeleton";
import {translate}  from "react-i18next";
class MyTablets extends React.Component{

    constructor(props) {
        super(props);

    }

    filterAssignedWorkingTabletCars = (cars)=>{
        return cars.filter(cars=>{
            return cars.working_tablet.length>0
        })
    }

    render() {
        const {classes,t} = this.props
        return (
            <Card>
                <CardHeader
                    className={classes.header}
                 title={`${t('driver.tablet.title')}`}
                />
                <Divider/>
                <CardContent>
                    {
                        this.props.loading
                        ?
                            (
                               <FourByFourSkeleton/>
                            )

                        :
                            (
                               <div>
                                   {
                                      this.filterAssignedWorkingTabletCars(this.props.user.relations.cars)
                                          .length>0
                                       ?
                                          (
                                              <Grid container spacing={2}>
                                                  {
                                                      this.filterAssignedWorkingTabletCars(this.props.user.relations.cars)
                                                          .map(cars=>(
                                                              <Grid item md={6} xs={12} sm={12}>
                                                                  <Card>
                                                                      <CardHeader
                                                                       title={cars.working_tablet[0].serial_number}
                                                                       avatar={<Avatar>T</Avatar>}
                                                                      />
                                                                      <Divider/>
                                                                      <CardContent>

                                                                          <div style={{display:'flex',flexDirection:'row',marginBottom:20}}>
                                                                              <Typography>
                                                                                  {`${t('driver.tablet.total_advert')}:`}
                                                                              </Typography>
                                                                              <Typography>
                                                                                  {cars.adverts.length}
                                                                              </Typography>
                                                                          </div>

                                                                          <div style={{display:'flex',flexDirection:'row'}}>
                                                                              <Typography>
                                                                                  {`${t('driver.tablet.working_car')}:`}
                                                                              </Typography>
                                                                              <Typography>
                                                                                  {cars.plate_number}
                                                                              </Typography>
                                                                          </div>
                                                                      </CardContent>
                                                                  </Card>
                                                              </Grid>
                                                          ))
                                                  }
                                              </Grid>

                                          )
                                      :
                                          (
                                              <Typography>
                                                  {`${t("driver.tablet.no_tablet.title")}`}
                                              </Typography>
                                          )
                                   }
                               </div>
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

export default translate('common')(withStyles(myTabletStyle)(connect(mapStateToProps,{me})(MyTablets)))