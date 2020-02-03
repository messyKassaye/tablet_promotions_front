import {
    makeStyles
} from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    language: {
        marginRight: 10,
        textAlign: 'center',
        fontSize: 14
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        display: 'block',
        [theme.breakpoints.up('sm')]: {
            display: 'none'
        }
    },
    brandIcon: {
        marginLeft: theme.spacing(3),
        display: 'flex',
        marginRight: theme.spacing(2),
        [theme.breakpoints.down('sm')]: {
            marginLeft: 0,
            marginRight: 0,
            display: 'none'
        }
    },
    showOnDesktop: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block'
        }
    },
    buttons: {
        textTransform: "capitalize",
    },
    nested: {
        paddingLeft: theme.spacing(6),
    },
    flags: {
        paddingRight: 20
    },
    container: {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    jumbotron: {
        backgroundColor: '#1976d2',
        padding: '5%',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
    },
    slider: {
        marginBottom: 40,
        [theme.breakpoints.down('xs')]: {
            marginBottom: 15
        }
    },
    slider_title: {
        fontSize: 40,
        [theme.breakpoints.down('xs')]: {
            fontSize: 17
        }
    },
    router: {
        marginTop: 60,
        minHeight:'100vh',
        [theme.breakpoints.down('xs')]: {
            marginTop: 55
        }
    },
    site_container:{
      display:'flex',
      flexDirection:'column',
      minHeight:'100vh'
    },
    site_content:{
        flex:1
    },
    footer: {
        position: 'absolute',
        width:'100%',
        bottom: 0,
        left:0,
        backgroundColor:"#242424",
        padding: 20
    },
    register_me_layout:{
      display:'flex',
      flexDirection: 'column'
    },
    designed_for:{
        display:'flex',
        justifyContent:'center',
        color: '#031b4e',
        padding:10,
        fontSize:'2em',
        fontWeight:'bold',
        marginBottom:20,
        alignItems:'center',
        [theme.breakpoints.down('xs')]:{
            fontSize:'1.2em',
            fontWeight:'bold'
        }
    },
    form:{
        marginTop:-40,
        zIndex:12,
        paddingLeft: 150,
        paddingRight: 150,
        [theme.breakpoints.down('xs')]:{
            paddingLeft: 0,
            paddingRight: 0,
        }
    },
    text_input:{
        width:'100%',
        marginBottom:20
    }
}))

export default useStyles