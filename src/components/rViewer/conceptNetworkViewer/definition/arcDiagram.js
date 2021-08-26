import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import './arcDiagram.css'
 
const ArcDiagram = ({ data, renderablesHash, lang, labelRole }) => {
    const svgRef = React.useRef(null);
    const [currHash, setHash] = React.useState('');
    const [currLang, setLang] = React.useState(lang);
    const [currLabelRole, setLabelRole] = React.useState(labelRole);
    React.useEffect(() => {
        if (!data.nodes.length || !data.links.length) {
            return
        }
        d3.select(svgRef.current).selectChildren().remove()
        if (renderablesHash !== currHash) {
            setHash(renderablesHash)
            return
        }
        if (lang !== currLang) {
            setLang(lang)
            return
        }
        if (labelRole !== currLabelRole) {
            setLabelRole(labelRole)
            return
        }
        const charWidth = 14;
        let maxChar = 0
        data.nodes.forEach(
            node => {
                if (node.name.length > maxChar) {
                    maxChar = node.name.length
                }
            }
        )
        const magic = maxChar * charWidth,
            dMagic = data.nodes.length * 2 * charWidth,
            xMagic = Math.sin(Math.PI/4)*magic,
            yMagic = Math.cos(Math.PI/4)*magic,
            width = dMagic + 2*xMagic,
            height = yMagic + dMagic*0.5;

        const svg = d3.select(svgRef.current)
            .append("svg")
            .attr("viewBox",[0,0,width,height])
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("id", "theG");
        const allNodes = data.nodes.map(d => d.name)
        let allGroups = data.nodes.map(d => d.grp)
        allGroups = [...new Set(allGroups)]
    
        const color = d3.scaleOrdinal()
            .domain(allGroups)
            .range(d3.schemeSet3);
    
        const size = d3.scaleLinear()
            .domain([1,10])
            .range([0.5,8]);
    
        const x = d3.scalePoint()
            .range([xMagic, xMagic + dMagic])
            .domain(allNodes)
    
        const idToNode = {};
        data.nodes.forEach(function (n) {
            idToNode[n.id] = n;
        });
    
        // Add the links
        svg.selectAll('mylinks')
            .data(data.links)
            .join('path')
            .attr('d', d => {
                let start = x(idToNode[d.source].name)    // X position of start node on the X axis
                let end = x(idToNode[d.target].name)      // X position of end node
                return ['M', start, height/2-18,    // the arc starts at the coordinate x=start, y=height-30 (where the starting node is)
                'A',                            // This means we're gonna build an elliptical arc
                (start - end)/2, ',',    // Next 2 lines are the coordinates of the inflexion point. Height of this point is proportional with start - end distance
                (start - end)/2, 0, 0, ',',
                start < end ? 1 : 0, end, ',', height/2-18] // We always want the arc on top. So if end is before start, putting 0 here turn the arc upside down.
                .join(' ');
            })
            .style("fill", "none")
            .attr("stroke", "grey")
            .style("stroke-width", 1)
    
        svg.selectAll("mynodes")
            .data(data.nodes.sort((a,b) =>{
                if (a.name < b.name) {
                    return -1;
                }
                if (a.name > b.name) {
                    return 1;
                }
                return 0;
            } ))
            .join("circle")
            .attr("cx", d=>x(d.name))
            .attr("cy", height/2-18)
            .attr("r", d=>size(d.n))
            .style("fill", d=> color(d.grp))
            .attr("stroke", "blue")
    
        svg.selectAll("mylabels")
            .data(data.nodes)
            .join("text")
            .attr("x", 0)
            .attr("y", 0)
            .text(d=>d.name)
            .style("text-anchor", "end")
            .attr("transform",d=>`translate(${x(d.name)},${height/2-15}) rotate(-45)`)
            .style("font-size", 18)
            .style("font-family", "Calibri")
    
    }, [currHash, data, renderablesHash, lang, labelRole, currLang, currLabelRole]);
 
  return <div id='arc-diagram' ref={svgRef} />;
};

ArcDiagram.propTypes = {
    data: PropTypes.object,
    renderablesHash: PropTypes.string,
    lang: PropTypes.string,
    labelRole: PropTypes.string
};

export default ArcDiagram;