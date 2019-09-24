import React from "react";
import ReactLoading from 'react-loading';
const type = 'bubbles'
const color='#031b4e'
const Loading = ()=>{
    return (
        <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
            <ReactLoading type={type} color={color} height={150} width={250} />
        </div>
    )
}
export default Loading