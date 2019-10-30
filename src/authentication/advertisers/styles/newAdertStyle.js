const newAdverts = theme=>({
    header:{
        backgroundColor:"#3C4252",
        color:'white'
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
    button:{
        display:'flex',
        justifyContent:'flex-end',
        alignItems:'center',
        marginTop:30,
        [theme.breakpoints.down('xs')]:{
            marginTop: 0
        }
    }
})

export default newAdverts