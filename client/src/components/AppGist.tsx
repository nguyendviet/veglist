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
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';

import { v4 as uuidv4 } from 'uuid';

function App() {
    let initialGroceries = [
        {
            id: 'apple',
            name: "Apple",
            quantity: 10,
            purchased: false,
            store: ''
        },
        {
            id: 'orange',
            name: "Orange",
            quantity: 10,
            purchased: false,
            store: ''
        },
        {
            id: 'banana',
            name: "Banana",
            quantity: 10,
            purchased: false,
            store: ''
        }
    ];

    const [inputs, setInputs] = useState({
        id: '', // id: uuidv4(); doesn't work. all new items have the same id
        name: '',
        quantity: 0,
        purchased: false,
        store: ''
    });

    const [groceries, setGroceries] = useState(initialGroceries);

    function handleInputChange(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
        event.preventDefault();
        // console.log(event.target.id);
        // console.log(event.target.value);
        // inputs.id = uuidv4(); this doesn't work
        setInputs({...inputs, [event.target.id]: event.target.value});
    }

    function handleSubmitItem(event: React.FormEvent) {
        event.preventDefault();
        setGroceries([...groceries, inputs]);
    }

    // Because new items have the same id, when delete one of the new items
    // all of them will be deleted
    // This should be able to delete a unique item even it has the same name
    // and other attributes with others.
    const handleDeleteItem = (id: string) => () => {
        console.log(`id to delete = ${id}`);
        const groceriesAfterDelete = groceries.filter((item: any) => {
            return item.id !== id;
        });
        setGroceries(groceriesAfterDelete);
    }

    const renderList = useMemo(() => {
        return (
            <List>
                {groceries.map((item: any, index) => {
                const labelId = `checkbox-list-label-${item.id}`;
        
                return (
                    <ListItem key={index} role={undefined} dense button>
                    <ListItemIcon>
                        <Checkbox
                        checked={item.purchased}
                        inputProps={{ 'aria-labelledby': labelId }}
                        />
                    </ListItemIcon>
                    <ListItemText id={labelId} primary={item.name} />
                    <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="delete"
                                onClick={handleDeleteItem(item.id)}
                            >
                            <DeleteIcon />
                            </IconButton>
                    </ListItemSecondaryAction>
                    </ListItem>
                );
                })}
            </List>
        );
    }, [groceries, setGroceries]);

    return (
        <div className="App">
            {renderList}
            <form 
                onSubmit={handleSubmitItem}
            >
                <div>
                    <TextField 
                        required id="name" 
                        label="Item" 
                        value={inputs.name}
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
        </div>
    );
}

export default App;
