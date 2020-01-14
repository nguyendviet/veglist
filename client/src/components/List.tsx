import React, {useState} from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import CommentIcon from '@material-ui/icons/Comment';
import { CircularProgress } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
  }),
);

export default function CheckboxList() {
    let initialGroceries = [
        {
            id: "one",
            text: "Apple",
            purchased: false
        },
        {
            id: "two",
            text: "Banana",
            purchased: false
        }
    ];
    const [groceries, setGroceries] = useState(initialGroceries);

    const handlePurchase = (id: string) => () => {
        const updatedGroceries = groceries.map((item) => {
            if (item.id === id) {
                if (item.purchased === false) item.purchased = true;
                else item.purchased = false;
            }
            return item;
        });
        setGroceries(updatedGroceries);   
    }

    return (
      <List>
        {groceries.map((item) => {
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
                <IconButton edge="end" aria-label="comments">
                  <CommentIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </List>
    );
}

// export default function CheckboxList() {
//     const classes = useStyles();
//     const [checked, setChecked] = React.useState([-1]);
  
//     const handleToggle = (value: number) => () => {
//       const currentIndex = checked.indexOf(value);
//       const newChecked = [...checked];
  
//       if (currentIndex === -1) {
//         newChecked.push(value);
//       } else {
//         newChecked.splice(currentIndex, 1);
//       }
  
//       console.log(newChecked);
//       setChecked(newChecked);
//     };

//     let initialGroceries = [
//         {
//             id: "one",
//             text: "Apple",
//             purchased: false
//         },
//         {
//             id: "two",
//             text: "Banana",
//             purchased: false
//         }
//     ];
//     const [groceries, setGroceries] = useState(initialGroceries);

//     const handlePurchase = (id: string) => () => {
//         groceries.forEach((item) => {
//             if (item.id === id) {
//                 item.purchased = true;
//             }
//         });
//         setGroceries(groceries);   
//     }

//     return (
//       <List className={classes.root}>
//         {groceries.map((item) => {
//           const labelId = `checkbox-list-label-${item.id}`;
  
//           return (
//             // <ListItem key={item.id} role={undefined} dense button onClick={handleToggle(value)}>
//             <ListItem key={item.id} role={undefined} dense button onClick={handlePurchase(item.id)}>
//               <ListItemIcon>
//                 <Checkbox
//                   edge="start"
//                   checked={item.purchased}
//                   tabIndex={-1}
//                   disableRipple
//                   inputProps={{ 'aria-labelledby': labelId }}
//                 />
//               </ListItemIcon>
//               <ListItemText id={labelId} primary={item.text} />
//               <ListItemSecondaryAction>
//                 <IconButton edge="end" aria-label="comments">
//                   <CommentIcon />
//                 </IconButton>
//               </ListItemSecondaryAction>
//             </ListItem>
//           );
//         })}
//       </List>
//     );
// }

/*
export default function CheckboxList() {
  const classes = useStyles();
  const [checked, setChecked] = React.useState([-1]);

  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    console.log(newChecked);
    setChecked(newChecked);
  };

  return (
    <List className={classes.root}>
      {[0, 1, 2, 3].map(value => {
        const labelId = `checkbox-list-label-${value}`;

        return (
          <ListItem key={value} role={undefined} dense button onClick={handleToggle(value)}>
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={checked.indexOf(value) !== -1}
                tabIndex={-1}
                disableRipple
                inputProps={{ 'aria-labelledby': labelId }}
              />
            </ListItemIcon>
            <ListItemText id={labelId} primary={`Line item ${value + 1}`} />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="comments">
                <CommentIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
    </List>
  );
}
*/
