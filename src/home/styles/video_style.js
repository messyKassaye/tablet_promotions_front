
const  videoStyle = theme=>({
    video:{
        display:'flex',
        flexDirection:'row',
        [theme.breakpoints.down('xs')]:{
            flexDirection: 'column'
        }
    }
})

export default videoStyle