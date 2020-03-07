import {green} from "@material-ui/core/colors";

const advertCardStyle = theme=>({
    tableCell:{
        border:'none'
    },
    customTableCell:{
        border:'none',
        color:green[500]
    },
    link:{
        textDecoration:'none',
        color:'inherit',
        "&:hover": {
            textDecoration: "underline"
        },
    }
})

export default advertCardStyle