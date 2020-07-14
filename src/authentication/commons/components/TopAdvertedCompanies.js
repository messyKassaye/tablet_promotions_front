import React, {Component} from 'react';
import {Card, CardHeader,Typography, CardContent, Grid, Avatar,Divider} from "@material-ui/core";
import BusinessIcon from '@material-ui/icons/Business';
import {topAdvertedCompanies} from "../state/actions/topAdvertedCompanyAction";
import {connect} from "react-redux";
import Skeleton from "@material-ui/lab/Skeleton";
import {grey} from "@material-ui/core/colors";
import {translate} from "react-i18next";
class TopAdvertedCompanies extends Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {
        this.props.topAdvertedCompanies()
    }

    render() {
        const {t} = this.props
        return (
            <Card>
                <CardHeader
                title={t('common.topAdvertedCompany')}
                avatar={<BusinessIcon/>}/>
                <CardContent>{
                            this.props.loading
                            ?
                                (
                                   <Grid container spacing={2}>
                                       <Grid item md={12} xs={12} sm={12}>
                                           <Card>
                                               <CardHeader
                                               title={
                                                   <Skeleton
                                                       variant={'text'}
                                                       width={150}
                                                       height={20}
                                                       style={{backgroundColor:grey[500]}}
                                                   />}
                                               avatar={
                                                   <Skeleton
                                                   variant={'circle'}
                                                   width={50}
                                                   height={50}
                                                   style={{backgroundColor:grey[500]}}/>
                                               }
                                               subheader={
                                                   <Skeleton
                                                       variant={'text'}
                                                       width={120}
                                                       height={20}
                                                       style={{backgroundColor:grey[500]}}
                                                   />
                                               }/>
                                           </Card>
                                       </Grid>
                                   </Grid>
                                )
                            :
                                (
                                    <Grid container spacing={2}>
                                        {
                                            this.props.adverts.map(advert=>(
                                                <Grid key={advert.id} item md={12} xs={12} sm={12}>
                                                    <Card elevation={0}>
                                                        <CardHeader
                                                        title={advert.product_name}
                                                        subheader={advert.company.name}
                                                        avatar={<Avatar>{advert.product_name.charAt(0)}</Avatar>}
                                                        action={
                                                            <Typography
                                                                variant={"h6"}
                                                                color={"primary"}
                                                                style={{marginLeft:50}}
                                                            >
                                                                +20k play
                                                            </Typography>
                                                        }/>
                                                    </Card>
                                                    <Divider/>
                                                </Grid>
                                            ))
                                        }
                                    </Grid>
                                )
                        }
                </CardContent>
            </Card>
        );
    }
}
const mapStateToProps = state=>({
    adverts:state.authReducer.commonReducer.commonTopAdvertedCompanies.topAdverts,
    loading:state.authReducer.commonReducer.commonTopAdvertedCompanies.loading
})

export default translate('common')
(connect(mapStateToProps,{topAdvertedCompanies})
(TopAdvertedCompanies));