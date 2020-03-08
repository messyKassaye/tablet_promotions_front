import React, {Component} from 'react';
import {
    Avatar,
    Card,
    CardContent,
    CardHeader,
    Table,
    TableBody,
    TableCell,
    TableRow,
    Typography,
    Divider
} from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import carsCardStyle from "../style/carsCardStyle";
const StyledTableCell = withStyles(theme => ({
    body: {
        border:'none'
    },
}))(TableCell);
class CarsCard extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        const {car,classes} = this.props
        return (
            <Card>
                <CardHeader
                 title={car.plate_number}
                 subheader={
                     <div style={{display:'flex',flexDirection:'column'}}>
                         <span>{car.car_category[0].name}</span>
                         <Divider/>
                     </div>
                 }
                 avatar={
                     <Avatar src={car.car_category[0].image} width={40} height={40}/>
                 }
                />
                <CardContent>
                 <Table>
                     <TableBody>
                         <TableRow>
                             <StyledTableCell>Total adverts</StyledTableCell>
                             <StyledTableCell>{car.adverts.length}</StyledTableCell>
                         </TableRow>
                         <TableRow>
                             <StyledTableCell>Work place</StyledTableCell>
                             <StyledTableCell>
                                 {
                                     car.working_place.length>0
                                     ?
                                         (
                                             <Typography>{`${car.working_place[0].country},${car.working_place[0].city}`}</Typography>
                                         )
                                     :
                                         (
                                             <Typography color={"primary"}>Work place is not assigned</Typography>
                                         )
                                 }
                             </StyledTableCell>
                         </TableRow>

                         <TableRow>
                             <StyledTableCell>Working tablet serial number</StyledTableCell>
                             <StyledTableCell>
                                 {
                                     car.working_tablet.length>0
                                         ?
                                         (
                                             <Typography>{`${car.working_tablet[0].serial_number}`}</Typography>
                                         )
                                         :
                                         (
                                             <Typography color={"primary"}>Working tablet is not assigned</Typography>
                                         )
                                 }
                             </StyledTableCell>
                         </TableRow>
                     </TableBody>
                 </Table>
                </CardContent>
            </Card>
        );
    }
}

export default withStyles(carsCardStyle)(CarsCard);