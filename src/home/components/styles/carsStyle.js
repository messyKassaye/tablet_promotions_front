const carsStyle = theme=>({
    jumbotron: {
        backgroundColor: '#1976d2',
        padding: '5%',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container:{
        display: 'flex',
        flexDirection: 'column',
        marginTop:10
    },
    innerClasses:{
        display:'flex',
        flexDirection:'row',
        justifyContent: 'flex-end',
        marginBottom: 50
    },

    innerClasses2:{
        display:'flex',
        flexDirection:'row',
        justifyContent: 'flex-start',
        marginBottom:50,
        [theme.breakpoints.down('xs')]:{
            display:'flex',
            justifyContent:'center'
        }
    },
    card:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        marginBottom:50,
        [theme.breakpoints.down('xs')]:{
            flexDirection:'column',
            padding: 5,
        }
    },
    description:{
        marginRight:10,
        fontSize:'1.25em',
        textAlign:'justify',
        [theme.breakpoints.down('xs')]:{
            marginRight: 0
        }
    },
    description2:{
        marginLeft:10,
        fontSize:'1.25em'
    },
    definition_card:{
        display:'flex',
        flexDirection:'column',
        width:500,
        [theme.breakpoints.down('xs')]:{
            width: 300
        }
    }
})

export default carsStyle