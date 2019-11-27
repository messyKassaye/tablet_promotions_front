const newCompanyStyle = theme=>({
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
    container:{
        width: '60%',
        [theme.breakpoints.down('xs')]:{
            width:'100%'
        }
    },
    form:{
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        [theme.breakpoints.down('xs')]:{
            justifyContent:'start',
        }
    },
    formControl:{
        margin: theme.spacing(1),
        width:'100%',
        [theme.breakpoints.down('xs')]:{
            width: '100%'
        }
    },
})

export default newCompanyStyle
