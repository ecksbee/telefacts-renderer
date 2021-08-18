import React from 'react';
import PropTypes from 'prop-types';
import FactViewer from './facts';
import ArcDiagram from './arcDiagram';

function DGridViewer({renderablesData, renderablesHash}) {
    const [isVisualizationEnabled, setVisualization] = React.useState(true);
    const [rootDomain, setRootDomain] = React.useState(renderablesData?.DGrid.RootDomains[0]);

    if (isVisualizationEnabled) {
      return (
        <ArcDiagram data={drsToD3(renderablesData?.DGrid.DRS)} renderablesHash={renderablesHash} />
      )
    }
    return (
        <FactViewer rootDomain={rootDomain} />
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