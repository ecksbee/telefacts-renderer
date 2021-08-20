import React from 'react';
import PropTypes from 'prop-types';
import ReactDataSheet from 'react-datasheet';
import 'react-datasheet/lib/react-datasheet.css';

class SummationItemViewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: this.getSummationItem(this.props.summationItem)
    };
  }

  componentDidUpdate(prevProps) {
    if (!this.props.summationItem) {
      return
    }
    if (prevProps && prevProps.summationItem && this.props.summationItem && (prevProps.summationItem===this.props.summationItem)) {
      return
    }

    const SummationItem = this.getSummationItem(this.props.summationItem)
    this.setState({
      grid: SummationItem
    });
  }

  getSummationItem(SummationItem) {
    if (!SummationItem) {
      return null
    }
    const grid = [];
    const maxRow = SummationItem.ContributingConcepts.length + SummationItem.MaxDepth + 2;
    const maxCol = SummationItem.RelevantContexts.length + 2;
    for(let i = 0; i < maxRow; i++) {
      const row = [];
      if (i < SummationItem.MaxDepth + 1) {
        for(let j = 0; j < maxCol; j++) {
          if (j === 0) {
            row.push({
              value: ""
            });
          } else if (j === 1) {
            row.push({
              value: ""
            });
          } else {
            const index = j - 2;
            const rc = SummationItem.RelevantContexts[index];
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
            const cRow = i - SummationItem.MaxDepth - 1;
            const citem = cRow === SummationItem.ContributingConcepts.length? 
                SummationItem :
                SummationItem.ContributingConcepts[cRow];
            if (j === 0) {
                if (cRow === SummationItem.ContributingConcepts.length) {
                    row.push({
                        value: '='
                    });
                } else {
                    row.push({
                        value: citem.Sign + ' ' + citem.Scale
                    });
                }
            } else if (j === 1) {
                if (cRow === SummationItem.ContributingConcepts.length) {
                    row.push({
                        value: SummationItem.Label.Default.Unlabelled
                    });
                } else {
                    row.push({
                        value: citem.Label.Default.Unlabelled
                    });
                }
            } else {
                const fRow = i - SummationItem.MaxDepth - 1;
                const fCol = j - 2;
                const fact = SummationItem.FactualQuadrant[fRow][fCol];
                if (fact.Unlabelled.Core) {
                  row.push({
                    value: fact.Unlabelled.Head+fact.Unlabelled.Core+fact.Unlabelled.Tail
                  });
                } else {
                  row.push({
                    value: fact.Unlabelled.CharData
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
    return ( <ReactDataSheet data = {this.state.grid} valueRenderer = {cell => cell.value}/> );
  }
}

SummationItemViewer.propTypes = {
  summationItem: PropTypes.object
};

export default SummationItemViewer