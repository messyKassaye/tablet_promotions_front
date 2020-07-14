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
        }).map(items=>{
            length += items.length
        })
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
