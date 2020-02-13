const SetPlaceStyle = theme=>({
    form:{
        display:'flex',
        width:'60%',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        [theme.breakpoints.down('xs')]:{
            width:'100%'
        }
    },
    text_input:{
        width:'100%',
        position:'relative',
        marginBottom:20
    }
})

export default SetPlaceStyle