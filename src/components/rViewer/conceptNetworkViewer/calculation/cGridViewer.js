import React from 'react';
import PropTypes from 'prop-types';
import SummationItemViewer from './summationItemViewer';

function CGridViewer({renderablesData, renderablesHash}) {
    const [currHash, setHash] = React.useState('');
    const [summationItem, setSummationItem] = React.useState(renderablesData?.CGrid.SummationItems[0]);
    const sidePanel = <div id="cgrid-side-panel">
        {
          renderablesData?.CGrid.SummationItems.map(
            item => {
                const className = summationItem.Href === item.Href ? "tab-selected" : ''
                return <button key={item.Href} className={className} onClick={_=>{
                    setSummationItem(item)
                }}>{item.Label.Default.Unlabelled}</button>
            }
          )
        }
    </div>
    React.useEffect(() => {
      if (renderablesHash !== currHash) {
        setSummationItem(renderablesData?.CGrid.SummationItems[0])
        setHash(renderablesHash)
      }
    }, [currHash, renderablesData?.CGrid.SummationItems, renderablesHash])
    return (
      <div>
        {sidePanel}
        <div id='cgrid-main-panel'><SummationItemViewer summationItem={summationItem} /></div>
      </div>
    );
}

CGridViewer.propTypes = {
  renderablesData: PropTypes.object,
  renderablesHash: PropTypes.string
};

export default CGridViewer;