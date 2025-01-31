import React, { useState, useEffect } from "react";
import { fetchTimeSeriesById, callApiCreateProject, generateSyntheticVersionByProjectUUID, fetchTimeSeriesProjects } from "./api";
import TimeSeriesProject from "./components/TimeSeriesProject"
import ParameterList from "./ParameterList"
import ComplexNetwork from "./components/ComplexNetwork";
import TimeSeriesLineChart from "./TimeSeriesLineChart"

const App = () => {
  const [parameters, setParameters] = useState({});
  const [selectedUuid, setSelectedUuid] = useState(null);

  const [arParameters, setArParameters] = useState({
    phi: 0.9,
    sigma: 1.0,
    n: 2000,
  });

  /**
   * Handle the user change in the selection of project lists.
   */
  const handleProjectChange = (event) => {
    setSelectedUuid(event.target.value);
  };

  



  const generateSyntheticData = (selectedUuid) => {
    generateSyntheticVersionByProjectUUID(selectedUuid)
      .then((singleSyntheticSeriesData) => {
        setSelectedUuid(selectedUuid);
      })
      .catch((error) => {
        console.error("Error loading data:", error);
      });
  }
  
  const handleGenerateDataClick = () => {
    callApiCreateProject(arParameters.phi, arParameters.sigma, arParameters.n).then((timeSeriesProject) => {
      generateSyntheticData(timeSeriesProject.series_id);
    }).catch((error) => {
      console.error("Error loading data:", error);
    });
  };

  const handleCreateSyntheticDataClick = () => {
    setSelectedUuid("");
    generateSyntheticData(selectedUuid);
  };
  
  useEffect(() => {
    fetchTimeSeriesProjects().then((list) => {
      setSelectedUuid(list[0].uuid);
    })
    .catch((error) => {
      console.error("Error loading data:", error);
    });
  }, []);

  

  return (
    <>
      {/* Existing Time Series */}
      <div className="row mt-3">
        <TimeSeriesProject 
          handleProjectChange={handleProjectChange} 
          setArParameters={setArParameters} 
          arParameters={arParameters} 
          handleGenerateDataClick={handleGenerateDataClick} 
          initialSelectedUuid={selectedUuid}
        />
      </div>

      {/* Show parameters above the chart */}
      <div className="row mt-3">
        <ParameterList parameters={parameters} />
      </div>

      {/* Plotly Chart */}
      <div className="row mt-3">
        <TimeSeriesLineChart project_uuid={selectedUuid} class_name={"col-xl-6"} data_type={"baseline_timeseries"} />
        <ComplexNetwork project_uuid={selectedUuid} class_name={"col-xl-6"} data_type={"baseline_timeseries"} />
      </div>

      <div className="row mt-3">
        <div className="col-xl-2 d-flex">
          <div className="btn-group">
            <button onClick={handleCreateSyntheticDataClick} className="btn btn-sm btn-success">Synthesize!</button>
          </div>
        </div>
      </div>

      <div className="row mt-3">
        <TimeSeriesLineChart project_uuid={selectedUuid} class_name={"col-xl-6"} data_type={"synthetic_timeseries"} />
        <ComplexNetwork project_uuid={selectedUuid} class_name={"col-xl-6"} data_type={"synthetic_timeseries"} />
      </div>
    </>
  );
};

export default App;
