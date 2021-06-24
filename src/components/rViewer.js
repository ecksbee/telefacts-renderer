import React from 'react';
import PropTypes from 'prop-types';
import ConceptNetworkViewer from './conceptNetworkViewer';
import './rViewer.css';

function RViewer({rSetSelected,uuidFromQuery,renderablesHash}) {
    return (
        <div className="rViewer-box">
            <div className="rViewer-title">
                {rSetSelected.title}
            </div>
            <ConceptNetworkViewer uuidFromQuery={uuidFromQuery} renderablesHash={renderablesHash} />
        </div>
    );
}

RViewer.propTypes = {
    rSetSelected: PropTypes.shape({
        title: PropTypes.string
    }),
    uuidFromQuery: PropTypes.string,
    renderablesHash: PropTypes.string
};

export default RViewer;