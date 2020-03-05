const myCompanyStyle = theme=>(
    {
        header:{
            backgroundColor:"#3C4252",
            color:'white'
        },
        new_advert_button:{
            textTransform:'capitalize',
            display:'flex',
            [theme.breakpoints.down('xs')]:{
                display:'none'
            }
        },
        addIcon:{
            display: 'none',
            [theme.breakpoints.down('xs')]:{
                display:'flex'
            }
        },
        cards:{
            backgroundColor:"#3C4252",
            color: 'white'
        },
        boxes:{
            backgroundColor:'#31418F',
            color:'white'
        },
        gridList: {
            flexWrap: 'nowrap',
            flexDirection:'row',
            width: '100%'
            // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        },
        root: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'start',
            backgroundColor: 'transparent',
        },
        companyHeader:{
            display:'none',
            [theme.breakpoints.down('xs')]:{
                display:'flex',
                textTransform:'none',
            }
        }
    }
)

export default myCompanyStyle
