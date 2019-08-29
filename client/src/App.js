import React from 'react';
import './App.css';
import {TodoHooksApp} from './components/TodoHooks';
import Form from './components/Form';
import Button from './components/Button';
import Modal from './components/Modal';

function App() {
  return (
    <div className="App">
      <TodoHooksApp/>
      <Form/>
      {/* <Button/> */}
      <Modal/>
    </div>
  );
}

export default App;
