import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

const units = [
    {
      value: 'box',
      label: 'box',
    },
    {
      value: 'ounce',
      label: 'oz',
    }
  ];

const stores = [
    {
        value: 'giant',
        label: 'Giant',
    },
    {
        value: 'whole-foods',
        label: 'Whole Foods',
    }
];
  

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
      },
      textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
      },
      dense: {
        marginTop: theme.spacing(2),
      },
      menu: {
        width: 200,
      },
}));

export default function Inputs() {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    quantity: '',
    multiline: 'Controlled',
    unit: 'box',
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  return (
    <form className={classes.container} noValidate autoComplete="off">
      <Input
        placeholder="Item"
        fullWidth
        className={classes.input}
        inputProps={{
          'aria-label': 'description',
        }}
      />
      <TextField
        id="number"
        placeholder="Quantity"
        value={values.quantity}
        onChange={handleChange('quantity')}
        type="number"
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        margin="normal"
      />
      <TextField
        id="select-quantity-native"
        select
        className={classes.textField}
        value={values.unit}
        onChange={handleChange('quantity')}
        SelectProps={{
          native: true,
          MenuProps: {
            className: classes.menu,
          },
        }}
        margin="normal"
      >
        {units.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </TextField>
      {/* <TextField
        id="select-store"
        select
        className={classes.textField}
        value={values.store}
        onChange={handleChange('store')}
        SelectProps={{
          MenuProps: {
            className: classes.menu,
          },
        }}
        margin="normal"
      >
        {stores.map(option => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField> */}
    </form>
  );
}