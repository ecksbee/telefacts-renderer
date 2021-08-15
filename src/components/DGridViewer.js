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
    const grid = [];
    const maxRow = DGrid.PrimaryItems.length + DGrid.MaxDepth + 1;
    const maxCol = DGrid.RelevantContexts.length + DGrid.MaxLevel;
    for(let i = 0; i < maxRow; i++) {
      const row = [];
      if (i < DGrid.MaxDepth + 1) {
        for(let j = 0; j < maxCol; j++) {
          if (j < DGrid.MaxLevel) {
            row.push({
              value: ""
            });
          }
          else {
            const index = j - DGrid.MaxLevel;
            const rc = DGrid.RelevantContexts[index];
            if (i === 0) {
              row.push({
                  value: rc.PeriodHeader.Unlabelled
              });
            }
            else {
              const dmIndex = i - 1;
              if (rc.Dimensions.length) {
                row.push({
                  value: rc.Dimensions[dmIndex].ExplicitMember.Label.Default.Unlabelled
                });
              }
              else {
                row.push({
                  value: ""
                })
              }
            }
          }
        }
      }
      else {
        for(let j = 0; j < maxCol; j++) {
          const index = i - DGrid.MaxDepth - 1;
          const pitem = DGrid.PrimaryItems[index];
          if (pitem && j === pitem.Level) {
            row.push({
              value: pitem.Label.Default.Unlabelled
            });
          }
          else {
            if (j < DGrid.MaxLevel) {
              row.push({
                value: ""
              });
            }
            else {
              const fact = DGrid.FactualQuadrant[index][j - DGrid.MaxLevel];
              row.push({
                value: fact.Unlabelled.Core+fact.Unlabelled.Tail
              });
            }
          }
        }
      }
      grid.push(row)
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