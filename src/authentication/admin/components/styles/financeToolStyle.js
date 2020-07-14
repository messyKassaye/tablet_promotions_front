const financeToolStyle = theme=>({
    gridList: {
        flexWrap: 'nowrap',
        flexDirection:'row',
        width: '100%',
        display:'flex',
        [theme.breakpoints.down('xs')]:{
            display:'none'
        }
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    },
})

export default financeToolStyle