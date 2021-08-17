import React from 'react';
import PropTypes from 'prop-types';
import FactViewer from './facts';

function DGridViewer({renderablesData}) {


    const rootDomain = renderablesData?.DGrid.RootDomains[0]
    return (
        <FactViewer rootDomain={rootDomain} />
    );
}

DGridViewer.propTypes = {
  renderablesData: PropTypes.object
};

export default DGridViewer;