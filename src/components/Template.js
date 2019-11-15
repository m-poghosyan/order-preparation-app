import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import Tabs from './Tabs';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

export default function Template() {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid
                container
                spacing={3}
                justify="center"
            >
                <Grid item xs={10}>
                    <Paper className={classes.paper}>
                        <Tabs/>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}