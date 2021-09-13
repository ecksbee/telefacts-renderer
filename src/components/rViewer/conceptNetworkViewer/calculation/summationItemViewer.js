import React from 'react';
import PropTypes from 'prop-types';
import ReactDataSheet from 'react-datasheet';
import 'react-datasheet/lib/react-datasheet.css';

class SummationItemViewer extends React.Component {

  getSummationItem(SummationItem) {
    if (!SummationItem) {
      return null
    }
    const { lang, labelRole } = this.props
    const grid = [];
    const maxRow = SummationItem.ContributingConcepts.length + SummationItem.ContextualMemberGrid.length + 2;
    const maxCol = SummationItem.PeriodHeaders.length + 2;
    for(let i = 0; i < maxRow; i++) {
      const row = [];
      if (i < SummationItem.ContextualMemberGrid.length + 1) {
        for(let j = 0; j < maxCol; j++) {
          if (j === 0) {
            row.push({
              value: ""
            });
          } else if (j === 1) {
            if (i == 0) {
              row.push({
                value: ""
              });
            } else {
              const voidCell = SummationItem.VoidQuadrant[i - 1]
              if (voidCell.TypedDomain) {
                if (voidCell.TypedDomain.Label[labelRole]) {
                  row.push({
                    value: voidCell.TypedDomain.Label[labelRole][lang]??voidCell.TypedDomain.Label.Default.Unlabelled
                  });
                } else {
                  row.push({
                    value: voidCell.TypedDomain.Label.Default.Unlabelled
                  });
                }
              } else {
                if (voidCell.Dimension.Label[labelRole]) {
                  row.push({
                    value: voidCell.Dimension.Label[labelRole][lang]??voidCell.Dimension.Label.Default.Unlabelled
                  });
                } else {
                  row.push({
                    value: voidCell.Dimension.Label.Default.Unlabelled
                  });
                }
              }
            }
          } else {
            const index = j - 2;
            const ph = SummationItem.PeriodHeaders[index];
            if (i === 0) {
              row.push({
                  value: ph[lang] ?? ph.Unlabelled
              });
            }
            else {
              const memberCell = SummationItem.ContextualMemberGrid[i - 1][j - 2]
              if (memberCell.TypedMember) {
                row.push({
                  value: memberCell.TypedMember
                });
              } else if (memberCell.ExplicitMember) {
                if (memberCell.ExplicitMember.Label[labelRole]) {
                  row.push({
                    value: memberCell.ExplicitMember.Label[labelRole][lang]??memberCell.Label.Default.Unlabelled
                  });
                } else {
                  row.push({
                    value: memberCell.ExplicitMember.Label.Default.Unlabelled
                  });
                }
              } else {
                row.push({
                  value: ''
                });
              }
            }
          }
        }
      }
      else {
        for(let j = 0; j < maxCol; j++) {
            const cRow = i - SummationItem.ContextualMemberGrid.length - 1;
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
                    if (SummationItem.Label[labelRole]) {
                      row.push({
                        value: SummationItem.Label[labelRole][lang]??SummationItem.Label.Default.Unlabelled
                      });
                    } else {
                      row.push({
                        value: SummationItem.Label.Default.Unlabelled
                      });
                    }
                } else {
                    if (citem.Label[labelRole]) {
                      row.push({
                        value: citem.Label[labelRole][lang]??citem.Label.Default.Unlabelled
                      });
                    } else {
                      row.push({
                        value: citem.Label.Default.Unlabelled
                      });
                    }
                }
            } else {
                const fRow = i - SummationItem.ContextualMemberGrid.length - 1;
                const fCol = j - 2;
                const fact = SummationItem.FactualQuadrant[fRow][fCol];
                if (fact.Unlabelled.Core) {
                  if (fact[lang]) {
                    row.push({
                      value: fact[lang].Head+fact[lang].Core+fact[lang].Tail
                    });
                  } else {
                    row.push({
                      value: fact.Unlabelled.Head+fact.Unlabelled.Core+fact.Unlabelled.Tail
                    });
                  }
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
    const grid = this.getSummationItem(this.props.summationItem)
    if (!grid) {
      return null;
    }
    return ( <ReactDataSheet data = {grid} valueRenderer = {cell => cell.value}/> );
  }
}

SummationItemViewer.propTypes = {
  summationItem: PropTypes.object,
  lang: PropTypes.string,
  labelRole: PropTypes.string
};

export default SummationItemViewer