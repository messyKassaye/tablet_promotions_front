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
        color:'white'
    },

})

export default homeStyle