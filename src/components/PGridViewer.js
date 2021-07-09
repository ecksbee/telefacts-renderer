import React from 'react';
import PropTypes from 'prop-types';
import ReactDataSheet from 'react-datasheet';
import 'react-datasheet/lib/react-datasheet.css';

class PGridViewer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {grid:null};
    }

    componentDidUpdate(prevProps) {
      if (!this.props.renderablesData || (prevProps && prevProps.renderablesData && this.props.renderablesData)) {
        return
      }
      
      const maxColumns = this.props.renderablesData.PGrid.MaxIndentation+1+this.props.renderablesData.PGrid.FactualQuadrant[0].length;
      const maxRows = this.props.renderablesData.PGrid.MaxDepth+1+this.props.renderablesData.PGrid.FactualQuadrant.length;

      let grid = [];
  
      for (let i=0; i<maxRows; i++) {
        grid.push([]);
        for (let j=0; j<maxColumns; j++) {
            grid[i].push({value: i + ' x ' + j});
          }
      }
      this.setState({grid});
  }

    render() {
        if (!this.state.grid) {
            return null;
        }
      return (
        <ReactDataSheet
          data={this.state.grid}
          valueRenderer={cell => cell.value}
          onCellsChanged={changes => {
            const grid = this.state.grid.map(row => [...row]);
            changes.forEach(({ cell, row, col, value }) => {
              grid[row][col] = { ...grid[row][col], value };
            });
            this.setState({ grid });
          }}
        />
      );
    }
  }

  PGridViewer.propTypes = {
    renderablesData: PropTypes.object
};

  export default PGridViewer