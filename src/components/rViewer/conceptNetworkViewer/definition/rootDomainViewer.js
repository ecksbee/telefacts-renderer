import React from 'react';
import PropTypes from 'prop-types';
import FactViewer from './facts';

function RootDomainViewer({rootDomain}) {
    const [isViewingFacts, setFactViewer] = React.useState(true);
    const [effectiveDimension, setEffectiveDimension] = React.useState(rootDomain.EffectiveDimensions[0]);
    const controls = <div>
        <div>
            <button className={isViewingFacts? "tab-selected stacked" : "stacked"} onClick={()=>setFactViewer(true)}>Facts</button>
            <button className={!isViewingFacts? "tab-selected stacked" : "stacked"} onClick={()=>setFactViewer(false)}>Domains</button>
        </div>
        {!isViewingFacts && 
            <select>
                {
                    rootDomain.EffectiveDimensions.map(
                        dim => <option key={dim.Href} selected={dim.Href===effectiveDimension.Href} onSelect={()=>setEffectiveDimension(dim)}>{dim.Label.Default.Unlabelled}</option>
                    )
                }
            </select>
        }
    </div>

    return (
      <div>
          {controls}
          {isViewingFacts && <FactViewer rootDomain={rootDomain} />}
      </div>
    );
}

RootDomainViewer.propTypes = {
    rootDomain: PropTypes.object
};

export default RootDomainViewer;