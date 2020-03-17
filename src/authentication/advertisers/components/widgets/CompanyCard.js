import React, {Component} from 'react';
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {Card} from "@material-ui/core";
import AdvertCard from "../../../commons/components/AdvertCard";

class CompanyCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showAdvert:false
        }
    }

    showAdvert = (value)=>{
        this.setState({
            showAdvert: value
        })
    }

    render() {
        const {company} = this.props
        return (
            <Card elevation={0}>
                <CardContent>
                    <Typography>{`Phone : ${company.phone}`}</Typography>
                    <Typography>Website: <a href={company.website} >{company.website}</a>
                    </Typography>
                    {
                        this.state.showAdvert
                        ?
                            (
                                <div
                                    style={{
                                        display:'flex',
                                        marginTop:15,
                                        flexDirection:'row',
                                        justifyContent:'flex-start',
                                        marginBottom:20,
                                        alignItems:'center'}}
                                >
                                    <Typography color={"primary"}>{`List of adverts`}</Typography>
                                    <Button
                                        color='primary'
                                        size='small'
                                        variant='outlined'
                                        onClick={()=>this.showAdvert(false)}
                                        disabled={company.adverts.length<=0}
                                        style={{textTransform:'none',marginLeft:10}}>
                                        Hide adverts
                                    </Button>
                                </div>
                            )
                        :
                            (

                                <div style={{
                                    display:'flex',
                                    marginTop:15,
                                    flexDirection:'row',
                                    justifyContent:'flex-start',
                                    alignItems:'center'}}>
                                    <Typography>{`Total adverts: ${company.adverts.length}`}</Typography>
                                    <Button
                                        color='secondary'
                                        size='small'
                                        variant='outlined'
                                        onClick={()=>this.showAdvert(true)}
                                        disabled={company.adverts.length<=0}
                                        style={{textTransform:'none',marginLeft:10}}>
                                        show all
                                    </Button>
                                </div>
                            )
                    }

                    {
                        this.state.showAdvert
                        ?
                            (
                                <div>
                                    {
                                        company.adverts.map(advert=>(
                                            <AdvertCard advert={advert}/>
                                        ))
                                    }
                                </div>
                            )
                        :
                            (null)
                    }
                </CardContent>
            </Card>
        );
    }
}

export default CompanyCard;