const commonAdvertViewStyle = theme=>({
    header:{
        display:"flex",
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'flex-end',
        padding:10,
        [theme.breakpoints.down('xs')]:{
            display: 'flex',
            flexDirection: 'column',
        }
    },
    buttonGroup:{
        display:'flex',
        flexDirection:'row',
        alignItems: 'center',
        [theme.breakpoints.down('xs')]:{
            padding:10
        }
    }
})

export default commonAdvertViewStyle