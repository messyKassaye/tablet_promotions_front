const historyStyle = theme=>({
    root:{
        display:'flex',
        flexDirection:'row',
        [theme.breakpoints.down('xs')]:{
            flexDirection: 'column'
        }
    },
    inner_card:{
        display: 'flex',
        flexDirection: 'row',
        width:'50%',
        marginLeft:20,
        alignItems:'center',
        [theme.breakpoints.down('xs')]:{
            width: '100%',
            marginBottom:20
        }
    }
})

export default historyStyle