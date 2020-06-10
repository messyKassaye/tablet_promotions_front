import React from "react";
import {Container, Typography, Grid, Card, CardHeader,Button,CardContent,Divider} from "@material-ui/core";
import AttachMoneyIcon from '@material-ui/icons/AttachMoney'
import LocalTaxiIcon from '@material-ui/icons/LocalTaxi';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import {translate} from "react-i18next";
import withStyles from "@material-ui/core/styles/withStyles";
import what_is_tablet_promotion_style from '../../styles/what_is_tablet_promotion_style'
import {green} from "@material-ui/core/colors";
import {Link} from "react-router-dom";
import homeStyle from "../styles/homeStyle";
class HowItWorks extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            showMore:false,
            showDownloader:false,
            showOrganizations:false,
            showDrivers:false,
            type:''
        }
    }

    handleShowMore = (show,type)=>{
        if(type==='Organizations'){
            this.setState({
                showOrganizations:true,
            })
        }else if(type==='Drivers'){
            this.setState({
                showDrivers:true,
            })
        }else {
            this.setState({
                showDownloader:true,
            })
        }

    }

    handleLess = (show,type)=>{
        if(type==='Organizations'){
            this.setState({
                showOrganizations:false,
            })
        }else if(type==='Drivers'){
            this.setState({
                showDrivers:false,
            })
        }else {
            this.setState({
                showDownloader:false,
            })
        }
    }
    render() {
        const {t} = this.props
        const {classes} = this.props
        return (
            <Container maxWidth='lg' style={{marginTop:50,marginBottom:25}}>
                <Card>
                    <CardHeader
                     title={t('home.how_it_works.title')}
                     subheader={t('home.how_it_works.description')}
                    />
                    <Divider/>
                    <CardContent>

                        <Grid container spacing={2}>

                            <Grid item md={4} xs={12} sm={12}>
                                <Card className={classes.cards}>
                                    <CardHeader
                                        title={t('home.how_it_works.organizations')}
                                        avatar={<AttachMoneyIcon/>}
                                    />
                                    <Divider/>
                                    <CardContent>
                                        {
                                            this.state.showOrganizations
                                                ?
                                                (
                                                    <div className={classes.bigCards}>
                                                        <Typography className={classes.description}>
                                                            {t('home.how_it_works.organizations_description')}
                                                        </Typography>

                                                        <Typography style={{marginTop:20}}>
                                                            {t('home.how_it_works.organizations_description_2')}
                                                        </Typography>

                                                        <Typography style={{marginTop:20,color:green[500]}}>
                                                            {t('home.how_it_works.organizations_final')}
                                                        </Typography>

                                                        <Button component={Link} to={'/signup'} color={"primary"} variant='outlined'
                                                                style={{textTransform:'none',marginTop:20}}>
                                                            {t('home.register')}
                                                        </Button>

                                                        <Button
                                                            onClick={()=>this.handleLess(false,'Organizations')}
                                                            color={"primary"}
                                                            variant={"text"}
                                                            style={{textTransform:'none',marginTop:25}}>
                                                            {t('home.how_it_works.show_less')}
                                                        </Button>
                                                    </div>
                                                )
                                                :
                                                (
                                                    <div style={{
                                                        display:'flex',
                                                        textAlign:'justify',
                                                        flexDirection:'column',
                                                        alignItems:'start'}}>
                                                        <Typography className={classes.description}>
                                                            {t('home.how_it_works.organizations_span')}
                                                        </Typography>
                                                        <Button
                                                            onClick={()=>this.handleShowMore(true,"Organizations")}
                                                            color={"primary"}
                                                            variant={"text"}
                                                            style={{textTransform:'none'}}>
                                                            {t('home.how_it_works.see_more')}
                                                        </Button>
                                                    </div>
                                                )
                                        }
                                    </CardContent>
                                </Card>
                            </Grid>

                            <Grid item md={4} xs={12} sm={12}>
                                <Card className={classes.cards}>
                                    <CardHeader
                                        title={t('home.how_it_works.carOwners')}
                                        avatar={<LocalTaxiIcon/>}
                                    />
                                    <Divider/>
                                    <CardContent>

                                        {
                                            this.state.showDrivers
                                                ?
                                                (
                                                    <div className={classes.bigCards}>
                                                        <Typography className={classes.description}>
                                                            {t('home.how_it_works.drivers_description')}
                                                        </Typography>

                                                        <Typography style={{marginTop:20}}>
                                                            {t('home.how_it_works.drivers_description_2')}
                                                        </Typography>

                                                        <Typography style={{marginTop:20,color:green[500]}}>
                                                            {t('home.how_it_works.drivers_final')}
                                                        </Typography>

                                                        <Button component={Link} to={'/signup'} color={"primary"} variant='outlined'
                                                                style={{textTransform:'none',marginTop:20}}>
                                                            {t('home.register')}
                                                        </Button>

                                                        <Button
                                                            onClick={()=>this.handleLess(false,'Drivers')}
                                                            color={"primary"}
                                                            variant={"text"}
                                                            style={{textTransform:'none',marginTop:25}}>
                                                            {t('home.how_it_works.show_less')}
                                                        </Button>
                                                    </div>
                                                )
                                                :
                                                (
                                                    <div style={{
                                                        display:'flex',
                                                        textAlign:'justify',
                                                        flexDirection:'column',
                                                        alignItems:'start'}}>
                                                        <Typography className={classes.description}>
                                                            {t('home.how_it_works.drivers_span')}
                                                        </Typography>
                                                        <Button
                                                            onClick={()=>this.handleShowMore(true,"Drivers")}
                                                            color={"primary"}
                                                            variant={"text"}
                                                            style={{textTransform:'none'}}>
                                                            {t('home.how_it_works.see_more')}
                                                        </Button>
                                                    </div>
                                                )
                                        }

                                    </CardContent>
                                </Card>
                            </Grid>

                            <Grid item md={4} xs={12} sm={12}>
                                <Card className={classes.cards}>
                                    <CardHeader
                                        title={t('home.how_it_works.downloader')}
                                        avatar={<CloudDownloadIcon/>}
                                    />
                                    <Divider/>
                                    <CardContent>

                                        {
                                            this.state.showDownloader
                                                ?
                                                (
                                                    <div className={classes.bigCards}>
                                                        <Typography className={classes.description}>
                                                            {t('home.how_it_works.downloader_description')}
                                                        </Typography>

                                                        <Typography style={{marginTop:20}}>
                                                            {t('home.how_it_works.downloader_description_2')}
                                                        </Typography>

                                                        <Typography style={{marginTop:20,color:green[500]}}>
                                                            {t('home.how_it_works.downloader_final')}
                                                        </Typography>

                                                        <Button component={Link} to={'/signup'} color={"primary"} variant='outlined'
                                                                style={{textTransform:'none',marginTop:20}}>
                                                            {t('home.register')}
                                                        </Button>

                                                        <Button
                                                            onClick={()=>this.handleLess(false,'Downloader')}
                                                            color={"primary"}
                                                            variant={"text"}
                                                            style={{textTransform:'none',marginTop:25}}>
                                                            {t('home.how_it_works.show_less')}
                                                        </Button>
                                                    </div>
                                                )
                                                :
                                                (
                                                    <div style={{
                                                        display:'flex',
                                                        textAlign:'justify',
                                                        flexDirection:'column',
                                                        alignItems:'start'}}>
                                                        <Typography className={classes.description}>
                                                            {t('home.how_it_works.downloader_span')}
                                                        </Typography>
                                                        <Button
                                                            onClick={()=>this.handleShowMore(true,"Downloader")}
                                                            color={"primary"}
                                                            variant={"text"}
                                                            style={{textTransform:'none'}}>
                                                            {t('home.how_it_works.see_more')}
                                                        </Button>
                                                    </div>
                                                )
                                        }

                                    </CardContent>
                                </Card>
                            </Grid>

                        </Grid>

                    </CardContent>
                </Card>

            </Container>
        )
    }
}

export default withStyles(homeStyle)(translate('common')(HowItWorks))