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
    }
)

export default myCompanyStyle