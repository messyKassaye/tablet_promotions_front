import React, {Component} from 'react';
import {ExpansionPanel} from "@material-ui/core";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Typography from "@material-ui/core/Typography";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Divider from "@material-ui/core/Divider";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
class MyAdvertsForPhone extends Component {
    render() {
        return (
            <ExpansionPanel style={{width:'100%',margin:0,padding:0}}>
                <ExpansionPanelSummary
                 expandIcon={<ExpandMoreIcon/>}
                 aria-controls={this.props.company.id}
                 id={this.props.company.id}
                >
                    <Typography gutterBottom>{this.props.company.name}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>Product name:</TableCell>
                                <TableCell>Tablet promotions</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        );
    }
}

export default MyAdvertsForPhone;
