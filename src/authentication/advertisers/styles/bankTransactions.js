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
})

export default bankTransactionStyle