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
    nodeBackground: '#3498db',
    nodeText: 'white',
    linkColor: '#2c3e50',
    weightColor: '#34495e'
  };

  const nodeCanvasObject = (node, ctx, globalScale) => {
    const baseNodeRadius = 8;
    const nodeRadius = baseNodeRadius / globalScale;
    const fontSize = 10 / globalScale;

    ctx.beginPath();
    ctx.arc(node.x, node.y, nodeRadius, 0, 2 * Math.PI, false);
    ctx.fillStyle = colorPalette.nodeBackground;
    ctx.fill();
    ctx.strokeStyle = '#2980b9';
    ctx.lineWidth = 1 / globalScale;
    ctx.stroke();

    ctx.font = `${fontSize}px Inter, Arial, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = colorPalette.nodeText;
    ctx.fillText(node.name, node.x, node.y);
  };

  const drawLink = (link, ctx, globalScale) => {
    const start = link.source;
    const end = link.target;
    
    const dx = end.x - start.x;
    const dy = end.y - start.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance === 0) return;
    
    const curvature = 0.2;
    const midX = (start.x + end.x) / 2;
    const midY = (start.y + end.y) / 2;
    
    const perpX = -dy * curvature;
    const perpY = dx * curvature;
    
    const controlX = midX + perpX;
    const controlY = midY + perpY;
    
    const nodeRadius = 8;
    const t = 1 - ((nodeRadius / globalScale) + 2) / distance;
    
    const arrowX = Math.pow(1-t, 2) * start.x + 
                  2 * (1-t) * t * controlX + 
                  Math.pow(t, 2) * end.x;
    const arrowY = Math.pow(1-t, 2) * start.y + 
                  2 * (1-t) * t * controlY + 
                  Math.pow(t, 2) * end.y;
    
    // Reduced thickness parameters
    const baseWidth = 0.1;  // Reduced from 1
    const weightMultiplier = 0.1;  // Reduced from 0.5
    const lineWidth = baseWidth + (link.weight || 1) * weightMultiplier;
    
    // Draw the curved line
    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.quadraticCurveTo(controlX, controlY, end.x, end.y);
    ctx.strokeStyle = colorPalette.linkColor;
    ctx.lineWidth = lineWidth;
    ctx.stroke();
    
    const arrowAngle = Math.atan2(
      end.y - (2 * (1-t) * t * controlY + Math.pow(t, 2) * end.y),
      end.x - (2 * (1-t) * t * controlX + Math.pow(t, 2) * end.x)
    );
    
    const arrowLength = 2;
    ctx.beginPath();
    ctx.moveTo(arrowX, arrowY);
    ctx.lineTo(
      arrowX - arrowLength * Math.cos(arrowAngle - Math.PI / 6),
      arrowY - arrowLength * Math.sin(arrowAngle - Math.PI / 6)
    );
    ctx.lineTo(
      arrowX - arrowLength * Math.cos(arrowAngle + Math.PI / 6),
      arrowY - arrowLength * Math.sin(arrowAngle + Math.PI / 6)
    );
    ctx.closePath();
    ctx.fillStyle = colorPalette.linkColor;
    ctx.fill();
    
    // Draw weight label
    const labelT = 0.5;
    const labelX = Math.pow(1-labelT, 2) * start.x + 
                  2 * (1-labelT) * labelT * controlX + 
                  Math.pow(labelT, 2) * end.x;
    const labelY = Math.pow(1-labelT, 2) * start.y + 
                  2 * (1-labelT) * labelT * controlY + 
                  Math.pow(labelT, 2) * end.y;
    
    const labelOffset = 8;
    const fontSize = 10 / globalScale;
    
    ctx.font = `${fontSize}px Inter, Arial, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'bottom';
    ctx.fillStyle = colorPalette.weightColor;
    
    const weightLabel = Number(link.weight).toFixed(2);
    ctx.fillText(weightLabel, labelX, labelY - labelOffset);
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
            nodeCanvasObject={nodeCanvasObject}
            nodeLabel={(node) => `Node: ${node.name}`}
            linkDirectionalArrowLength={0}
            linkCurvature={0}
            linkCanvasObjectMode={() => "replace"}
            linkCanvasObject={drawLink}
            width={700}
            height={400}
            backgroundColor="#f4f6f7"
          />
        </div>
      )}
    </div>
  );
};

export default ComplexNetwork;