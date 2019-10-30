const financeWithdrawalStyle = theme=>({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
    root:{
        overflowX: 'auto',
        marginRight: 'auto',
        marginLeft: 'auto',
        marginTop: '50px',
        padding: '10px',
        margin: '10px',
        [theme.breakpoints.down('xs')]:{
            minWidth:'340px'
        }
    },
    table:{
        [theme.breakpoints.down('xs')]:{
            minWidth: 340,
        }
    },
    tableCell:{
        [theme.breakpoints.down('xs')]:{
            paddingRight: 4,
            paddingLeft: 5
        }
    },

})

export default financeWithdrawalStyle