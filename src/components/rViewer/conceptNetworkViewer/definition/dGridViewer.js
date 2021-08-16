import React from 'react';
import PropTypes from 'prop-types';
import FactViewer from './facts';

function DGridViewer({renderablesData}) {
    return (
        <FactViewer renderablesData={renderablesData} />
    );
}

DGridViewer.propTypes = {
  renderablesData: PropTypes.object
};

export default DGridViewer;