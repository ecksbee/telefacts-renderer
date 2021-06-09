import React, { useEffect } from 'react';
import SelectizeBox from './components/selectizeBox';
import './App.css';

function App() {

  const [entitySelected, setEntitySelected] = React.useState(null);
  const [rSetSelected, setRSetSelected] = React.useState(null);
  const [entityOptions, setEntityOptions] = React.useState([]);
  const [rSetOptions, setRSetOptions] = React.useState([]);
  const [isFetching, setIsFetching] = React.useState(false);
  const [isFetchingDone, setIsFetchingDone] = React.useState(false);

  const handleEntityChange = (value) => {
    setEntitySelected(value);
  };
  
  const handleRSetChange = (value) => {
    setRSetSelected(value);
  };

  useEffect(() => {
    let unmounted = false
    const cleanup = () => {
      unmounted = true
    }
    if (unmounted) {
      return cleanup
    }
    const urlParams = new URLSearchParams(window.location.search);
    const uuidFromQuery = urlParams.get('uuid');
    if (!uuidFromQuery) {
      throw new Error('missing uuid');
    }
    if (isFetching || isFetchingDone) {
      return cleanup
    }
    setIsFetching(true)
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
        setEntitySelected(entities[0])
        const rSets = data.RelationshipSets.map(rSet => ({
          label: rSet.RoleURI,
          key: rSet.RoleURI
        }));
        setRSetOptions(rSets)
        setRSetSelected(rSets[0])
        setIsFetchingDone(true)
      });
      return cleanup
  },[entityOptions, rSetOptions, isFetchingDone, isFetching]);

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
