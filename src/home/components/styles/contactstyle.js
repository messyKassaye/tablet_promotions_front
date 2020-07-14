import {red} from "@material-ui/core/colors";

const contactStyle = theme=>({
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
    card:{
        marginTop:-80,
        zIndex:12,
        paddingLeft: 150,
        paddingRight: 150,
        [theme.breakpoints.down('xs')]:{
            paddingLeft: 0,
            marginTop: -40,
            paddingRight: 0,
        }
    },
    advertMediaBox:{
        [theme.breakpoints.down('xs')]:{
            padding: 20
        }
    }
})
export default contactStyle