import React, {Component} from 'react';
import {Card, CardHeader, CardContent, Grid, IconButton, Avatar,Button,Typography} from "@material-ui/core";
import BusinessIcon from '@material-ui/icons/Business';
import {green, grey} from "@material-ui/core/colors";
import {fetchCompanies} from "../../state/action/adminCompaniesAction";
import AddIcon from '@material-ui/icons/Add'
import {connect} from "react-redux";
import Skeleton from "@material-ui/lab/Skeleton";
import {showMainDialog} from "../../state/action/dialogAction";
import NewCompany from "../../../advertisers/components/NewCompany";
import FourByFourSkeleton from "../../../commons/loading/customSkeleton";
import CompanyAdverts from "../../dialogs/component/CompanyAdverts";

class CompaniesCard extends Component {

    componentDidMount() {
        this.props.fetchCompanies()
    }

    addNewCompany = ()=>{
        this.props.showMainDialog({
            show:true,
            page:<NewCompany form={{type:'form',data:null}}/>,
            title:'Register new company',
            actions:{
                on:false,
                path:'',
                id:''
            }
        })
    }

    showCompanyAdverts = (company,adverts)=>{
        this.props.showMainDialog({
            show:true,
            page:<CompanyAdverts adverts={adverts}/>,
            title:`Adverts for ${company.name}`,
            actions:{
                on:false,
                path:'',
                id:''
            }
        })
    }

    render() {
        return (
            <Grid container spacing={2} style={{marginTop: 20}}>
                <Grid item md={12} xs={12} sm={12}>
                    <Card>
                        <CardHeader
                            title={'Companies'}
                            avatar={<BusinessIcon/>}
                            style={{backgroundColor:'#3C4252',color:'white'}}
                            action={
                                this.props.loading
                                ?
                                    (
                                        <Skeleton
                                        variant={"circle"}
                                        width={40}
                                        height={40}
                                        style={{backgroundColor:grey[500]}}/>
                                    )
                                :
                                    (
                                        <IconButton
                                            onClick={()=>this.addNewCompany()}
                                            color={'inherit'}>
                                            <AddIcon/>
                                        </IconButton>
                                    )
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
                                                    this.props.companies
                                                        .map(company=>(
                                                            <Grid item md={4} xs={12} sm={12}>
                                                                <Card>
                                                                    <CardHeader
                                                                    title={company.name}
                                                                    subheader={company.website}
                                                                    avatar={<Avatar>{company.name.charAt(0)}</Avatar>}
                                                                    action={
                                                                        <Button
                                                                            variant={"text"}
                                                                            disabled={company.adverts.length>0?false:true}
                                                                            color={"primary"}
                                                                            style={{textTransform:'none'}}
                                                                            size={'small'}
                                                                            onClick={()=>this.showCompanyAdverts(company,company.adverts)}
                                                                        >
                                                                            Show ads
                                                                        </Button>
                                                                    }/>
                                                                    <CardContent>
                                                                        <Typography>
                                                                            {`Owner : ${company.user.first_name} ${company.user.last_name}`}
                                                                        </Typography>
                                                                        <Typography>
                                                                            {`Phone : ${company.phone}`}
                                                                        </Typography>
                                                                        <Typography>
                                                                            {`Total advert: ${company.adverts.length}`}
                                                                        </Typography>
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
                </Grid>
            </Grid>
        );
    }
}

const mapStateToProps = state=>({
    companies:state.authReducer.adminReducers.adminCompanyReducer.company,
    loading:state.authReducer.adminReducers.adminCompanyReducer.loading
})

export default connect(mapStateToProps,{fetchCompanies,showMainDialog})(CompaniesCard);