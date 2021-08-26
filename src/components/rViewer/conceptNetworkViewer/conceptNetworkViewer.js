import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import PGridViewer from './presentation/pGridViewer';
import DGridViewer from './definition/dGridViewer';
import CGridViewer from './calculation/cGridViewer';
import './conceptNetworkViewer.css';

const presentation = "presentation";
const definition = "definition";
const calculation = "calculation";

function ConceptNetworkViewer({idFromQuery, renderablesHash}) {
    const [tabs, setTabs] = React.useState(presentation);
    const [currentHash, setCurrentHash] = React.useState('');
    const [renderablesData, setRenderablesData] = React.useState(null);
    const [isLabelChecked, setLabelCheckStatus] = React.useState(false);
    const [currentLang, setCurrentLang] = React.useState('Unlabelled');
    const [currentLabelRole, setCurrentLabelRole] = React.useState('Default');

    const presentationClass = (tabs===presentation)?"tab-selected":"";
    const definitionClass = (tabs===definition)?"tab-selected":"";
    const calculationClass = (tabs===calculation)?"tab-selected":"";

    useEffect(() => {
        if (!idFromQuery || !renderablesHash || (renderablesHash === currentHash)){
            return;
        }
        setCurrentHash(renderablesHash);
        fetch('/folders/' + idFromQuery + '/' + renderablesHash)
            .then(response => response.json())
            .then(data => {setRenderablesData(data)});
        return
    },[idFromQuery, renderablesHash, currentHash]);

    useEffect(() => {
        if (renderablesHash !== currentHash) {
            if (!isLabelChecked) {
                setCurrentLang('Unlabelled')
                setCurrentLabelRole('Default')
            }
            setCurrentHash(renderablesHash)
        }
      }, [currentHash, renderablesHash, isLabelChecked])

    useEffect(() => {
        if (!isLabelChecked) {
            setCurrentLang('Unlabelled')
            setCurrentLabelRole('Default')
        }
    }, [isLabelChecked])

    return (
        <>
        <div className="tab">
            <button className={presentationClass} onClick={_=>setTabs(presentation)}>Presentation</button>
            <button className={definitionClass} onClick={_=>setTabs(definition)}>Definition</button>
            <button className={calculationClass} onClick={_=>setTabs(calculation)}>Calculation</button>
                <input type='checkbox' onChange={() => setLabelCheckStatus(!isLabelChecked)} checked={isLabelChecked} />
                <select disabled={!isLabelChecked} defaultValue='Default' value={currentLabelRole} onChange={(e) => setCurrentLabelRole(e.currentTarget.value)}>
                    {
                        renderablesData?.LabelRoles.map(
                            labelRole => <option key={labelRole} onClick={()=>alert("test")}>{labelRole}</option>
                        )
                    }
                </select>
                <select disabled={!isLabelChecked} defaultValue='Unlabelled' value={currentLang} onChange={(e) => setCurrentLang(e.currentTarget.value)}>
                    {
                        renderablesData?.Lang.map(
                            lang => <option key={lang} value={lang}>{lang}</option>
                        )
                    }
                </select>
        </div>

        {(renderablesHash !== currentHash) && <div className="loader" title="loader"></div>}

        {tabs===presentation && <PGridViewer renderablesData={renderablesData} lang={currentLang} labelRole={currentLabelRole} />}
        {tabs===definition && <DGridViewer renderablesData={renderablesData} renderablesHash={renderablesHash} lang={currentLang} labelRole={currentLabelRole} />}
        {tabs===calculation && <CGridViewer renderablesData={renderablesData} renderablesHash={renderablesHash} lang={currentLang} labelRole={currentLabelRole} />}
        </>
    )
}

ConceptNetworkViewer.propTypes = {
    idFromQuery: PropTypes.string,
    renderablesHash: PropTypes.string
};

export default ConceptNetworkViewer;