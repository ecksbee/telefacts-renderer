import React from 'react';
import PropTypes from 'prop-types';
import FactViewer from './facts';
import ArcDiagram from './arcDiagram';

function DGridViewer({renderablesData}) {
    const [rootDomain, setRootDomain] = React.useState(renderablesData?.DGrid.RootDomains[0]);

    return (
      <ArcDiagram data={drsToD3(renderablesData?.DGrid.DRS)} />
    )
    // return (
    //     <FactViewer rootDomain={rootDomain} />
    // );
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
  renderablesData: PropTypes.object
};

export default DGridViewer;