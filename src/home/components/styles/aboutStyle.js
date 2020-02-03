const aboutStyle = theme=>({
    jumbotron: {
        backgroundColor: '#1976d2',
        padding: '5%',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
    },
    card:{
        marginTop:-80,
        zIndex:12,
        paddingLeft: 150,
        paddingRight: 150,
        [theme.breakpoints.down('xs')]:{
            paddingLeft: 0,
            paddingRight: 0,
        }
    },
})

export default aboutStyle