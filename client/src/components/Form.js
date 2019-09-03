// import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
// import MenuItem from '@material-ui/core/MenuItem';

// const units = [
//     {
//       value: 'box',
//       label: 'box',
//     },
//     {
//       value: 'ounce',
//       label: 'oz',
//     }
//   ];

// const stores = [
//     {
//         value: 'giant',
//         label: 'Giant',
//     },
//     {
//         value: 'whole-foods',
//         label: 'Whole Foods',
//     }
// ];
  

// const useStyles = makeStyles(theme => ({
//     container: {
//         display: 'flex',
//         flexWrap: 'wrap',
//       },
//       textField: {
//         marginLeft: theme.spacing(1),
//         marginRight: theme.spacing(1),
//       },
//       dense: {
//         marginTop: theme.spacing(2),
//       },
//       menu: {
//         width: 200,
//       },
// }));

// export default function Inputs() {
//   const classes = useStyles();
//   const [values, setValues] = React.useState({
//     quantity: '',
//     multiline: 'Controlled',
//     unit: 'box',
//   });

//   const handleChange = name => event => {
//     setValues({ ...values, [name]: event.target.value });
//   };

//   return (
//     <form className={classes.container} noValidate autoComplete="off">
//       <Input
//         placeholder="Item"
//         fullWidth
//         className={classes.input}
//         inputProps={{
//           'aria-label': 'description',
//         }}
//       />
//       <TextField
//         id="number"
//         placeholder="Quantity"
//         value={values.quantity}
//         onChange={handleChange('quantity')}
//         type="number"
//         className={classes.textField}
//         InputLabelProps={{
//           shrink: true,
//         }}
//         margin="normal"
//       />
//       <TextField
//         id="select-quantity-native"
//         select
//         className={classes.textField}
//         value={values.unit}
//         onChange={handleChange('quantity')}
//         SelectProps={{
//           native: true,
//           MenuProps: {
//             className: classes.menu,
//           },
//         }}
//         margin="normal"
//       >
//         {units.map(option => (
//           <option key={option.value} value={option.value}>
//             {option.label}
//           </option>
//         ))}
//       </TextField>
//       {/* <TextField
//         id="select-store"
//         select
//         className={classes.textField}
//         value={values.store}
//         onChange={handleChange('store')}
//         SelectProps={{
//           MenuProps: {
//             className: classes.menu,
//           },
//         }}
//         margin="normal"
//       >
//         {stores.map(option => (
//           <MenuItem key={option.value} value={option.value}>
//             {option.label}
//           </MenuItem>
//         ))}
//       </TextField> */}
//     </form>
//   );
// }

import React from 'react';
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
]

export default function MultipleSelect() {
  const classes = useStyles();

  const [values, setValues] = React.useState({
    quantity: '',
    multiline: 'Controlled',
    units: 'box',
    stores: 'Giant'
  });

    const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
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
            />
            </FormControl>
            
            <FormControl className={clsx(classes.formControl, classes.noLabel)}>
                <Select
                    displayEmpty
                    value={values.units}
                    onChange={handleChange('units')}
                >
                    {units.map(unit => (
                        <MenuItem key={unit} value={unit}>
                        {unit}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControl className={clsx(classes.formControl, classes.noLabel)}>
                <Select
                    displayEmpty
                    value={values.stores}
                    onChange={handleChange('stores')}
                >
                    {stores.map(store => (
                        <MenuItem key={store} value={store}>
                        {store}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}