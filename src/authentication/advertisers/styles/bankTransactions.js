const bankTransactionStyle = theme=>({
    header:{
        backgroundColor:"#3C4252",
        color:'white'
    },
    content:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection:'column',
        [theme.breakpoints.down('xs')]:{
            justifyContent:'flex-start',
            alignItems: 'center'
        }
    },
    container:{
        width: '60%',
        [theme.breakpoints.down('xs')]:{
            width:'100%'
        }
    },
    receipt:{
        padding:20,
        backgroundColor:'#31418F',
        width:'50%',
        borderRadius:5,
        marginTop:20,
        color:'white',
        flexDirection:'column',
        [theme.breakpoints.down('xs')]:{
            width:'100%'
        }
    },
    banks_list:{
        display: 'flex',
        justifyContent:'start',
        [theme.breakpoints.down('xs')]:{

        }
    },
    groups:{
        display: "flex",
        flexDirection:'row',
        justifyContent: 'start',
        fontSize:17,
        width:'100',
        overflowX:'auto'
    }
})

export default bankTransactionStyle