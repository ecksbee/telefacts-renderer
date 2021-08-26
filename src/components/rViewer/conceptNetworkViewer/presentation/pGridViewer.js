import React from 'react';
import PropTypes from 'prop-types';
import ReactDataSheet from 'react-datasheet';
import 'react-datasheet/lib/react-datasheet.css';
import './pGridViewer.css'

class PGridViewer extends React.Component {

  getPGrid(PGrid) {
    if (!PGrid) {
      return null
    }
    const {lang, labelRole} = this.props
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
          const index = i - PGrid.MaxDepth - 1;
          const il = PGrid.IndentedLabels[index];
          if (il && j === il.Indentation) {
            if (il.Label[labelRole]) {
              row.push({
                value: il.Label[labelRole][lang]??il.Label.Default.Unlabelled
              });
            } else {
              row.push({
                value: il.Label.Default.Unlabelled
              });
            }
          }
          else {
            if (j < PGrid.MaxIndentation) {
              row.push({
                value: ""
              });
            }
            else {
              const fact = PGrid.FactualQuadrant[index][j - PGrid.MaxIndentation];
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
      }
      grid.push(row)
    }
    return grid
  }

  render() {
    const grid = this.getPGrid(this.props.renderablesData?.PGrid)
    if (!grid) {
      return null;
    }
    return (
      <div id='pgrid-main-panel'>
        <ReactDataSheet data={grid} valueRenderer={cell => cell.value} />
      </div> 
    );
  }
}

PGridViewer.propTypes = {
  renderablesData: PropTypes.object,
  lang: PropTypes.string,
  labelRole: PropTypes.string
};

export default PGridViewer