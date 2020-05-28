import React from "react";
import {translate} from "react-i18next";
import { Fade } from 'react-slideshow-image';
import slide from "../data/slide";
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button";

const fadeProperties = {
    duration: 10000,
    transitionDuration: 1000,
    infinite: true,
    arrows:false,
    indicators: false
}
const Slider =({t})=>{
    return (
        <div className="slide-container">
            <Fade {...fadeProperties}>
                {
                    slide.map((item,index)=>(
                        <div key={item.name} className="each-fade" style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                            <h1 style={{textAlign:'center'}}>{t(`home.slider.${item.name}`)}</h1>
                           <div style={{textAlign:'center',display:"flex",justifyContent:'center',flexDirection:'column'}}>
                               <h3 style={{textAlign:'center'}}>{t(`home.slider.${item.description}`)}</h3>
                               <div style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                                   <Button
                                       color='inherit'
                                       variant='text'
                                       style={{marginRight:20,textTransform:"none"}}>
                                       {t('home.slider.watch_video')}
                                   </Button>
                                   <Button
                                       component={Link} to='/signup'
                                       variant='outlined'
                                       color='inherit'
                                       style={{textTransform:'none'}}
                                   >
                                       {t('home.slider.start_button')}
                                   </Button>
                               </div>
                           </div>
                        </div>
                    ))
                }
            </Fade>
        </div>
    )
}

export  default translate('common')(Slider)
