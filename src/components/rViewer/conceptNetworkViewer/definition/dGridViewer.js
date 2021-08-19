import React from 'react';
import PropTypes from 'prop-types';
import ArcDiagram from './arcDiagram';
import RootDomainViewer from './rootDomainViewer';

function DGridViewer({renderablesData, renderablesHash}) {
    const [currHash, setHash] = React.useState('');
    const [isVisualizationEnabled, setVisualization] = React.useState(true);
    const [rootDomain, setRootDomain] = React.useState(renderablesData?.DGrid.RootDomains[0]);
    const visualizationClass = (isVisualizationEnabled)?"tab-selected stacked":"stacked";
    const sidePanel = <div id="dgrid-side-panel">
        <button className={visualizationClass} onClick={_=>setVisualization(true)}>Visualization</button>
        {
          renderablesData?.DGrid.RootDomains.map(
            item => {
              const className = !isVisualizationEnabled && rootDomain.Href === item.Href ? "tab-selected stacked" : 'stacked'
              return <button key={item.Href} className={className} onClick={_=>{
                setRootDomain(item)
                setVisualization(false)
              }}>{item.Label.Default.Unlabelled}</button>
            }
          )
        }
    </div>
    React.useEffect(() => {
      if (renderablesHash !== currHash) {
        setVisualization(true)
        setRootDomain(renderablesData?.DGrid.RootDomains[0])
        setHash(renderablesHash)
      }
    }, [currHash, renderablesData?.DGrid.RootDomains, renderablesHash])

    if (isVisualizationEnabled) {
      return (
        <div>
          {sidePanel}
          <div id='dgrid-main-panel'><ArcDiagram data={drsToD3(renderablesData?.DGrid.DRS)} renderablesHash={renderablesHash} /></div>
        </div>
      )
    }
    return (
      <div>
        {sidePanel}
        <div id='dgrid-main-panel'><RootDomainViewer rootDomain={rootDomain} /></div>
      </div>
    );
}

const drsToD3 = (drs) => {
  if (!drs) {
    return ({
      nodes: [],
      links: [],
      attributes: {}
    })
  }
  return ({
    nodes: drs.Nodes.map(
      item => ({
        name: item.Label.Default.Unlabelled,
        n: 1,
        grp: 1,
        id: item.Href
      })
    ),
    links: drs.Links.map(
      item => ({
        source: item.SourceHref,
        target: item.TargetHref,
        value: 1
      })
    ),
    attributes: {}
  })
}

DGridViewer.propTypes = {
  renderablesData: PropTypes.object,
  renderablesHash: PropTypes.string
};

export default DGridViewer;