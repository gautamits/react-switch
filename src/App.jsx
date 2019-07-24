import React from 'react';
import './App.css';
import Toggle from './Toggle'

function App() {
  return (
    <div className="App">
      <Toggle onToggle={on => console.log(on)}>
        <Toggle.On>On</Toggle.On>
        <Toggle.Off>Off</Toggle.Off>
        <Toggle.Button />
    </Toggle>
    </div>
  );
}
export default App;
