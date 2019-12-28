import React from "react";
import {Card} from "@material-ui/core";
import CardHeader from "@material-ui/core/CardHeader";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/core/SvgIcon/SvgIcon";
import CardContent from "@material-ui/core/CardContent";
import withStyles from "@material-ui/core/styles/withStyles";
import myCompanyStyle from "../styles/myCompaniesStyle";
import {withRouter} from 'react-router-dom'
import {translate} from "react-i18next";
import {connect} from "react-redux";
import Grid from "@material-ui/core/Grid";
import FourByFourSkeleton from "./widgets/customSkeleton";
import Avatar from "@material-ui/core/Avatar";
import {grey} from "@material-ui/core/colors";
import Divider from "@material-ui/core/Divider";
import GridList from "@material-ui/core/GridList";
import CompanyDetails from "./widgets/CompanyDetails";
class MyCompanies extends React.Component{

    constructor(props) {
        super(props);
        this.newCompany = this.newCompany.bind(this)

    }

    newCompany = ()=>{

    }

    render() {
        const {classes} = this.props
        const {t} =this.props
        return (
            <div>
                <Card>
                    <CardHeader
                        className={classes.header}
                        title={t('advertiser.new_company.title')}
                        action={
                            <div>
                                <Button
                                    component={Link}
                                    to='/auth/advertiser/companyRegistration'
                                    color='inherit'
                                    variant='outlined'
                                    className={classes.new_advert_button} >
                                    {t('advertiser.new_company.register_new_company')}
                                </Button>
                                <IconButton
                                    component={Link}
                                    to='/new_adverts'
                                    color='inherit'
                                    variant='outlined'
                                    className={classes.addIcon} >
                                    <AddIcon/>
                                </IconButton>
                            </div>
                        }

                    />
                    <CardContent>
                        {
                            this.props.loading
                            ?
                                (
                                   <FourByFourSkeleton/>
                                )
                            :
                                (
                                    <Grid container spacing={2}>
                                        {
                                           this.props.user.relations.companies.map(company=>(

                                                   <Grid item md={4} xs={12}>
                                                       <Card className={classes.boxes}>
                                                           <CardHeader
                                                            title={company.name}
                                                            subheader={<span style={{color:grey[500]}}>{`${company.adverts.length} adverts`}</span>}
                                                            avatar={<Avatar>{company.name[0]}</Avatar>}
                                                           />
                                                           <Divider/>
                                                           <CardContent className={classes.root}>
                                                               <GridList className={classes.gridList}>
                                                                   <CompanyDetails company={company}/>
                                                               </GridList>
                                                           </CardContent>
                                                       </Card>
                                                   </Grid>
                                            ))
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

const mapStateToProps = state=>({
    loading:state.userData.loading,
    user:state.userData.user
})

export default connect(mapStateToProps,{})
(translate('common')(withRouter(withStyles(myCompanyStyle)(MyCompanies))))
