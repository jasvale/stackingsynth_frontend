import React, { useEffect, useState } from "react";
import { ForceGraph2D } from "react-force-graph";
import { fetchNetworkData } from "../api";

const ComplexNetwork = ({ selectedUuid }) => {
  const [networkData, setNetworkData] = useState({ nodes: [], links: [] });

  useEffect(() => {

    if (!selectedUuid) {
      console.warn("UUID is null, skipping API call"); // ✅ Warn if UUID is missing
      return;
    }

    fetchNetworkData(selectedUuid)
      .then((data) => {
        setNetworkData(data);
      })
      .catch((error) => {
        console.error("Error loading network data:", error);
      });

  }, [selectedUuid]); // ✅ Runs effect whenever uuid changes

  return (
    <div style={{ backgroundColor: "white" }}>
      <ForceGraph2D
        graphData={networkData}
        linkWidth={(link) => link.weight}
        linkDirectionalArrowLength={6}
        linkDirectionalArrowRelPos={1}
        nodeLabel={(node) => `${node.name}`}
        width={636}
        height={500}
      />
    </div>
  );
};

export default ComplexNetwork;
