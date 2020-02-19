import {green} from "@material-ui/core/colors";

const viewedAndUnpayedStyle = theme=>({
    payerCard:{
        display:'flex',
        flexDirection:'column',
        position:'fixed',
        zIndex:12223,
        top:10,
        left:10,
        [theme.breakpoints.down('xs')]:{
            display: 'none'
        }
    },
    payerCardHeader:{
        backgroundColor:green[500],
        color:'white'
    }
})
export default viewedAndUnpayedStyle