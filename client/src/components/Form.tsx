import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

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

export default function FormPropsTextFields(props: any) {
    const classes = useStyles();

    return (
        <form 
            className={classes.root} 
            noValidate autoComplete="off"
            onSubmit={props.handleSubmitItem}
        >
            <div>
                <TextField 
                    required id="item" 
                    label="Item" 
                    value={props.inputs.name}
                    onChange={props.handleInputChange}
                />
                <TextField
                    id="quantity"
                    label="Quantity"
                    type="number"
                    value={props.inputs.quantity}
                    onChange={props.handleInputChange}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField 
                    id="store" 
                    label="Store" 
                    type="search"
                    value={props.inputs.store}
                    onChange={props.handleInputChange}
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
