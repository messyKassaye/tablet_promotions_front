const adminCarStyle = theme=>({
    gridList: {
        flexWrap: 'nowrap',
        flexDirection:'row',
        width: '100%'
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    },
})

export default adminCarStyle
