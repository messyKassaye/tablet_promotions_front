import React, {Component} from 'react';
import AdvertProfileTab from "../../commons/components/widgets/AdvertProfileTab";
import AdvertViewTab from "../../commons/components/widgets/advertViewTab";
import AdvertViewsInPlace from "../../commons/components/widgets/AdvertViewsInPlace";
import AdvertStatics from "../../commons/components/widgets/AdvertStatics";
import {
    Avatar,
    Button,
    ButtonGroup,
    Card,
    CardContent,
    CardHeader,
    Container,
    Divider,
    Typography
} from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import {grey} from "@material-ui/core/colors";
import FourByFourSkeleton from "../../commons/loading/customSkeleton";
import {connect} from "react-redux";
import {commonShowAdvert} from "../../commons/state/actions/commonAdvertAction";
import withStyles from "@material-ui/core/styles/withStyles";
import userStyle from "../../commons/style/usersStyle";

class AdminAdvertProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected:1,
            selectedTitle:'Advert profile',
        }
    }


    componentDidMount() {
        let id = this.props.match.params.id
        this.props.commonShowAdvert(id)

    }

    onSelected = (value,title)=>{
        this.setState({
            selected:value,
            selectedTitle:title,
        })
    }

    renderComponent = ()=>{
        let selected = this.state.selected
        if (selected===1){
            return <AdvertProfileTab advert={this.props.adverts}/>
        }else if (selected===2){
            return  <AdvertViewTab advert={this.props.adverts}/>
        }else if (selected===3){
            return <AdvertViewsInPlace advert={this.props.adverts}/>
        }else if (selected===4){
            return <AdvertStatics advert={this.props.adverts}/>
        }
    }


    render() {
        const {classes} = this.props
        return (
            <Container maxWidth={"lg"}>
                <Card>
                    <CardHeader
                        title={
                            this.props.loading
                                ?
                                (<Skeleton
                                    variant={"text"}
                                    width={150}
                                    height={20}
                                    style={{backgroundColor:grey[500]}}/>)
                                :
                                (
                                    <span>{this.props.adverts.product_name}</span>
                                )
                        }
                        avatar={
                            this.props.loading
                                ?
                                (
                                    <Skeleton
                                        variant={"circle"}
                                        width={50}
                                        height={50}
                                        style={{backgroundColor:grey[500]}}/>
                                )
                                :
                                (
                                    <Avatar>{this.props.adverts.product_name.charAt(0)}</Avatar>
                                )
                        }
                        subheader={
                            this.props.loading
                                ?
                                (
                                    <Skeleton
                                        variant={"text"}
                                        width={150}
                                        height={20}
                                        style={{backgroundColor:grey[500]}}/>
                                )
                                :
                                (
                                    <span>{this.props.adverts.company.name}</span>
                                )
                        }
                        /* action={
                             <ButtonGroup>
                                 <Button
                                     color={this.state.selected===1?'secondary':'primary'}
                                     size={"small"}
                                     variant={this.state.selected===1?'contained':'outlined'}
                                     onClick={()=>this.onSelected(1)}
                                     style={{textTransform:"none"}}

                                 >
                                     Profile
                                 </Button>
                                 <Button
                                     color={this.state.selected===2?'secondary':'primary'}
                                     size={"small"}
                                     variant={this.state.selected===2?'contained':'outlined'}
                                     onClick={()=>this.onSelected(2)}
                                     style={{textTransform:"none"}}>
                                     Advert views
                                 </Button>
                                 <Button
                                     color={this.state.selected===3?'secondary':'primary'}
                                     size={"small"}
                                     variant={this.state.selected===3?'contained':'outlined'}
                                     onClick={()=>this.onSelected(3)}
                                     style={{textTransform:"none"}}>
                                     Advert places
                                 </Button>
                                 <Button
                                     color={this.state.selected===4?'secondary':'primary'}
                                     size={"small"}
                                     variant={this.state.selected===4?'contained':'outlined'}
                                     onClick={()=>this.onSelected(4)}
                                     style={{textTransform:"none"}}>
                                     Advert statics
                                 </Button>
                             </ButtonGroup>
                         }*/
                    />
                    <CardContent style={{padding:0}}>
                        <div style={{display:'flex',flexDirection:'column'}}>
                            <div style={{display:'flex',flexDirection:'row',padding:10,justifyContent:'space-between'}}>
                                <Typography
                                    color={'secondary'}
                                    style={{marginLeft:15}}
                                >
                                    {this.state.selectedTitle}
                                </Typography>
                                <ButtonGroup style={{display:'flex',flexDirection:'row',justifyContent:'flex-end'}}>
                                    <Button
                                        color={this.state.selected===1?'secondary':'primary'}
                                        size={"small"}
                                        variant={this.state.selected===1?'contained':'outlined'}
                                        onClick={()=>this.onSelected(1,'Advert profile')}
                                        style={{textTransform:"none"}}

                                    >
                                        Profile
                                    </Button>
                                    <Button
                                        color={this.state.selected===2?'secondary':'primary'}
                                        size={"small"}
                                        variant={this.state.selected===2?'contained':'outlined'}
                                        onClick={()=>this.onSelected(2,'Advert views')}
                                        style={{textTransform:"none"}}>
                                        Advert views
                                    </Button>
                                    <Button
                                        color={this.state.selected===3?'secondary':'primary'}
                                        size={"small"}
                                        variant={this.state.selected===3?'contained':'outlined'}
                                        onClick={()=>this.onSelected(3,'Advert places')}
                                        style={{textTransform:"none"}}>
                                        Advert places
                                    </Button>
                                    <Button
                                        color={this.state.selected===4?'secondary':'primary'}
                                        size={"small"}
                                        variant={this.state.selected===4?'contained':'outlined'}
                                        onClick={()=>this.onSelected(4,'Advert statics')}
                                        style={{textTransform:"none"}}>
                                        Advert statics
                                    </Button>
                                </ButtonGroup>
                            </div>
                            <Divider/>
                            <div style={{padding:20}}>
                                {
                                    this.props.loading
                                        ?
                                        (<FourByFourSkeleton/>)
                                        :
                                        (
                                            <div>
                                                {this.renderComponent()}
                                            </div>
                                        )

                                }
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </Container>
        );
    }
}

const mapStateToProps = state=>({
    adverts: state.authReducer.commonReducer.commonAdvertsReducer.advert,
    loading: state.authReducer.commonReducer.commonAdvertsReducer.loading
})

export default connect(mapStateToProps,{commonShowAdvert})
(withStyles(userStyle)(AdminAdvertProfile));
