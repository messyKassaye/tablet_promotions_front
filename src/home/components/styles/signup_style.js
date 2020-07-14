import {red} from "@material-ui/core/colors";

const style = theme=>(
    {
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
        form:{
            marginTop:-80,
            zIndex:12,
            paddingLeft: 150,
            paddingRight: 150,
            [theme.breakpoints.down('xs')]:{
                marginTop: -40,
                paddingLeft: 0,
                paddingRight: 0,
            }
        },
        text_input:{
            width:'100%',
            marginBottom:20
        },
        register_me_as:{
            display: "flex",
            flexDirection:'row',
            justifyContent: 'start',
            fontSize:17,
            color:'#031b4e',
            [theme.breakpoints.down('xs')]:{
                flexDirection:'column'
            }
        },
        submit_division:{
            display:'flex',
            flexDirection: 'row',
            [theme.breakpoints.down('xs')]:{
                flexDirection:'column'
            }
        },
        signup_button:{
            textTransform:'none',
            marginBottom:10,
            marginRight:20
        },
        registered:{
            display:"flex",
            alignItems:"center",
            color:'#031b4e',
            fontSize: 16,
            direction:'row',
        },
        forgetters:{
            display:'flex',
            [theme.breakpoints.down('xs')]:{
                display:'none'
            }
        },
        smallers:{
            padding:10,
            display:'none',
            justifyContent:'end',
            [theme.breakpoints.down('xs')]:{
                display:'flex'
            }
        },
        errors:{
            color:red[500],
            marginBottom: 15
        },
        links:{
            textDecoration:'none'
        }
    }
)

export default style
