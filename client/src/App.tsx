import React from 'react';
import './App.css';

import List from './components/List';
import Form from './components/Form';

export interface GroceriesInterface {
    [index: number]: {
        id: string;
        text: string;
        purchased: boolean;
    };
}

function App() {
    let initialGroceries: GroceriesInterface = [
        {
            id: "apple",
            text: "Apple",
            purchased: false
        },
        {
            id: "organe",
            text: "Orange",
            purchased: false
        },
        {
            id: "banana",
            text: "Banana",
            purchased: false
        }
    ];

    return (
        <div className="App">
            <List
                items={initialGroceries}
            />
            <Form/>
        </div>
    );
}

export default App;
