const mediaPlayerStyle = theme=>({
    video:{
        width:800,
        [theme.breakpoints.down('xs')]:{
            width: 400
        }
    }
})

export default mediaPlayerStyle