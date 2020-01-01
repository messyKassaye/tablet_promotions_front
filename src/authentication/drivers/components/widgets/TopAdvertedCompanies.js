import React from "react";
import {Card} from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import {connect} from "react-redux";
import Skeleton from "@material-ui/lab/Skeleton";
import Typography from "@material-ui/core/Typography";
import topAdvertedCompaniesStyle from "../../style/topadvertedCompaniesStyle";
import {translate} from "react-i18next";
import withStyles from "@material-ui/core/styles/withStyles";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
class TopAdvertedCompanies extends React.Component{

    constructor(props) {
        super(props);


    }

    filterCompanies = (data)=>{
        let companies = []
        data.map(car=>car.adverts.filter(items=>{
            companies.push(items.detail.company.name)
        }))
        let sumCompaniesEntry = companies.reduce((obj, b)=>{
            obj[b] = ++obj[b] || 1;
            return obj;
        }, {});

        let entries = Object.entries(sumCompaniesEntry)
        let sorted = entries.sort((a,b)=>b[1]-a[1]).slice(0,2)
        let obj = sorted.map(items=>{
            var rv = {};
            for (var i = 0; i < items.length; ++i)
                rv[i] = items[i];
            return rv;
        })
        return obj
    }

    filterAdvertNumbers = (data,company_name)=>{
        let length =0;
        data.map(items=>{
            return items.adverts.filter(advert=>{return advert.detail.company.name===company_name})
        }).map(items=>items.map(advert=>{
            length += advert.length
        }))
        return length
    }

    render() {
        const {classes} = this.props
        const {t} = this.props
        return (
            <div>
                <Card >
                    <CardHeader
                        className={classes.header}
                     title={this.props.loading?
                         <Skeleton style={{backgroundColor:'white'}} variant='rect' width={250} height={6}/>
                     :t('driver.top_adverted_companies.title')}
                    />
                    <CardContent>
                        {this.props.loading ? (
                                <React.Fragment>
                                    <Skeleton height={6}/>
                                    <Skeleton height={6} width="80%"/>
                                </React.Fragment>
                            ) :
                            (
                                <div className={classes.scroll_wrapper}>
                                    {
                                        this.filterCompanies(this.props.user.relations.cars)
                                            .map(items=>(
                                                <Card key={items[1]} className={classes.scroll_child}>
                                                    <CardHeader
                                                    title={items[0]}
                                                    avatar={<Avatar>{items[0][0]}</Avatar>}
                                                    />
                                                    <Divider/>
                                                    <CardContent>
                                                        {
                                                            <Typography style={{color:"white"}} variant="body2" color="textSecondary" component="p">
                                                                {`${t('driver.top_adverted_companies.total_advert')} : ${this.filterAdvertNumbers(this.props.user.relations.cars,items[0])}`}
                                                            </Typography>
                                                        }
                                                    </CardContent>
                                                </Card>
                                                /*<div key={items['0']} className={classes.inner_card}>
                                                    <div>
                                                        <div style={{display:'flex',flexDirection:'row'}}>
                                                            <Typography style={{display:'flex',alignItems:'center',marginRight:5}} variant="body2" color="textSecondary" component="p">
                                                                name :
                                                            </Typography>
                                                            <Typography gutterBottom variant="h5" component="h2">
                                                                {items['0']}
                                                            </Typography>
                                                        </div>
                                                        <div style={{display:'flex',flexDirection:'row'}}>
                                                            <Typography style={{display:'flex',alignItems:'center',marginRight:5}} variant="body2" color="textSecondary" component="p">
                                                                adverts :
                                                            </Typography>
                                                            <Typography gutterBottom variant="h5" component="h2">
                                                                {items['1']}
                                                            </Typography>
                                                        </div>
                                                        <Button variant='contained' color='primary' style={{textTransform:'capitalize'}}>About</Button>
                                                    </div>
                                                </div>*/
                                            ))
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


export default translate('common')(withStyles(topAdvertedCompaniesStyle)(connect(mapStateToProps)(TopAdvertedCompanies)))
