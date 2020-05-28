const homeStyle = theme=>({
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
    cards:{
        backgroundColor:'#3C4252',
        color:'white',
    },
    bigCards:{
        backgroundColor:'#3C4252',
        color:'white',
        display:'flex',
        paddingBottom:22,
        textAlign:'justify',
        flexDirection:'column',
        height:'auto',
        alignItems:'start',
        [theme.breakpoints.down('xs')]:{
            height:'auto',
            alignItems:'start',
        }
    }

})

export default homeStyle