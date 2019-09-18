import React from "react";
import {translate} from "react-i18next";
import { Fade } from 'react-slideshow-image';
import slide from "../data/slide";

const fadeProperties = {
    duration: 5000,
    transitionDuration: 500,
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
                        <div key={item.name} className="each-fade">
                            <h2>{t(`home.${item.name}`)}</h2>
                        </div>
                    ))
                }
            </Fade>
        </div>
    )
}

export  default translate('common')(Slider)