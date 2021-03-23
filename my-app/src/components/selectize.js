import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

function Selectize(props) {

    return (
        <Select options={props.options} onChange={props.onChange} />
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
