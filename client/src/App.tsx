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

import { v4 as uuidv4 } from 'uuid';

const useStyles = makeStyles(theme => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: 200,
      },
    },
}));

interface Item {
    id: string;
    name: string;
    quantity: number;
    purchased: boolean;
    store: string;
}

function App() {
    const classes = useStyles();
    const defaultItem: Item = {
        id: 'apple',
        name: 'Apple',
        quantity: 1,
        purchased: false,
        store: 'Giant'
    };
    const [groceries, setGroceries] = useState([defaultItem]);
    const defaultNewItem = {
        id: '',
        name: '',
        quantity: 0,
        purchased: false,
        store: ''
    }
    const [newItem, setNewItem] = useState(defaultNewItem);

    function handleInputChange(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
        event.preventDefault();
        setNewItem({...newItem, [event.target.id]: event.target.value});
    }

    function handleSubmitItem(event: React.FormEvent) {
        event.preventDefault();
        if (newItem.name !== '') {
            // Generate a unique id
            newItem.id = uuidv4(); 
            setGroceries([...groceries, newItem]);
            setNewItem(defaultNewItem);
        }
    }

    const handleDeleteItem = (id: string) => () => {
        console.log(`id to delete = ${id}`);
        const groceriesAfterDelete = groceries.filter((item: any) => {
            return item.id !== id;
        });
        setGroceries(groceriesAfterDelete);
    }

    const handlePurchase = (id: string) => () => {
        const updatedGroceries = groceries.map((item: any) => {
            if (item.id === id) {
                if (item.purchased === false) item.purchased = true;
                else item.purchased = false;
            }
            return item;
        });
        
        // Move purchased items to the bottom of the list
        updatedGroceries.sort((a: any, b: any) => {
            if(a.purchased && !b.purchased) return 1;
            if (!a.purchased && b.purchased) return -1;
            // Include if condition below to sort by text:
            // if (!a.purchased && !b.purchased) {
            //     if (a.text > b.text) return 1;
            //     if (a.text < b.text) return -1;
            // }
            return 0;
        });

        setGroceries(updatedGroceries);   
    }

    const buildTextOf = (item: any) => {
        let text = `${item.name}`;
        if (item.quantity !== 0) text += ` x ${item.quantity}`;
        if (item.store !== '') text += ` @ ${item.store}`;
        return text;
    }

    const renderList = useMemo(() => {
        return (
            <List>
                {groceries.map((item: any, index) => {
                const labelId = `checkbox-list-label-${item.id}`;
        
                return (
                    <ListItem key={index} role={undefined} dense button onClick={handlePurchase(item.id)}>
                        <ListItemIcon>
                            <Checkbox
                                checked={item.purchased}
                                inputProps={{ 'aria-labelledby': labelId }}
                            />
                        </ListItemIcon>
                        <ListItemText 
                            id={labelId} 
                            primary={buildTextOf(item)}
                        />
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
                className={classes.root} 
                noValidate autoComplete="off"
                onSubmit={handleSubmitItem}
            >
                <div>
                    <TextField 
                        required 
                        id="name" 
                        label="Item" 
                        value={newItem.name}
                        onChange={handleInputChange}
                    />
                    <TextField
                        id="quantity"
                        label="Quantity"
                        type="number"
                        value={newItem.quantity}
                        onChange={handleInputChange}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField 
                        id="store" 
                        label="Store" 
                        type="search"
                        value={newItem.store}
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
