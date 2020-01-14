import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import clsx from 'clsx';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

const ranges = [
    {
      value: 'piece',
      label: 'pcs',
    },
    {
      value: 'ounce',
      label: 'oz',
    },
    {
      value: 'box',
      label: 'box',
    },
  ];

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  input: {
    margin: theme.spacing(1),
  },
}));

export default function Inputs() {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
  };

  return (
    <div className={classes.container}>
      <Input
        placeholder="Item"
        className={classes.input}
        inputProps={{
          'aria-label': 'description',
        }}
      />
      <Input
        placeholder="Quantity"
        className={classes.input}
        inputProps={{
          'aria-label': 'description',
        }}
      />
      <TextField
        select
        className={clsx(classes.margin, classes.textField)}
        value={values.weightRange}
        onChange={handleChange('weightRange')}
      >
        {ranges.map(option => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      <Input
        placeholder="Store"
        className={classes.input}
        inputProps={{
          'aria-label': 'description',
        }}
      />
      <Button variant="contained" color="primary" className={classes.button}>
        Add
      </Button>
    </div>
  );
}