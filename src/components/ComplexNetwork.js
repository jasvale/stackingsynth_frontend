import React, { useEffect, useState } from "react";
import { ForceGraph2D } from "react-force-graph";
import { fetchNetworkData } from "../api";

const ComplexNetwork = ({ project_uuid, class_name }) => {
  const [networkData, setNetworkData] = useState({ nodes: [], links: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchNetworkData(project_uuid)
      .then((data) => {
        setNetworkData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading network data:", error);
      });
  }, [project_uuid]);

  return (
    <div className={class_name}>
      {loading ? (
        <p>Loading...</p>
      ) : (
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
      )}
    </div>
  );
};

export default ComplexNetwork;
