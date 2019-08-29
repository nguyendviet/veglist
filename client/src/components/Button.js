import React from 'react';
import {Fab, makeStyles} from '@material-ui/core';
import {Add as AddIcon} from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  fab: {
    position: 'fixed',
    bottom: theme.spacing(5),
    right: theme.spacing(2),
  }
}));

export default function FloatingActionButtons() {
  const classes = useStyles();

  return (
    <div>
      <Fab color="primary" aria-label="add" className={classes.fab}>
        <AddIcon/>
      </Fab>
    </div>
  );
}