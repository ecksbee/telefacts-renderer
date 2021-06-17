import React from 'react';
import PropTypes from 'prop-types';
import ConceptNetworkViewer from '../conceptNetworkViewer';
import './rViewer.css';

function RViewer(props) {
    return (
        <div className="rViewer-box">
            <div className="rViewer-title">
                {props.rSetSelected.title}
            </div>
            <ConceptNetworkViewer />
        </div>
    );
}

RViewer.propTypes = {
    rSetSelected: PropTypes.shape({
        title: PropTypes.string
    }),
};

export default RViewer;