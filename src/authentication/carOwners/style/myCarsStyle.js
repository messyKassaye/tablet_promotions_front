const myCarStyle = theme => ({
    root: {
        padding:10,
        backgroundColor: theme.palette.background.paper,
    },
    media: {
        height: 100
    },
    car_type: {
        display: 'flex',
        [theme.breakpoints.down('xs')]: {
            display: 'none'
        }
    },
    root_grid: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap:'wrap',
        paddingTop:20,
        [theme.breakpoints.down('xs')]:{
            flexDirection:'column'
        }
    },
    child_grid:{
        [theme.breakpoints.down('xs')]:{
            marginBottom:80
        }
    },
    tabs:{
        textTransform:'capitalize'
    }
})

export default myCarStyle