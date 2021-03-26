import React from 'react';
import Selectize from './components/selectize';
import './App.css';

function App() {

  const [selected, setSelected] = React.useState(null);

  const optionList = [
    { value: 'chocolate', label: 'Chocolate', key: 'chocolate' },
    { value: 'strawberry', label: 'Strawberry', key: 'strawberry' },
    { value: 'vanilla', label: 'Vanilla', key: 'vanilla' }
  ]

  const handleChange = (value, value2) => {
    setSelected(value);
  };

  return (
    <Selectize onChange={handleChange} selected={selected} options={optionList} />
  );
}

export default App;
