import React from 'react';
import PropTypes from 'prop-types';
import ReactDataSheet from 'react-datasheet';
import 'react-datasheet/lib/react-datasheet.css';

class DGridViewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: this.getDGrid(this.props.renderablesData?.DGrid.RootDomains[0])
    };
  }

  componentDidUpdate(prevProps) {
    if (!this.props.renderablesData) {
      return
    }
    if (prevProps && prevProps.renderablesData && this.props.renderablesData && (prevProps.renderablesData===this.props.renderablesData)) {
      return
    }

    const DGrid = this.getDGrid(this.props.renderablesData.DGrid.RootDomains[0])
    this.setState({
      grid: DGrid
    });
  }

  getDGrid(DGrid) {
    if (!DGrid) {
      return null
    }
    const maxColumns = DGrid.MaxLevel + DGrid.FactualQuadrant[0].length;
    const maxRows = DGrid.MaxDepth + DGrid.FactualQuadrant.length;
    let grid = [];
    for (let i = 0; i < maxRows; i++) {
      grid.push([]);
      for (let j = 0; j < maxColumns; j++) {
        let cellValue = '';
        if (i === 0 && j >= DGrid.MaxLevel) {
          cellValue = DGrid.RelevantContexts[j - DGrid.MaxLevel].PeriodHeader.Unlabelled;
        } else if (i <= DGrid.MaxDepth && j >= DGrid.MaxLevel) {
          if (DGrid.RelevantContexts[j-DGrid.MaxLevel].Dimensions.length>0) {
            cellValue = DGrid.RelevantContexts[j-DGrid.MaxLevel].Dimensions[0].ExplicitMember.Label.Default["en - english"];
          }
        } else if (i > DGrid.MaxDepth) {
          if (j < DGrid.MaxLevel) {
            if (DGrid.PrimaryItems[i-DGrid.MaxDepth]?.Level === j) {
              cellValue = DGrid.PrimaryItems[i-DGrid.MaxDepth].Label.Default.Unlabelled;
            }
          } else {
            let thisFact = DGrid.FactualQuadrant[i-DGrid.MaxDepth-1][j-DGrid.MaxLevel].Unlabelled;
            if (thisFact.TextBlock === "") {
              cellValue = thisFact.Head.concat(thisFact.Core,thisFact.Tail);
            } else {
              cellValue = thisFact.TextBlock;
            }
          }
        }
        grid[i].push({
          value: cellValue
        });
      }
    }
    return grid
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

DGridViewer.propTypes = {
  renderablesData: PropTypes.object
};

export default DGridViewer