import React from 'react';
import TextField from '@material-ui/core/TextField';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
import { NativeSelect } from '@material-ui/core';
import FormHelperText from '@material-ui/core/FormHelperText';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const units = [
    'box',
    'pieces',
    'ounces'
];

const stores = [
    'Giant',
    'Whole Foods'
];

export default function MultipleSelect() {
    const classes = useStyles();

    const [values, setValues] = React.useState({
        quantity: '',
        units: 'Unit',
        stores: 'Store'
    });

    const handleChange = name => event => {
        const val = event.target.value
        setValues({ ...values, [name]: val });
    };

    return (
        <div className={classes.root}>
            <FormControl className={classes.formControl}>
                <Input
                    placeholder="Item"
                    fullWidth
                    className={classes.input}
                    inputProps={{
                    'aria-label': 'description',
                    }}
                />
            </FormControl>

            <FormControl>
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
                    fullWidth
                />
            </FormControl>
            
            <FormControl className={clsx(classes.formControl, classes.noLabel)}>
                <Select
                    value={values.units}
                    onChange={handleChange('units')}
                    autoWidth
                    renderValue={(selected) => {
                        return selected;
                    }}
                >
                    {units.map((unit) => (
                        <MenuItem key={unit} value={unit}>
                            {unit}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControl className={clsx(classes.formControl, classes.noLabel)}>
                <Select
                    value={values.stores}
                    onChange={handleChange('stores')}
                    renderValue={(selected) => {
                        return selected;
                    }}
                    autoWidth
                >
                    {stores.map((store) => (
                        <MenuItem key={store} value={store}>
                            {store}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}
