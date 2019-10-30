import {deepOrange} from "@material-ui/core/colors";

const weekStyle = theme=>({
    header:{
        backgroundColor: '#3C4252',
        color: 'white',
        borderRadius: 0
    },
    cards:{
        backgroundColor: deepOrange[500],
        color: 'white'
    },
    cardContent:{
        paddingLeft:5,
        paddingRight:5
    },
    dividers:{

    }
})

export default weekStyle