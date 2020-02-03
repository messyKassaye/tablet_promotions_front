const style = theme=>({
    title:{
      color:'#FE545B'
    },
    descriptions:{
        textAlign:'justify',
        textJustify:'inter-word',
        marginBottom:10
    },
    small_card:{
        display:'none',
        [theme.breakpoints.up('sm')]:{
            display: 'block'
        }
    }
})

export default style