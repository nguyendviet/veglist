import React from 'react';
import logo from './logo.svg';
import './App.css';

import List from './components/List';
import Form from './components/Form';

const App: React.FC = () => {
  return (
    <div className="App">
        <h1>Veg List</h1>
        <List/>
        <Form/>
    </div>
  );
}

export default App;
