import React from 'react';
import './App.css';
import {TodoHooksApp} from './components/TodoHooks';
import Form from './components/Form';
import Button from './components/Button';

function App() {
  return (
    <div className="App">
      <TodoHooksApp/>
      <Form/>
      <Button/>
    </div>
  );
}

export default App;
