import React from 'react';
import PropTypes from 'prop-types';
import FactViewer from './facts';
import DGridDomains from './domains';

function RootDomainViewer({rootDomain, lang, labelRole}) {
    const [isViewingFacts, setFactViewer] = React.useState(true);
    const controls = <div>
        <div>
            <button className={isViewingFacts? "tab-selected" : ""} onClick={()=>setFactViewer(true)}>Facts</button>
            <button className={!isViewingFacts? "tab-selected" : ""} onClick={()=>setFactViewer(false)}>Domains</button>
        </div>
    </div>

    return (
      <div>
          {controls}
          {isViewingFacts && <FactViewer rootDomain={rootDomain} lang={lang} labelRole={labelRole} />}
          {!isViewingFacts && <DGridDomains rootDomain={rootDomain} lang={lang} labelRole={labelRole} />}
      </div>
    );
}

RootDomainViewer.propTypes = {
    rootDomain: PropTypes.object,
    lang: PropTypes.string,
    labelRole: PropTypes.string
};

export default RootDomainViewer;