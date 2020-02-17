import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import IconButton from '@material-ui/core/IconButton';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 200,
    },
  },
}));

/**
 * Custom hooks for input fields.
 * @param initialState initialState for Input Fields
 */
function useFormFields<T>(initialState: T): [T, (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void] {
    const [inputs, setValues] = useState(initialState);
  
    return [
        inputs,
        function(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
            setValues({
                ...inputs,
                [event.target.id]: event.target.value
            });
        }
    ];
}

export default function FormPropsTextFields() {
    const classes = useStyles();
    const [inputs, handleInputChange] = useFormFields({
        item: '',
        quantity: '',
        store: ''
    });

    const handleSubmitItem = (event: React.FormEvent) => {
        event.preventDefault();
        console.log(inputs);
    };

    return (
        <form 
            className={classes.root} 
            noValidate autoComplete="off"
            onSubmit={handleSubmitItem}
        >
            <div>
                <TextField 
                    required id="item" 
                    label="Item" 
                    value={inputs.item}
                    onChange={handleInputChange}
                />
                <TextField
                    id="quantity"
                    label="Quantity"
                    type="number"
                    value={inputs.quantity}
                    onChange={handleInputChange}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField 
                    id="store" 
                    label="Store" 
                    type="search"
                    value={inputs.store}
                    onChange={handleInputChange}
                />
                <IconButton 
                    type="submit"
                    color="primary" 
                    aria-label="add to shopping cart"
                >
                    <AddShoppingCartIcon />
                </IconButton>
            </div>
        </form>
    );
}
