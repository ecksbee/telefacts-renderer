import React from 'react';
import PropTypes from 'prop-types';
import ReactDataSheet from 'react-datasheet';
import 'react-datasheet/lib/react-datasheet.css';

class DGridDomains extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        effectiveDimension: this.props.rootDomain.EffectiveDimensions[0]
    };
  }

  componentDidUpdate(prevProps) {
    if (!this.props.rootDomain) {
        return
    }
    if (prevProps && prevProps.rootDomain && this.props.rootDomain && (prevProps.rootDomain===this.props.rootDomain)) {
        return
    }

    this.setState({
        effectiveDimension: this.props.rootDomain.EffectiveDimensions[0]
    });
  }

  getGrid(effectiveDimension) {
    if (!effectiveDimension || !this.props.rootDomain) {
        return null
    }
    const RootDomain = this.props.rootDomain
    const grid = [];
    const maxRow = RootDomain.PrimaryItems.length + 1;
    let maxCol = 1;
    const index = RootDomain.EffectiveDimensions.findIndex(dimension => dimension.Href === effectiveDimension.Href)
    RootDomain.EffectiveDomainGrid.forEach(
        primaryItemData => {
            if ((primaryItemData?.length??0) < index) {
                return
            }
            const effectiveDomain = primaryItemData[index]

            if ((effectiveDomain.length + 1) > maxCol) {
                maxCol = effectiveDomain.length + 1
            }
        }
        
    )
    for(let i = 0; i < maxRow; i++) {
      const row = [];
      const primaryItemData = RootDomain.EffectiveDomainGrid[i]
      for(let j = 0; j < maxCol; j++) {
          if (j === 0) {
            if (i === 0) {
                row.push({
                    value: `${RootDomain.Label.Default.Unlabelled}`
                });
            } else {
                console.log(RootDomain.PrimaryItems.length)
                const pi = RootDomain.PrimaryItems[i - 1]
                row.push({
                    value: `${pi.Label.Default.Unlabelled}`
                });
            }
            continue
          }
          const effectiveDomain = primaryItemData[index]
          if (j < effectiveDomain?.length??0) {
            const domain = effectiveDomain[j]
            let mod = ''
            if (domain.IsDefault) {
                if (domain.IsStrikethrough) {
                    mod = 'default,negative:'
                } else {
                    mod = 'default:'
                }
            } else {
                if (domain.IsStrikethrough) {
                    mod = 'negative:'
                }
            }
            row.push({
                value: `${mod}${domain.Label.Default.Unlabelled}`
            });
          } else {
            row.push({
                value: ''
            });
          }
      }
      grid.push(row)
    }
    return grid
  }

  render() {
    if (!this.state.effectiveDimension) {
      return null;
    }
    const select = <select>
        {
            this.props.rootDomain.EffectiveDimensions.map(
                dim => <option key={dim.Href} selected={dim.Href===this.state.effectiveDimension.Href} onSelect={()=>this.setState({effectiveDimension: dim})}>{dim.Label.Default.Unlabelled}</option>
            )
        }
    </select>
    const grid=this.getGrid(this.state.effectiveDimension)
    return ( 
        <div>
            {select}
            <ReactDataSheet data = {grid} valueRenderer = {cell => cell.value} />
        </div>
    );
  }
}

DGridDomains.propTypes = {
  rootDomain: PropTypes.object
};

export default DGridDomains