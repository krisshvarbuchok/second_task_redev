import React, { useRef, useState } from 'react';
import './App.css';
import ListOfElement from './Todo/List';
import { v4 as uuidv4 } from 'uuid';
import { GlobalStyles } from './Todo/Globalstyle';
import { lightTheme, darkTheme } from './Todo/Themes';
import { ThemeProvider } from "styled-components";
import { useDarkMode } from './Todo/useDarkMode';
import Toggle from './Todo/Toggler';
import { Routes, Route, Link } from 'react-router-dom';
import FormWithRHF from './Todo/FormWithRHF';

const arr = [
  { id: 1, name: 'Alice', age: 25 },
  { id: 2, name: 'Bob', age: 30 },
  { id: 3, name: 'Charlie', age: 40 }
];
function App() {
  const [text, setText] = useState('');
  const [items, setItems] = useState(arr);
  const textInput = useRef(null);
  const [theme, themeToggler, mountedComponent] = useDarkMode();
  const themeMode = theme === 'light' ? lightTheme : darkTheme;

  const valid = () => {
    textInput.current.focus()
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      const newText = event.target.value;
      setText(newText);
      setItems(prevItems => [...prevItems, { name: newText, id: uuidv4() }]);
      event.target.value = null;
    }
  }
  if (!mountedComponent) return <div />
  return (
    <ThemeProvider theme={themeMode}>
      <>
        <GlobalStyles />
        <div>
          <Toggle theme={theme} toggleTheme={themeToggler} />
          <input ref={textInput} defaultValue={text} onKeyDown={handleKeyDown} />
          <button onClick={() => valid()}>Click to focus</button>
          <ListOfElement arr={items} />
          <div>
            <Link to={'/form-rhf'}> FormWithRHF</Link>
          </div>
          <div style={{ marginTop: '10%' }}>
            <Routes>
              <Route path='/form-rhf' element={<FormWithRHF />} />
            </Routes>
          </div>
        </div>

      </>

    </ThemeProvider>
  );
}

export default App;