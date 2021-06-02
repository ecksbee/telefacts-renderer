import React, { useEffect } from 'react';
import SelectizeBox from './components/selectizeBox';
import './App.css';

function App() {

  const [entitySelected, setEntitySelected] = React.useState(null);
  const [rSetSelected, setRSetSelected] = React.useState(null);
  const [entityOptions, setEntityOptions] = React.useState([]);
  const [rSetOptions, setRSetOptions] = React.useState([]);

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
    fetch('/projects/' + uuidFromQuery + '/renderables')
      .then(response => response.json())
      .then(data => {
        const entities = data.Subjects.map(subject => {
          const value = subject.Entity.Scheme + '/' + subject.Entity.CharData;
          return {
            value,
            label: subject.Name,
            key: value
          }
        });
        setEntityOptions(entities)
        const rSets = data.RelationshipSets.map(rSet => ({
          label: rSet.RoleURI,
          key: rSet.RoleURI
        }));
        setRSetOptions(rSets)
      });
  },[entityOptions, rSetOptions]);

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
