import React from "react";
import {Card, Container} from "@material-ui/core";
import CardHeader from "@material-ui/core/CardHeader";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import CardContent from "@material-ui/core/CardContent";
import withStyles from "@material-ui/core/styles/withStyles";
import myCompanyStyle from "../styles/myCompaniesStyle";
import {withRouter} from 'react-router-dom'
import {translate} from "react-i18next";
import {connect} from "react-redux";
import Grid from "@material-ui/core/Grid";
import FourByFourSkeleton from "../../commons/loading/customSkeleton";
import Avatar from "@material-ui/core/Avatar";
import {grey} from "@material-ui/core/colors";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import {showMainDialog} from "../../admin/state/action/dialogAction"
import NewCompany from "./NewCompany";
import AddNewAdvert from "../../commons/components/AddNewAdvert";
import Skeleton from "@material-ui/lab/Skeleton";
import BusinessIcon from '@material-ui/icons/Business';
class MyCompanies extends React.Component{

    constructor(props) {
        super(props);

    }

    newCompany = ()=>{

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

    advertNow = company=>{
        this.props.showMainDialog({
            show:true,
            page:<AddNewAdvert company={this.props.user.relations.companies} form={{type:'Edit',data:{'company_id':company.id}}}/>,
            title: 'Add new advert',
            actions:{
                on:false,
                path:'',
                id:''
            }
        })
    }

    edit = company=>{
        this.props.showMainDialog({
            show:true,
            page:<NewCompany form={{type:'Edit',data:company}}/>,
            title:`Edit your company`,
            actions:{
                on:false,
                path:'',
                id:''
            }
        })
    }

    render() {
        const {classes} = this.props
        const {t} =this.props
        return (
            <Container maxWidth={"md"}>
                <Grid container spacing={2}>
                    <Grid item md={9} xs={12} sm={12}>
                     <Card elevation={0}>
                         <CardHeader
                             title={t('advertiser.new_company.title')}
                             avatar={<BusinessIcon/>}
                         />
                         <CardContent>
                             {
                                 this.props.loading
                                     ?
                                     (
                                         <Grid container spacing={2}>

                                             <Grid item md={12} xs={12} sm={12}>
                                                 <Skeleton variant={"rect"} height={200} style={{backgroundColor:grey[500]}}/>
                                             </Grid>

                                             <Grid item md={12} xs={12} sm={12}>
                                                 <Skeleton variant={"rect"} height={200} style={{backgroundColor:grey[500]}}/>
                                             </Grid>

                                             <Grid item md={12} xs={12} sm={12}>
                                                 <Skeleton variant={"rect"} height={200} style={{backgroundColor:grey[500]}}/>
                                             </Grid>

                                             <Grid item md={12} xs={12} sm={12}>
                                                 <Skeleton variant={"rect"} height={200} style={{backgroundColor:grey[500]}}/>
                                             </Grid>
                                         </Grid>
                                     )
                                     :
                                     (
                                         <Grid container spacing={2}>
                                             {
                                                 this.props.user.relations.companies.map(company=>(

                                                     <Grid key={company.id} item md={12} xs={12}>
                                                         <Card>
                                                             <CardHeader
                                                                 title={company.name}
                                                                 subheader={<span style={{color:grey[500]}}>{`${company.adverts.length} adverts`}</span>}
                                                                 avatar={<Avatar>{company.name[0]}</Avatar>}
                                                                 action={
                                                                     company.adverts.length<=0
                                                                         ?
                                                                         (
                                                                             <Button
                                                                                 onClick={()=>this.advertNow(company)}
                                                                                 color='inherit'
                                                                                 variant='outlined'
                                                                                 style={{textTransform:'none'}}>
                                                                                 Advert now
                                                                             </Button>
                                                                         )
                                                                         :
                                                                         (null)
                                                                 }
                                                             />
                                                             <Divider/>
                                                             <CardContent>
                                                                 {
                                                                     <Card elevation={0}>
                                                                         <CardContent>
                                                                             <Typography>{`Phone : ${company.phone}`}</Typography>
                                                                             <Typography>Website: <a href={company.website} >{company.website}</a>
                                                                             </Typography>
                                                                             <div style={{display:'flex',marginTop:15,flexDirection:'row',justifyContent:'flex-start',alignItems:'center'}}>
                                                                                 <Typography>{`Total adverts: ${company.adverts.length}`}</Typography>
                                                                                 <Button
                                                                                     color='secondary'
                                                                                     size='small'
                                                                                     variant='outlined'
                                                                                     disabled={company.adverts.length<=0}
                                                                                     style={{textTransform:'none',marginLeft:10}}>
                                                                                     show all
                                                                                 </Button>
                                                                             </div>
                                                                         </CardContent>
                                                                     </Card>
                                                                 }
                                                             </CardContent>
                                                             <CardActions style={{display:'flex',flexDirection:'row',justifyContent:'flex-end',color:'white'}}>
                                                                 <Button
                                                                     color='inherit'
                                                                     variant='text'
                                                                     style={{textTransform:'none'}}>
                                                                     Delete
                                                                 </Button>
                                                                 <Button
                                                                     onClick={()=>this.edit(company)}
                                                                     color='inherit'
                                                                     variant='outlined'
                                                                     style={{textTransform:'none'}}>
                                                                     Edit
                                                                 </Button>
                                                             </CardActions>
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

                    <Grid item md={3}>
                        <Button
                            onClick={this.newCompany}
                            color='primary'
                            variant='outlined'
                            className={classes.new_advert_button} >
                            {t('advertiser.new_company.register_new_company')}
                        </Button>
                    </Grid>
                </Grid>
            </Container>
        );
    }


}

const mapStateToProps = state=>({
    loading:state.userData.loading,
    user:state.userData.user
})

export default connect(mapStateToProps,{showMainDialog})
(translate('common')(withRouter(withStyles(myCompanyStyle)(MyCompanies))))
