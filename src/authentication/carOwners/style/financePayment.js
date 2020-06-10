const finacePayment = theme=>({
    small_device:{
        display:'none',
        [theme.breakpoints.down('xs')]:{
            display: 'flex'
        }
    },
    big_device:{
        display: 'flex',
        [theme.breakpoints.down('xs')]:{
            display:'none'
        }
    }
})

export default finacePayment