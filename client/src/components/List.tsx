import React, {useState} from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

export default function CheckboxList(props: any) {
    const initialGroceries = props.items;
    const [groceries, setGroceries] = useState(initialGroceries);

    const handleDeleteItem = (id: string) => () => {
        console.log(`id to delete = ${id}`);
        const groceriesAfterDelete = groceries.filter((item: any) => {
            return item.id !== id;
        });
        // console.log(groceriesAfterDelete);
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

    return (
      <List>
        {groceries.map((item: any) => {
          const labelId = `checkbox-list-label-${item.id}`;
  
          return (
            <ListItem key={item.id} role={undefined} dense button onClick={handlePurchase(item.id)}>
              <ListItemIcon>
                <Checkbox
                  checked={item.purchased}
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={item.text} />
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
}
