import React from 'react'
import { translate } from 'react-i18next';
import HeaderJumbotron from "./widgets/HeaderJumbotron";
import Whatistabletpromotion from "./widgets/Whatistabletpromotion";
import HowItWorks from "./widgets/HowItWorks";
import withStyles from "@material-ui/core/styles/withStyles";
import homeStyle from "./styles/homeStyle";
import Categories from "./widgets/Categories";
import AdvertMedia from "./widgets/AdvertMedia";
import {webAccessor} from "../state/action/globalWebAccessor";
import {connect} from "react-redux";
class Home extends React.Component{
    constructor() {
        super();
        this.state = {
            formData:{
                'identity_id':"0",
                'time':"",
                "device_type":"windows"
            }
        }
    }
    componentDidMount() {
        this.props.webAccessor(this.state.formData)
    }

    render() {
        const {classes,t} = this.props
        return <div>
            <HeaderJumbotron></HeaderJumbotron>
            <div className={classes.designed_for}>
                <span style={{textAlign:'center'}}>{t('home.designed_for')}</span>
            </div>
            <Whatistabletpromotion/>
            <HowItWorks/>
            <Categories/>
            <AdvertMedia/>
        </div>
    }

}

const mapStateToProps = state=>({
    response:state.homeReducer.globalReducer.response,
    loading:state.homeReducer.globalReducer.loading
})

export default connect(mapStateToProps,{webAccessor})
(withStyles(homeStyle)(translate('common')(Home)))