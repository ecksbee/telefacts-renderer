import React from 'react';
import PropTypes from 'prop-types';
import ConceptNetworkViewer from './conceptNetworkViewer/conceptNetworkViewer';
import './rViewer.css';

function RViewer({rSetSelected,idFromQuery,renderablesHash}) {
    return (
        <div className="rViewer-box">
            <div className="rViewer-title">
                {rSetSelected.title}
            </div>
            <ConceptNetworkViewer idFromQuery={idFromQuery} renderablesHash={renderablesHash} />
        </div>
    );
}

RViewer.propTypes = {
    rSetSelected: PropTypes.shape({
        title: PropTypes.string
    }),
    idFromQuery: PropTypes.string,
    renderablesHash: PropTypes.string
};

export default RViewer;