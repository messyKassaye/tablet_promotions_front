const advertInTableStyle = theme=>({
    container:{
        display:'flex',
        [theme.breakpoints.down('xs')]:{
            display:'none'
        }
    }
})

export default advertInTableStyle