
const bankDialogstyle = theme=>({
    closeButton: {
        position: 'absolute',
        right: 20,
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
    formControl:{
        margin: theme.spacing(1),
        width:'100%',
        [theme.breakpoints.down('xs')]:{
            width: '100%'
        }
    },
    text_input:{
        width: '100%',
        margin: theme.spacing(1),
    }
})

export default bankDialogstyle