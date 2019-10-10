import React from "react";
import {Card} from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import {connect} from "react-redux";
import Skeleton from "@material-ui/lab/Skeleton";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {green} from "@material-ui/core/colors";
import historyStyle from "../../style/historyStyle";
import withStyles from "@material-ui/core/styles/withStyles";
class TopAdvertedCompanies extends React.Component{

    constructor(props) {
        super(props);


    }

    filterCompanies = (data)=>{
        let companies = []
        data.map(cars=>cars.map(car=>car.adverts.filter(items=>{
            companies.push(items.detail.company.name)
        })))
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

    render() {
        const {classes} = this.props
        return (
            <div>
                <Card >
                    <CardHeader
                     title={this.props.loading?<Skeleton variant='rect' width={250} height={6}/>:'Top adverted companies'}
                    />
                    <CardContent>
                        {this.props.loading ? (
                                <React.Fragment>
                                    <Skeleton height={6}/>
                                    <Skeleton height={6} width="80%"/>
                                </React.Fragment>
                            ) :
                            (
                                <div className={classes.root}>
                                    {
                                        this.filterCompanies(this.props.user.map(items=>items.relations.cars))
                                            .map(items=>(
                                                <div key={items['0']} className={classes.inner_card}>
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
                                                </div>
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


export default withStyles(historyStyle)(connect(mapStateToProps)(TopAdvertedCompanies))