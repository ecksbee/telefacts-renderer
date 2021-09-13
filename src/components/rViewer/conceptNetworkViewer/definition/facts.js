import React from 'react';
import PropTypes from 'prop-types';
import ReactDataSheet from 'react-datasheet';
import 'react-datasheet/lib/react-datasheet.css';

class DGridFacts extends React.Component {

  getRootDomain(RootDomain) {
    if (!RootDomain) {
      return null
    }
    const { lang, labelRole } = this.props
    const grid = [];
    const maxRow = RootDomain.PrimaryItems.length + RootDomain.ContextualMemberGrid.length + 1;
    const maxCol = RootDomain.PeriodHeaders.length + 1;
    for(let i = 0; i < maxRow; i++) {
      const row = [];
      if (i < RootDomain.ContextualMemberGrid.length + 1) {
        for(let j = 0; j < maxCol; j++) {
          if (j === 0) {
            if (i === 0) {
              row.push({
                value: ""
              });
            } else {
              const voidCell = RootDomain.VoidQuadrant[i - 1]
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
            if (i === 0) {
              const ph = RootDomain.PeriodHeaders[j - 1]
              row.push({
                  value: ph[lang] ?? ph.Unlabelled
              });
            }
            else {
              const memberCell = RootDomain.ContextualMemberGrid[i - 1][j - 1]
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
      } else {
        const index = i - RootDomain.ContextualMemberGrid.length - 1;
        for (let j = 0; j < maxCol; j++) {
          if (j === 0) {
            const il = RootDomain.PrimaryItems[index];
            if (il.Label[labelRole]) {
              row.push({
                value: il.Label[labelRole][lang]??il.Label.Default.Unlabelled
              });
            } else {
              row.push({
                value: il.Label.Default.Unlabelled
              });
            }
          } else {
            const fact = RootDomain.FactualQuadrant[index][j - 1];
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
    const grid = this.getRootDomain(this.props.rootDomain)
    if (!grid) {
      return null;
    }
    return ( <ReactDataSheet data = {grid} valueRenderer = { cell => cell.value }/> );
  }
}

DGridFacts.propTypes = {
  rootDomain: PropTypes.object,
  lang: PropTypes.string,
  labelRole: PropTypes.string
};

export default DGridFacts