import React, {useState} from 'react';
import Typography from '@material-ui/core/Typography';
import {
    Checkbox, Grid, IconButton,
    List, ListItem, ListItemSecondaryAction, ListItemText, 
    TextField
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import Quantity from './Quantity';
import Store from './Store';
import Unit from './Unit';

const useInputState = () => {
    const [value, setValue] = useState('');
  
    return {
        value,
        onChange: event => {
            setValue(event.target.value);
        },
        reset: () => setValue('')
    };
};

const useTodoState = (initialValue) => {
    const [todos, setTodos] = useState(initialValue);
  
    return {
        todos,
        addTodo: todoText => {
            setTodos([...todos, todoText]);
        },
        deleteTodo: todoIndex => {
            const newTodos = todos.filter((_, index) => index !== todoIndex);
            setTodos(newTodos);
        }
    };
};

const TodoForm = ({ saveTodo }) => {
    const { value, reset, onChange } = useInputState();

    return (
        <form
            onSubmit={event => {
                event.preventDefault();

                saveTodo(value);
                reset();
            }}
        >
            <TextField
                variant="outlined"
                placeholder="Add item"
                margin="dense"
                onChange={onChange}
                value={value}
            />
            {/* <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                spacing={1}
            >
                <Grid item xs={6}>
                    <Quantity/>
                </Grid>
                <Grid item xs={6}>
                    <Unit/>
                </Grid>
            </Grid>
            
            <Store/> */}
        </form>
    );
};

const TodoList = ({ todos, deleteTodo }) => (
    <List>
        {todos.map((todo, index) => (
        <ListItem key={index.toString()} dense button>
            <Checkbox tabIndex={-1} disableRipple />
            <ListItemText 
                primary={todo}
                secondary='2 box @ store'
            />
            <ListItemSecondaryAction>
                <IconButton
                    aria-label="Delete"
                    onClick={() => {
                    deleteTodo(index);
                    }}
                >
                <DeleteIcon />
            </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
        ))}
    </List>
);

const TodoHooksApp = () => {
    const { todos, addTodo, deleteTodo } = useTodoState([]);

    return (
        <div className="TodoHooksApp">
        <Typography component="h1" variant="h2">
            VegList
        </Typography>

        <TodoForm
            saveTodo={todoText => {
                const trimmedText = todoText.trim();

                if (trimmedText.length > 0) {
                    addTodo(trimmedText);
                }
            }}
        />

        <TodoList todos={todos} deleteTodo={deleteTodo} />
        </div>
    );
};

export {TodoHooksApp};
