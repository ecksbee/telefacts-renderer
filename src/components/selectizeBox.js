import React from 'react';
import PropTypes from 'prop-types';
import Selectize from './selectize';
import './selectizeBox.css';

function SelectizeBox(props) {

    return (
        <div className="selectize-box">
            <div className="selectize-box-title">Concept Network Browser</div>
            <div>
                Entity: <Selectize onChange={props.onEntityChange} selected={props.entitySelected} options={props.entityOptions} />
                Relationship Set: <Selectize onChange={props.onRSetChange} selected={props.rSetSelected} options={props.rSetOptions} />
            </div>
        </div>
    );
}

SelectizeBox.propTypes = {
    entityOptions: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string,
        key: PropTypes.string
      })).isRequired,

    rSetOptions: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string,
        key: PropTypes.string
      })).isRequired,

    entitySelected: PropTypes.shape({
        label: PropTypes.string,
        key: PropTypes.string
    }),
    
    rSetSelected: PropTypes.shape({
        label: PropTypes.string,
        key: PropTypes.string
    }),

    onEntityChange: PropTypes.func.isRequired,
    onRSetChange: PropTypes.func.isRequired
};

export default SelectizeBox;