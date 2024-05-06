import React, {useRef, useState} from 'react';
import './App.css';
import ListOfElement from './Todo/List';
import { v4 as uuidv4 } from 'uuid';

const arr = [
  {id: 1, name: 'Alice', age: 25},
  {id: 2, name: 'Bob', age: 30},
  {id: 3, name: 'Charlie', age: 40}
];
function App() {
  const [text, setText] = useState('');
  const [items, setItems] = useState(arr);
  const textInput = useRef(null);

  const valid = () => {
    textInput.current.focus()
  }

  const handleKeyDown = (event) => {
    if(event.key === 'Enter') {
      const newText = event.target.value;
      setText(newText);       
      setItems(prevItems => [...prevItems, { name: newText, id: uuidv4() }]);
      event.target.value = null;
    } 
  }

  return (
    <div>
      <input ref={textInput} defaultValue={text} onKeyDown={handleKeyDown} />
      <button onClick={() => valid()}>Click to focus</button>  
      <ListOfElement arr={items}/>
    </div>
  );
}

export default App;