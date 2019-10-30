import React from "react";
import dashboardStyle from "../styles/dashboardStyle";
import {Card} from "@material-ui/core";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import Fab from "@material-ui/core/Fab";
import AddIcon from '@material-ui/icons/Add'
import {Link} from "react-router-dom";
class Dashboard extends React.Component{

    constructor(props) {
        super(props);

    }

    render() {
        const {classes} = this.props
        return (
            <div>
               <Card>
                   <CardHeader
                       className={classes.header}
                       title='Your adverts'
                       action={
                           <Button
                               component={Link}
                               to='/new_adverts'
                               color='inherit'
                               variant='outlined'
                               className={classes.new_advert_button} >
                               New adverts
                           </Button>
                       }

                   />
                   <CardContent>

                   </CardContent>
               </Card>
                <Fab
                    size="medium"
                    color="secondary"
                    aria-label="add"
                    className={classes.fab}
                >
                    <AddIcon/>
                </Fab>
            </div>
        );
    }


}

export default withStyles(dashboardStyle)(Dashboard)