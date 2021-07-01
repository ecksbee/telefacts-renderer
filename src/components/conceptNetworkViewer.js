import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './conceptNetworkViewer.css';

const presentation = "presentation";
const definition = "definition";
const calculation = "calculation";

function ConceptNetworkViewer({uuidFromQuery, renderablesHash}) {
    const [tabs, setTabs] = React.useState(presentation);
    const [currentHash, setCurrentHash] = React.useState(renderablesHash);

    const presentationClass = (tabs===presentation)?"tab-selected":"";
    const definitionClass = (tabs===definition)?"tab-selected":"";
    const calculationClass = (tabs===calculation)?"tab-selected":"";

    useEffect(() => {
        if (!uuidFromQuery || (renderablesHash === currentHash)){
            return;
        }
        setCurrentHash(renderablesHash);
        fetch('/projects/' + uuidFromQuery + '/renderables/' + renderablesHash)
        .then(response => response.json())
        .then(data => {});
        return
    },[uuidFromQuery, renderablesHash, currentHash]);

    return (
        <>
        <div className="tab">
            <button className={presentationClass} onClick={_=>setTabs(presentation)}>Presentation</button>
            <button className={definitionClass} onClick={_=>setTabs(definition)}>Definition</button>
            <button className={calculationClass} onClick={_=>setTabs(calculation)}>Calculation</button>
        </div>

        {!(renderablesHash === currentHash) && <div className="loader" title="loader"></div>}
        </>
    )
}

ConceptNetworkViewer.propTypes = {
    uuidFromQuery: PropTypes.string,
    renderablesHash: PropTypes.string
};

export default ConceptNetworkViewer;