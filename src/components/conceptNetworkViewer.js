import React, { useEffect } from 'react';
import './conceptNetworkViewer.css';

const presentation = "presentation";
const definition = "definition";
const calculation = "calculation";

function ConceptNetworkViewer({uuidFromQuery, renderablesHash}) {
    const [tabs, setTabs] = React.useState(presentation);
    const [isFetchingDone, setIsFetchingDone] = React.useState(false);

    const presentationClass = (tabs===presentation)?"tab-selected":"";
    const definitionClass = (tabs===definition)?"tab-selected":"";
    const calculationClass = (tabs===calculation)?"tab-selected":"";

    useEffect(() => {
        if (!uuidFromQuery || !renderablesHash || isFetchingDone){
            return;
        }
        fetch('/projects/' + uuidFromQuery + '/renderables/' + renderablesHash)
        .then(response => response.json())
        .then(data => { setIsFetchingDone(true) });
    },[uuidFromQuery, renderablesHash, isFetchingDone]);

    return (
        <>
        <div className="tab">
            <button className={presentationClass} onClick={_=>setTabs(presentation)}>Presentation</button>
            <button className={definitionClass} onClick={_=>setTabs(definition)}>Definition</button>
            <button className={calculationClass} onClick={_=>setTabs(calculation)}>Calculation</button>
        </div>

        {!isFetchingDone && <div className="loader"></div>}
        </>
    )
}

export default ConceptNetworkViewer;