const drawerWidth = 240;
const dashboardStyle = theme=>({
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
    fab:{
        position:'absolute',
        bottom:'0px',
        marginLeft:'75%',
        display:'none',
        textTransform:'capitalize',
        [theme.breakpoints.down('xs')]:{
            display: 'flex'
        }
    }
})
export default dashboardStyle