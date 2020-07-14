const CategoriesStyle = theme=>({
    categories:{
        backgroundColor:'#1976d2',
        padding:20,
        marginBottom:20,
    },
    mainContent:{
        display:'flex',
        flexDirection:'column',
        color:'white',
        padding:0
    },
    carsHeader:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center'
    },
    large: {
        width: theme.spacing(10),
        height: theme.spacing(10),
    },
    description:{
        textAlign:'justify',
        marginTop:10
    }
})

export default CategoriesStyle