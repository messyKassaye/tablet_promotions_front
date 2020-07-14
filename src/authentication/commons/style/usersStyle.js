import {fade} from "@material-ui/core/styles";
import {green, grey} from "@material-ui/core/colors";

const userStyle = theme=>({
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing(7),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: 120,
            '&:focus': {
                width: 200,
            },
        },
    },
    tableCell:{
        border:'none'
    },
    customTableCell:{
        border:'none',
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        color:green[500]
    },
    link:{
        textDecoration:'none',
        color:'inherit',
        "&:hover": {
            textDecoration: "underline"
        },
    },
    tabs:{
        textTransform:'none'
    },
    profileCard:{
        backgroundColor:'#3C4252',
        color:'white'
    },
    profileCardContent:{
        display:'flex',flexDirection:'column',alignItems:'center'
    },
    profileContainer:{
        display:'flex',flexDirection:'column'
    },
    profileRowCard:{
        display:'flex',
        flexDirection:'row',
        marginTop:15
    },
    profileRowFirstLabel:{
        color:grey[700],
        display:'flex',
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center",
        marginRight:15
    },
    profileRowSecondLabel:{
        color:grey[600],
    },
    addressLabel:{
        display:'flex',
        flexDirection:"row",
        justifyContent:"flex-start",
        color:grey[700]
    }
})

export default userStyle