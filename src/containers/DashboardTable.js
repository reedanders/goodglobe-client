import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import Typography from '@material-ui/core/Typography';

// Generate Order Data
function createData(id, date, name, paymentMethod, amount, view) {
  return { id, date, name, paymentMethod, amount, view };
}

const rows = [
  createData(0, '16 Mar, 2019', 'Elvis Presley', 'VISA ⠀•••• 3719', 312.44, "project"),
  createData(1, '16 Mar, 2019', 'Paul McCartney',  'VISA ⠀•••• 2574', 866.99, "project"),
  createData(2, '16 Mar, 2019', 'Tom Scholz',  'MC ⠀•••• 1253', 100.81, "project"),
  createData(3, '16 Mar, 2019', 'Michael Jackson', 'AMEX ⠀•••• 2000', 654.39, "project"),
  createData(4, '15 Mar, 2019', 'Bruce Springsteen', 'VISA ⠀•••• 5919', 212.79, "project"),
];

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
  paper: {
    maxWidth: 936,
    margin: 'auto',
    overflow: 'hidden',
    padding: theme.spacing(2)
  },
}));

export default function DashboardTable() {
  const classes = useStyles();
  return (
    <Paper className={classes.paper}>
      <Title>Recent Donations</Title>
      {rows.length != 0 ? (
            <div>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Project</TableCell>
                  <TableCell>Payment Method</TableCell>
                  <TableCell>Donation Amount</TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.date}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.paymentMethod}</TableCell>
                    <TableCell>{row.amount}</TableCell>
                    <TableCell align="right"><Button variant="outlined" color="secondary" size="small" href={row.view}>Go to Project</Button></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className={classes.seeMore}>
              <Link color="primary" href="#" onClick={preventDefault}>
                See donation history
              </Link>
            </div>
            </div>
            ) : (
                  <div>
                  <Grid container justify="center" alignItems="center">
                    <Grid item><Typography variant="subtitle1" component="h2"> No recent donation information</Typography></Grid>
                  </Grid>
                  </div>
                  )}
    </Paper>
  );
}
