import React, { useEffect, useState } from "react";
import { ForceGraph2D } from "react-force-graph";
import { fetchNetworkData, fetchSyntheticNetworkData } from "../api";

const ComplexNetwork = ({ project_uuid, class_name, data_type, showLoading, setShowLoading }) => {
  const [networkData, setNetworkData] = useState({ nodes: [], links: [] });

  useEffect(() => {
    if(data_type == "baseline_timeseries") {
      fetchNetworkData(project_uuid)
      .then((data) => {
        setNetworkData(data);
        setShowLoading(false);
      })
      .catch((error) => {
        console.error("Error loading network data:", error);
      });
    }
    else if(data_type == "synthetic_timeseries") {
      fetchSyntheticNetworkData(project_uuid)
      .then((data) => {
        setNetworkData(data);
        setShowLoading(false);
      })
      .catch((error) => {
        console.error("Error loading network data:", error);
      });
    }
    
  }, [showLoading]);

  return (
    <div className={class_name}>
      {showLoading ? (
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
            height={400}
          />
        </div>        
      )}
    </div>
  );
};

export default ComplexNetwork;
