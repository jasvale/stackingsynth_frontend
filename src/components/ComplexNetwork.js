import React, { useEffect, useState } from "react";
import { ForceGraph2D } from "react-force-graph";
import { fetchNetworkData, fetchSyntheticNetworkData } from "../api";

const ComplexNetwork = ({ project_uuid, class_name, data_type, forceReload, setForceReload }) => {
  const [networkData, setNetworkData] = useState({ nodes: [], links: [] });

  useEffect(() => {
    if (project_uuid === undefined) {
      return;
    }
    if (data_type == "baseline_timeseries") {
      fetchNetworkData(project_uuid)
        .then((data) => {
          setNetworkData(data);
          setForceReload(false);
        })
        .catch((error) => {
          console.error("Error loading network data:", error);
        });
    }
    else if (data_type == "synthetic_timeseries") {
      fetchSyntheticNetworkData(project_uuid)
        .then((data) => {
          setNetworkData(data);
          setForceReload(false);
        })
        .catch((error) => {
          console.error("Error loading network data:", error);
        });
    }

  }, [project_uuid, forceReload]);

  const colorPalette = {
    nodeBackground: '#3498db',  // Soft blue
    nodeText: 'white',
    linkColor: '#2c3e50',       // Dark blue-gray
    weightColor: '#34495e'      // Slightly lighter dark blue-gray
  };

  const nodeCanvasObject = (node, ctx, globalScale) => {
    const baseNodeRadius = 8;  // Reduced from 15
    const nodeRadius = baseNodeRadius / globalScale;  // Dynamic sizing
    const fontSize = 10 / globalScale;

    ctx.beginPath();
    ctx.arc(node.x, node.y, nodeRadius, 0, 2 * Math.PI, false);
    ctx.fillStyle = colorPalette.nodeBackground;
    ctx.fill();

    ctx.strokeStyle = '#2980b9';
    ctx.lineWidth = 1 / globalScale;  // Thin border that scales
    ctx.stroke();

    ctx.font = `${fontSize}px Inter, Arial, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = colorPalette.nodeText;
    ctx.fillText(node.name, node.x, node.y);
  };

  const linkCanvasObject = (link, ctx, globalScale) => {
    if (link.source === link.target) {
      const node = link.source;
      const radius = 20 / globalScale;
  
      ctx.beginPath();
      ctx.arc(node.x, node.y - radius, radius, 0, Math.PI * 2, false);
      ctx.strokeStyle = colorPalette.linkColor;
      ctx.lineWidth = Math.max(link.weight * 5 / globalScale, 0.5);
      ctx.globalAlpha = 0.7;
      ctx.stroke();
      ctx.globalAlpha = 1;
  
      const fontSize = Math.max(10 / Math.sqrt(globalScale), 3);
      ctx.font = `${fontSize}px Inter, Arial, sans-serif`;
      ctx.fillStyle = colorPalette.weightColor;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(link.weight.toFixed(2), node.x, node.y - radius * 1.5);
      
      return;
    }
  
    const dx = link.target.x - link.source.x;
    const dy = link.target.y - link.source.y;
  
    // Identify parallel links
    const linksBetweenNodes = networkData.links.filter(
      l =>
        (l.source === link.source && l.target === link.target) ||
        (l.source === link.target && l.target === link.source)
    );
    const linkIndex = linksBetweenNodes.indexOf(link);
    const totalLinks = linksBetweenNodes.length;
  
    // Offset calculation for curvature
    const curveOffset = (linkIndex - (totalLinks - 1) / 2) * 15; // Spread out the curves
    const curveFactor = Math.sign(curveOffset) * Math.abs(curveOffset) * 2 / globalScale;
  
    ctx.beginPath();
    ctx.moveTo(link.source.x, link.source.y);
  
    ctx.quadraticCurveTo(
      link.source.x + dx / 2 + curveFactor,
      link.source.y + dy / 2 - curveFactor,
      link.target.x,
      link.target.y
    );
  
    ctx.strokeStyle = colorPalette.linkColor;
    ctx.lineWidth = Math.max(link.weight * 5 / globalScale, 0.5);
    ctx.globalAlpha = 0.7;
    ctx.stroke();
    ctx.globalAlpha = 1;
  
    // Position weight text
    const fontSize = Math.max(10 / Math.sqrt(globalScale), 3);
    const weightX = link.source.x + dx / 2 + curveFactor;
    const weightY = link.source.y + dy / 2 - curveFactor;
  
    ctx.font = `${fontSize}px Inter, Arial, sans-serif`;
    ctx.fillStyle = colorPalette.weightColor;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(link.weight.toFixed(2), weightX, weightY);
  };
  

  return (
    <div className={class_name}>
      {forceReload ? (
        <p>Loading...</p>
      ) : (
        <div style={{ backgroundColor: "white" }}>
          <ForceGraph2D
            graphData={networkData}
            nodeRelSize={8}
            linkWidth={(link) => link.weight} 
            linkColor={() => colorPalette.linkColor}
            linkDirectionalArrowLength={5}  // Reduced from 10
            linkDirectionalArrowRelPos={1}  // Slightly closer to target node
            nodeLabel={(node) => `Node: ${node.name}`}
            nodeCanvasObject={nodeCanvasObject}
            linkCanvasObject={linkCanvasObject}
            width={700}
            height={400}
            backgroundColor="#f4f6f7"  // Light gray background
          />
        </div>
      )}
    </div>
  );
};

export default ComplexNetwork;
