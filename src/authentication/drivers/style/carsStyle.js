
const carStyle = theme=>({
    root:{
        display:'flex',
        flexDirection:'row',
        paddingBottom:20,
        [theme.breakpoints.down('xs')]:{
            flexDirection: 'column'
        }
    },
    header:{
        backgroundColor:'#3C4252',
        color:'white'
    },
    container:{
       display:'flex',
       flexDirection:'row',
        flexWrap:'noWrap',
        overflow:'auto',
    },
    inner_card:{
        display: 'flex',
        flexDirection: 'row',
        width:250,
        marginLeft:20,
        marginRight:20
    }
})

export default carStyle