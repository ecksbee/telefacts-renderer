import React from 'react';
import PropTypes from 'prop-types';
import ReactDataSheet from 'react-datasheet';
import 'react-datasheet/lib/react-datasheet.css';

class PGridViewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: null
    };
  }

  componentDidUpdate(prevProps) {
    if (!this.props.renderablesData) {
      return
    }
    if (prevProps && prevProps.renderablesData && this.props.renderablesData && (prevProps.renderablesData===this.props.renderablesData)) {
      return
    }

    const PGrid = this.props.renderablesData.PGrid;

    const maxColumns = PGrid.MaxIndentation + PGrid.FactualQuadrant[0].length;
    const maxRows = PGrid.MaxDepth + 1 + PGrid.FactualQuadrant.length;
    
    let grid = [];

    for (let i = 0; i < maxRows; i++) {
      grid.push([]);
      for (let j = 0; j < maxColumns; j++) {
        let cellValue = '';
        if (i === 0 && j >= PGrid.MaxIndentation) {
          cellValue = PGrid.RelevantContexts[j - PGrid.MaxIndentation].PeriodHeader.Unlabelled;
        } else if (i <= PGrid.MaxDepth && j >= PGrid.MaxIndentation) {
          if (PGrid.RelevantContexts[j-PGrid.MaxIndentation].Dimensions.length>0) {
            cellValue = PGrid.RelevantContexts[j-PGrid.MaxIndentation].Dimensions[0].ExplicitMember.Label.Default["en - english"];
          }
        } else if (i > PGrid.MaxDepth) {
          if (j < PGrid.MaxIndentation) {
            if (PGrid.IndentedLabels[i-PGrid.MaxDepth-1].Indentation === j) {
              cellValue = PGrid.IndentedLabels[i-PGrid.MaxDepth-1].Label.Default.Unlabelled;
            }
          }
        }
        grid[i].push({
          value: cellValue
        });
      }
    }
    this.setState({
      grid
    });
  }

  render() {
    if (!this.state.grid) {
      return null;
    }
    return ( <
      ReactDataSheet data = {
        this.state.grid
      }
      valueRenderer = {
        cell => cell.value
      }
      onCellsChanged = {
        changes => {
          const grid = this.state.grid.map(row => [...row]);
          changes.forEach(({
            cell,
            row,
            col,
            value
          }) => {
            grid[row][col] = {
              ...grid[row][col],
              value
            };
          });
          this.setState({
            grid
          });
        }
      }
      />
    );
  }
}

PGridViewer.propTypes = {
  renderablesData: PropTypes.object
};

export default PGridViewer