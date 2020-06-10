import {deepOrange, deepPurple, green} from "@material-ui/core/colors";

const topAdvertedCompaniesStyle = theme=>({
    header:{
        backgroundColor:'#3C4252',
        color:'white'
    },
    scroll_wrapper:{
        display:'flex',
        flexDirection:'row',
        overflowX:'auto',
        wrap:'nowrap',
        paddingBottom: 10
    },
    scroll_child:{
        backgroundColor:green[500],
        color:'white',
        flex:'0 0 auto',
        marginRight:10,
        width:'50%',
        [theme.breakpoints.down('xs')]:{
            width:'100%'
        }
    }
})

export default topAdvertedCompaniesStyle