import React from 'react';
import PropTypes from 'prop-types';
import ReactDataSheet from 'react-datasheet';
import 'react-datasheet/lib/react-datasheet.css';

class DGridFacts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: this.getRootDomain(this.props.rootDomain)
    };
  }

  componentDidUpdate(prevProps) {
    if (!this.props.rootDomain) {
      return
    }
    if (prevProps && prevProps.rootDomain && this.props.rootDomain && (prevProps.rootDomain===this.props.rootDomain)) {
      return
    }

    const RootDomain = this.getRootDomain(this.props.rootDomain)
    this.setState({
      grid: RootDomain
    });
  }

  getRootDomain(RootDomain) {
    if (!RootDomain) {
      return null
    }
    const grid = [];
    const maxRow = RootDomain.PrimaryItems.length + RootDomain.MaxDepth + 2;
    const maxCol = RootDomain.RelevantContexts.length + RootDomain.MaxLevel + 1;
    for(let i = 0; i < maxRow; i++) {
      const row = [];
      if (i < RootDomain.MaxDepth + 1) {
        for(let j = 0; j < maxCol; j++) {
          if (j < RootDomain.MaxLevel + 1) {
            row.push({
              value: ""
            });
          }
          else {
            const index = j - RootDomain.MaxLevel;
            const rc = RootDomain.RelevantContexts[index - 1];
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
            if (i === RootDomain.MaxDepth + 1) {
              row.push({
                value: RootDomain.Label.Default.Unlabelled
              });
            } else {
              row.push({
                value: ""
              });
            }
          }
          else {            
            if (i === RootDomain.MaxDepth + 1) {
              if (j < RootDomain.MaxLevel + 1) {
                row.push({
                  value: ""
                });
              }
              else {
                const fRow = i - RootDomain.MaxDepth - 1;
                const fCol = j - RootDomain.MaxLevel - 1;
                const fact = RootDomain.FactualQuadrant[fRow][fCol];
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
              if (j < RootDomain.MaxLevel + 1) {
                const pRow = i - RootDomain.MaxDepth - 2;
                const pitem = RootDomain.PrimaryItems[pRow];
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
                const fRow = i - RootDomain.MaxDepth - 1;
                const fCol = j - RootDomain.MaxLevel - 1;
                const fact = RootDomain.FactualQuadrant[fRow][fCol];
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
  rootDomain: PropTypes.object
};

export default DGridFacts