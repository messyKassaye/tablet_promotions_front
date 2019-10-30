const advertsStyle = theme => (
    {
        big_device: {
            width: '100%',
            [theme.breakpoints.down('xs')]:{
                display:'none'
            }
        },
        small_device:{
          display: 'none',
          [theme.breakpoints.down('xs')]:{
              display:'flex'
          }
        },
        search:{
          display:'flex',
          [theme.breakpoints.down('xs')]:{
              display: 'none'
          }
        },
        tableWrapper: {
            overflowX: 'auto',
        },
        card_header:{
            [theme.breakpoints.down('xs')]:{
                backgroundColor:'#3C4252',
                color:'white'

            }
        }
    }
)
export default advertsStyle