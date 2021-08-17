import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

const selectizeStyles = {
    option: (provided) => ({
        ...provided,
        fontSize: '16px',
    }),
    control: base => ({
        ...base,
        fontSize: '16px',
    }),
    menu: base => ({
        ...base,
        fontSize: '16px',
    })
};

function Selectize(props) {

    return (
            <Select inputId={props.inputId} className="selectize" styles={selectizeStyles} options={props.options} onChange={props.onChange} defaultValue={props.selected} />  
    );
}

Selectize.propTypes = {
    options: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string,
        key: PropTypes.string
      })).isRequired,

    selected: PropTypes.shape({
        label: PropTypes.string,
        key: PropTypes.string
    }),

    onChange: PropTypes.func.isRequired
};

export default Selectize;
