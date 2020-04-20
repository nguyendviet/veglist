import React , {useState, useMemo, useEffect} from 'react';
import './App.css';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
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

function App() {
    const [items, setItems] = useState([{name: ''}]);
    const [inputs, handleInputChange] = useFormFields({
        name: ''
    });

    function handleSubmitItem(event: React.FormEvent) {
        event.preventDefault();
        setItems([...items, inputs]);
    }

    return (
        <div>
            <form 
                noValidate autoComplete="off"
                onSubmit={handleSubmitItem}
            >
                <TextField 
                    required id="name" 
                    label="Item" 
                    value={inputs.name}
                    onChange={handleInputChange}
                />
            </form>
            {/* <button onClick={() => setItems([...items, {name: "Banana"}])}>+</button> */}
            <ul>
            {items.map((item) => (
                <li>{item.name}</li>
            ))}
            </ul>
            
        </div>
    );
}

export default App;
