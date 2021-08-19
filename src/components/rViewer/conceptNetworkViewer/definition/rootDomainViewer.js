import React from 'react';
import PropTypes from 'prop-types';
import FactViewer from './facts';
import DGridDomains from './domains';

function RootDomainViewer({rootDomain}) {
    const [isViewingFacts, setFactViewer] = React.useState(true);
    const controls = <div>
        <div>
            <button className={isViewingFacts? "tab-selected stacked" : "stacked"} onClick={()=>setFactViewer(true)}>Facts</button>
            <button className={!isViewingFacts? "tab-selected stacked" : "stacked"} onClick={()=>setFactViewer(false)}>Domains</button>
        </div>
    </div>

    return (
      <div>
          {controls}
          {isViewingFacts && <FactViewer rootDomain={rootDomain} />}
          {!isViewingFacts && <DGridDomains rootDomain={rootDomain} />}
      </div>
    );
}

RootDomainViewer.propTypes = {
    rootDomain: PropTypes.object
};

export default RootDomainViewer;