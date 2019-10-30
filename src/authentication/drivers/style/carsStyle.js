import {deepOrange} from "@material-ui/core/colors";

const carStyle = theme=>({
    root:{
        display:'flex',
        flexDirection:'row',
        paddingBottom:20,
        [theme.breakpoints.down('xs')]:{
            flexDirection: 'column'
        }
    },
    header:{
        backgroundColor:'#3C4252',
        color:'white'
    },
    container:{
       display:'flex',
       flexDirection:'row',
        flexWrap:'noWrap',
        overflow:'auto',
    },
    inner_card:{
        display: 'flex',
        flexDirection: 'row',
        width:250,
        marginLeft:20,
        marginRight:20
    },
    scroll_wrapper:{
        display:'flex',
        flexDirection:'row',
        overflowX:'auto',
        wrap:'nowrap',
        paddingBottom: 10
    },
    scroll_child:{
        backgroundColor:deepOrange[500],
        color:'white',
        flex:'0 0 auto',
        marginRight:10,
        width:'50%',
        [theme.breakpoints.down('xs')]:{
            width:'100%'
        }
    }
})

export default carStyle