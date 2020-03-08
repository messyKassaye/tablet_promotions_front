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
import {grey} from "@material-ui/core/colors";

const StyledTableCell = withStyles(theme => ({
    body: {
        border:'none'
    },
}))(TableCell);
class BankAccountCard extends Component {
    render() {
        const {bankAccount} = this.props
        return (
            <Card>
                <CardHeader
                 title={bankAccount.bank.bank_name}
                 subheader={
                     <div style={{display:'flex',flexDirection:'column'}}>
                       <span style={{color:grey[500]}}>{bankAccount.bank.abbreviation}</span>
                         <Divider/>
                     </div>
                 }
                 avatar={<Avatar src={bankAccount.bank.logo_path}/>}
                />
                <CardContent>
                  <Table>
                      <TableBody>

                          <TableRow>
                              <StyledTableCell>Account number</StyledTableCell>
                              <StyledTableCell>
                                  <Typography color={"primary"}>{bankAccount.account_number}</Typography>
                              </StyledTableCell>
                          </TableRow>

                          <TableRow>
                              <StyledTableCell>Account Holder full name</StyledTableCell>
                              <StyledTableCell>
                                  <Typography color={"primary"}>{bankAccount.account_holder_full_name}</Typography>
                              </StyledTableCell>
                          </TableRow>

                      </TableBody>
                  </Table>
                </CardContent>
            </Card>
        );
    }
}

export default BankAccountCard;