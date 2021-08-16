import React from 'react';
import PropTypes from 'prop-types';
import ReactDataSheet from 'react-datasheet';
import 'react-datasheet/lib/react-datasheet.css';

class DGridFacts extends React.Component {
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
    const maxRow = DGrid.PrimaryItems.length + DGrid.MaxDepth + 2;
    const maxCol = DGrid.RelevantContexts.length + DGrid.MaxLevel + 1;
    for(let i = 0; i < maxRow; i++) {
      const row = [];
      if (i < DGrid.MaxDepth + 1) {
        for(let j = 0; j < maxCol; j++) {
          if (j < DGrid.MaxLevel + 1) {
            row.push({
              value: ""
            });
          }
          else {
            const index = j - DGrid.MaxLevel;
            const rc = DGrid.RelevantContexts[index - 1];
            if (i === 0) {
              row.push({
                  value: rc.PeriodHeader.Unlabelled
              });
            }
            else {
              const dmIndex = i - 1;
              if (rc.Dimensions.length && rc.Dimensions[dmIndex]) {
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
          if (j === 0) {
            if (i === DGrid.MaxDepth + 1) {
              row.push({
                value: DGrid.Label.Default.Unlabelled
              });
            } else {
              row.push({
                value: ""
              });
            }
          }
          else {            
            if (i === DGrid.MaxDepth + 1) {
              if (j < DGrid.MaxLevel + 1) {
                row.push({
                  value: ""
                });
              }
              else {
                const fRow = i - DGrid.MaxDepth - 1;
                const fCol = j - DGrid.MaxLevel - 1;
                const fact = DGrid.FactualQuadrant[fRow][fCol];
                if (fact.Unlabelled.TextBlock && fact.Unlabelled.TextPreview) {
                  row.push({
                    value: fact.Unlabelled.TextPreview
                  });
                } else {
                  row.push({
                    value: fact.Unlabelled.Head+fact.Unlabelled.Core+fact.Unlabelled.Tail
                  });
                }
              }
            } else {
              if (j < DGrid.MaxLevel + 1) {
                const pRow = i - DGrid.MaxDepth - 2;
                const pitem = DGrid.PrimaryItems[pRow];
                if (pitem.Level === j - 1) {
                  row.push({
                    value: pitem.Label.Default.Unlabelled
                  });
                } else {
                  row.push({
                    value: ""
                  });
                }
              } else {
                const fRow = i - DGrid.MaxDepth - 1;
                const fCol = j - DGrid.MaxLevel - 1;
                const fact = DGrid.FactualQuadrant[fRow][fCol];
                if (fact.Unlabelled.TextBlock && fact.Unlabelled.TextPreview) {
                  row.push({
                    value: fact.Unlabelled.TextPreview
                  });
                } else {
                  row.push({
                    value: fact.Unlabelled.Head+fact.Unlabelled.Core+fact.Unlabelled.Tail
                  });
                }
              }
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

DGridFacts.propTypes = {
  renderablesData: PropTypes.object
};

export default DGridFacts