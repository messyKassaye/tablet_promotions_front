const adminAdvertStyle = theme=>({
    table: {
        display: 'flex',
        [theme.breakpoints.down('xs')]:{
            display:'none'
        }
    },
    tabs:{
        textTransform:'none'
    }
})

export default adminAdvertStyle
