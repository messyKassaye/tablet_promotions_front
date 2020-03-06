const mediaPlayerStyle = theme=>({
    video:{
        width:600,
        [theme.breakpoints.down('xs')]:{
            width: 340
        }
    }
})

export default mediaPlayerStyle