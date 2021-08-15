import React from 'react';
import PropTypes from 'prop-types';
import ReactDataSheet from 'react-datasheet';
import 'react-datasheet/lib/react-datasheet.css';

class PGridViewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: this.getPGrid(this.props.renderablesData?.PGrid)
    };
  }

  componentDidUpdate(prevProps) {
    if (!this.props.renderablesData) {
      return
    }
    if (prevProps && prevProps.renderablesData && this.props.renderablesData && (prevProps.renderablesData===this.props.renderablesData)) {
      return
    }

    const PGrid = this.getPGrid(this.props.renderablesData.PGrid)
    this.setState({
      grid: PGrid
    });
  }

  getPGrid(PGrid) {
    if (!PGrid) {
      return null
    }
    const grid = [];
    const maxRow = PGrid.IndentedLabels.length + PGrid.MaxDepth + 1;
    const maxCol = PGrid.RelevantContexts.length + PGrid.MaxIndentation;
    for(let i = 0; i < maxRow; i++) {
      const row = [];
      if (i < PGrid.MaxDepth + 1) {
        for(let j = 0; j < maxCol; j++) {
          if (j < PGrid.MaxIndentation) {
            row.push({
              value: ""
            });
          }
          else {
            const index = j - PGrid.MaxIndentation;
            const rc = PGrid.RelevantContexts[index];
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
          const index = i - PGrid.MaxDepth - 1;
          const il = PGrid.IndentedLabels[index];
          if (il && j === il.Indentation) {
            row.push({
              value: il.Label.Default.Unlabelled
            });
          }
          else {
            if (j < PGrid.MaxIndentation) {
              row.push({
                value: ""
              });
            }
            else {
              const fact = PGrid.FactualQuadrant[index][j - PGrid.MaxIndentation];
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

  oldgetPGrid(PGrid) {
    if (!PGrid) {
      return null
    }
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
            cellValue = PGrid.RelevantContexts[j-PGrid.MaxIndentation].Dimensions[0].ExplicitMember.Label.Default.Unlabelled;
          }
        } else if (i > PGrid.MaxDepth) {
          if (j < PGrid.MaxIndentation) {
            if (PGrid.IndentedLabels[i-PGrid.MaxDepth-1].Indentation === j) {
              cellValue = PGrid.IndentedLabels[i-PGrid.MaxDepth-1].Label.Default.Unlabelled;
            }
          } else {
            let thisFact = PGrid.FactualQuadrant[i-PGrid.MaxDepth-1][j-PGrid.MaxIndentation].Unlabelled;
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

PGridViewer.propTypes = {
  renderablesData: PropTypes.object
};

export default PGridViewer