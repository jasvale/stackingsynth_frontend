import React, { useState, useEffect } from "react";
import { fetchTimeSeriesById, callApiCreateProject, generateSyntheticVersionByProjectUUID } from "./api";
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

  const generateSyntheticData = (selectedUuid) => {
    generateSyntheticVersionByProjectUUID(selectedUuid)
      .then((singleSyntheticSeriesData) => {
        setSelectedUuid(selectedUuid);
      })
      .catch((error) => {
        console.error("Error loading data:", error);
      });
  }

  const handleSynthesizeClick = () => {
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
    console.log("Updated selectedUuid:", selectedUuid);
  }, [selectedUuid]);

  const handleTimeSeriesSelect = (uuid) => {
    fetchTimeSeriesById(uuid)
      .then((data) => {

        const firstSeries = data.series[0]; // Assuming first series has parameters
        // Set parameters from the selected series
        if (firstSeries.parameters) {
          setParameters(firstSeries.parameters);
        } else {
          setParameters({});
        }

        setSelectedUuid(uuid);
      })
      .catch((error) => {
        console.error("Error loading data:", error);
      });
  };

  return (
    <>
      {/* Existing Time Series */}
      <div className="row mt-3">
        <TimeSeriesProject onSelect={handleTimeSeriesSelect} setArParameters={setArParameters} arParameters={arParameters} handleSynthesizeClick={handleSynthesizeClick} />
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
