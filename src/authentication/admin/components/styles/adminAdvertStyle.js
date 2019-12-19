const adminAdvertStyle = theme=>({
    table: {
        display: 'flex',
        [theme.breakpoints.down('xs')]:{
            display:'none'
        }
    }
})

export default adminAdvertStyle
