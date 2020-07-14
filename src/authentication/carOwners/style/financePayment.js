const finacePayment = theme=>({
    small_device:{
        display:'none',
        [theme.breakpoints.down('xs')]:{
            display: 'flex'
        }
    },
    big_device:{
        display: 'flex',
        width:'100%',
        [theme.breakpoints.down('xs')]:{
            display:'none'
        }
    }
})

export default finacePayment