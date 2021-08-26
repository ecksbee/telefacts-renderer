import React from 'react';
import PropTypes from 'prop-types';
import ArcDiagram from './arcDiagram';
import RootDomainViewer from './rootDomainViewer';

function DGridViewer({renderablesData, renderablesHash, lang, labelRole}) {
    const [currHash, setHash] = React.useState('');
    const [isVisualizationEnabled, setVisualization] = React.useState(true);
    const [rootDomain, setRootDomain] = React.useState(renderablesData?.DGrid.RootDomains[0]);
    const visualizationClass = (isVisualizationEnabled)?"tab-selected":"";
    const sidePanel = <div id="dgrid-side-panel">
        <button className={visualizationClass} onClick={_=>setVisualization(true)}>Visualization</button>
        {
          renderablesData?.DGrid.RootDomains.map(
            item => {
              const className = !isVisualizationEnabled && rootDomain.Href === item.Href ? "tab-selected" : ''
              let label = item.Label.Default.Unlabelled
              if (item.Label[labelRole]) {
                  label = item.Label[labelRole][lang]??item.Label.Default.Unlabelled
              }
              return <button key={item.Href} className={className} onClick={_=>{
                setRootDomain(item)
                setVisualization(false)
              }}>{label}</button>
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
          <div id='dgrid-main-panel'><ArcDiagram data={drsToD3(renderablesData?.DGrid.DRS, lang, labelRole)} renderablesHash={renderablesHash} lang={lang} labelRole={labelRole} /></div>
        </div>
      )
    }
    return (
      <div>
        {sidePanel}
        <div id='dgrid-main-panel'><RootDomainViewer rootDomain={rootDomain} lang={lang} labelRole={labelRole} /></div>
      </div>
    );
}

const drsToD3 = (drs, lang, labelRole) => {
  if (!drs) {
    return ({
      nodes: [],
      links: [],
      attributes: {}
    })
  }
  return ({
    nodes: drs.Nodes.map(
      item => {
        let name = item.Label.Default.Unlabelled
        if (item.Label[labelRole]) {
          name = item.Label[labelRole][lang]??item.Label.Default.Unlabelled
        }
        return {
          name,
          n: 1,
          grp: 1,
          id: item.Href
        }
      }
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
  renderablesHash: PropTypes.string,
  lang: PropTypes.string,
  labelRole: PropTypes.string
};

export default DGridViewer;