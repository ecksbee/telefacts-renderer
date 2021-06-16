import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import './rViewer.css';

function RViewer(props) {
    return (
        <div className="rViewer-box">
            <div className="rViewer-title">
                {props.rSetSelected.title}
            </div>
        </div>
    );
}

RViewer.propTypes = {
    rSetSelected: PropTypes.shape({
        title: PropTypes.string
    }),
};

export default RViewer;