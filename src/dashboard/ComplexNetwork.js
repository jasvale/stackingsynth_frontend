import React, { useEffect, useState } from "react";
import { ForceGraph2D } from "react-force-graph";
import { fetchNetworkData } from "../api";

const ComplexNetwork = () => {
  const [networkData, setNetworkData] = useState({ nodes: [], links: [] });

  useEffect(() => {
    fetchNetworkData()
      .then((data) => {
        setNetworkData(data);
      })
      .catch((error) => {
        console.error("Error loading data:", error);
      });
  }, []);

  return (
    <div style={{ width: "100%", height: "600px" }}>
      <ForceGraph2D
        graphData={networkData}
        nodeAutoColorBy="id"
        linkDirectionalParticles={4}
        linkDirectionalParticleSpeed={(link) => link.weight * 0.001}
        nodeCanvasObject={(node, ctx, globalScale) => {
          const label = node.name;
          const fontSize = 12 / globalScale;
          ctx.font = `${fontSize}px Sans-Serif`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillStyle = node.color || "blue";
          ctx.fillText(label, node.x, node.y);
        }}
      />
    </div>
  );
};

export default ComplexNetwork;
