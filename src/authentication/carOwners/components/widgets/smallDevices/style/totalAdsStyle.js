import {deepPurple} from "@material-ui/core/colors";

const totalAdsStyle = theme=>({
    header:{
        backgroundColor: '#3C4252',
        color: 'white',
        borderRadius: 0
    },
    card:{
        backgroundColor: deepPurple[500],
        color: 'white'
    },
    cardContent:{
        paddingLeft:5,
        paddingRight:5
    },
})

export default totalAdsStyle