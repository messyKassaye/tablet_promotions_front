import {deepOrange, grey} from "@material-ui/core/colors";

const myAdvertStyle = theme=>({
    header:{
        backgroundColor:"#3C4252",
        color:'white'
    },
    new_advert_button:{
        textTransform:'capitalize',
        display:'flex',
        [theme.breakpoints.down('xs')]:{
            display:'none'
        }
    },
    addIcon:{
        display: 'none',
        [theme.breakpoints.down('xs')]:{
            display:'flex'
        }
    },
    cards:{
        backgroundColor:"#3C4252",
        color: 'white'
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
    },
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'start',
        backgroundColor: 'transparent',
    },
    gridList: {
        flexWrap: 'nowrap',
        flexDirection:'row',
        width: '100%'
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    },
})

export default myAdvertStyle