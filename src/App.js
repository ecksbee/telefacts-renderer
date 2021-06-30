import React, { useEffect } from 'react';
import SelectizeBox from './components/selectizeBox';
import RViewer from './components/rViewer';
import './App.css';

function App() {

  const [entitySelected, setEntitySelected] = React.useState(null);
  const [rSetSelected, setRSetSelected] = React.useState(null);
  const [entityOptions, setEntityOptions] = React.useState([]);
  const [rSetOptions, setRSetOptions] = React.useState([]);
  const [isFetching, setIsFetching] = React.useState(false);
  const [renderablesHash, setRenderablesHash] = React.useState('');

  const handleEntityChange = (value) => {
    setEntitySelected(value);
  };
  
  const handleRSetChange = (value) => {
    setRSetSelected(value);
  };

  const urlParams = new URLSearchParams(window.location.search);
  const uuidFromQuery = urlParams.get('uuid');

  useEffect(() => {
    let unmounted = false
    const cleanup = () => {
      unmounted = true
    }
    if (unmounted) {
      return cleanup
    }
    if (!uuidFromQuery) {
      throw new Error('missing uuid');
    }
    console.log("1 " + isFetching);
    if (isFetching || renderablesHash) {
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
          value: rSet.RoleURI,
          label: rSet.RoleURI,
          key: rSet.RoleURI,
          title: rSet.Title
        }));
        setRSetOptions(rSets)
        setRSetSelected(rSets[0])
        setRenderablesHash(data.Networks[entities[0].value][rSets[0].value]);
      });
      return cleanup
  },[entityOptions, rSetOptions, rSetSelected, entitySelected, isFetching, uuidFromQuery, renderablesHash]);

  if (entitySelected && rSetSelected) {
    return (
      <><SelectizeBox onEntityChange={handleEntityChange}
      onRSetChange={handleRSetChange}
      entitySelected={entitySelected}
      entityOptions={entityOptions}
      rSetSelected={rSetSelected}
      rSetOptions={rSetOptions} />

      <RViewer rSetSelected={rSetSelected} uuidFromQuery={uuidFromQuery} renderablesHash={renderablesHash} />
      </>
    );
  }
  return null;
}

export default App;
