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
                value: rc.PeriodHeader[lang] ?? rc.PeriodHeader.Unlabelled
              });
            }
            else {
              const dmIndex = i - 1;
              if (rc.Dimensions.length && rc.Dimensions[dmIndex]) {
                const em = rc.Dimensions[dmIndex].ExplicitMember
                if (em.Label[labelRole]) {
                  row.push({
                    value: em.Label[labelRole][lang]??em.Label.Default.Unlabelled
                  });
                } else {
                  row.push({
                    value: em.Label.Default.Unlabelled
                  });
                }
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
              if (RootDomain.Label[labelRole]) {
                  row.push({
                    value: RootDomain.Label[labelRole][lang]??RootDomain.Label.Default.Unlabelled
                  });
              } else {
                  row.push({
                      value: RootDomain.Label.Default.Unlabelled
                  });
              }
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