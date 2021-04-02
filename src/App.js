import React from 'react';
import SelectizeBox from './components/selectizeBox';
import './App.css';

function App() {

  const [entitySelected, setEntitySelected] = React.useState(null);
  const [rSetSelected, setRSetSelected] = React.useState(null);

  const entityOptions = [
    { value: 'chocolate', label: 'Chocolate', key: 'chocolate' },
    { value: 'strawberry', label: 'Strawberry', key: 'strawberry' },
    { value: 'vanilla', label: 'Vanilla', key: 'vanilla' }
  ]

  const rSetOptions = [
    { value: 'chocolate', label: 'Chocolate', key: 'chocolate' },
    { value: 'strawberry', label: 'Strawberry', key: 'strawberry' },
    { value: 'vanilla', label: 'Vanilla', key: 'vanilla' }
  ]

  const handleEntityChange = (value) => {
    setEntitySelected(value);
  };
  
  const handleRSetChange = (value) => {
    setRSetSelected(value);
  };

  return (
    <SelectizeBox onEntityChange={handleEntityChange}
    onRSetChange={handleRSetChange}
    entitySelected={entitySelected}
    entityOptions={entityOptions}
    rSetSelected={rSetSelected}
    rSetOptions={rSetOptions} />
  );
}

export default App;
