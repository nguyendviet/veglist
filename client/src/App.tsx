import React from 'react';
import logo from './logo.svg';
import './App.css';

import List from './components/List';

const App: React.FC = () => {
  return (
    <div className="App">
        <h1>Veg List</h1>
        <List/>
    </div>
  );
}

export default App;
