const dashboardStyle = theme=>({
    cards:{
       display: 'flex',
       flexDirection: 'row',
       flexWrap:'wrap',
        paddingTop:20,
       [theme.breakpoints.down('xs')]:{
           flexDirection:'column'
       }
    },
    status:{
        display:'flex',
        flexDirection:'row',
        paddingTop:20,
        [theme.breakpoints.down('xs')]:{
            flexDirection: 'column'
        }
    },
    small_device:{
        display:'flex',
        [theme.breakpoints.down('xs')]:{
            display:'none'
        }
    }
})

export default dashboardStyle