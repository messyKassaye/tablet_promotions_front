import {deepOrange, red} from "@material-ui/core/colors";

const todayStyle = theme=>({
    cards:{
        display: 'flex',
        flexDirection: 'row',
        flexWrap:'wrap',
        paddingTop:20,
        marginBottom:10,
        [theme.breakpoints.down('xs')]:{
            flexDirection:'column'
        }
    },
    item:{
        backgroundColor:deepOrange[500],
        color:'white',
        width:'50%',
        [theme.breakpoints.down('xs')]:{
            width:'100%'
        }
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
})

export default todayStyle