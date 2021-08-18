import React from 'react';
import * as d3 from 'd3';
import './arcDiagram.css'
 
const ArcDiagram = ({ data }) => {
    const svgRef = React.useRef(null);
    React.useEffect(() => {
        if (!data.nodes.length || !data.links.length) {
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
            dMagic = data.nodes.length * charWidth,
            xMagic = Math.sin(Math.PI/4)*magic,
            yMagic = Math.cos(Math.PI/4)*magic,
            width = dMagic + 2*xMagic,
            height = yMagic + dMagic*0.5;

        const svg = d3.select(svgRef.current)
            .append("svg")
            .attr("viewBox",[0,0,width,height])
            .attr("width", width)
            .attr("height", height)
            .append("g");
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
            .range([0, 2*dMagic])
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
                let start = x(idToNode[d.source].name) + xMagic    // X position of start node on the X axis
                let end = x(idToNode[d.target].name) + xMagic      // X position of end node
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
            .attr("cx", d=>x(d.name) + xMagic)
            .attr("cy", height-30)
            .attr("r", d=>size(d.n))
            .style("fill", d=> color(d.grp))
            .attr("stroke", "white")
    
        svg.selectAll("mylabels")
            .data(data.nodes)
            .join("text")
            .attr("x", 0)
            .attr("y", 0)
            .text(d=>d.name)
            .style("text-anchor", "end")
            .attr("transform",d=>`translate(${x(d.name) + xMagic},${height/2-15}) rotate(-45)`)
            .style("font-size", 18)
            .style("font-family", "Calibri")
    
    }, [data]);
 
  return <div id='arc-diagram' ref={svgRef} />;
};

export default ArcDiagram;