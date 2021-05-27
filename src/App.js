import React, {useEffect} from 'react';
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

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const uuidFromQuery = urlParams.get('uuid');
    if (!uuidFromQuery) {
      throw new Error('missing uuid');
    }
  },[]);

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


/*
- given a project's uuid (through App's props object), do the following
- get request to renderables catalog api to populate dropdown options
- store response in state
- set state for selected item to index 0 initially
*/