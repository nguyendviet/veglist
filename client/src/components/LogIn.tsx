import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Auth } from 'aws-amplify';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }),
);

export default function ContainedButtons() {
  const classes = useStyles();

  async function handleSubmit(event: { preventDefault: () => void; }) {
    event.preventDefault();
  
    try {
      await Auth.signIn('viet-test', 'thisIS1stTEST!');
      alert("Logged in");
    } catch (e) {
      alert(e.message);
    }
  }

  return (
    <div className={classes.root}>
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Log In
      </Button>
    </div>
  );
}
