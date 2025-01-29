import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";
import { fetchAR1TimeSeriesData, fetchTimeSeriesById, fetchTimeSeriesList } from "../api";
import DataInput from "./DataInput";
import AutoregressiveParameters from "../parameters/AutoRegressiveParameters"
import TimeSeriesDropdown from "../dashboard/TimeSeriesDropdown"
import ParameterList from "../dashboard/ParameterList"

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [parameters, setParameters] = useState({});
  const [loading, setLoading] = useState(true);
  const [dataInputSelection, setDataInputSelection] = useState("AR");
  const [showParameters, setShowParameters] = useState(false);

  const [arParameters, setArParameters] = useState({
    phi: 0.9,
    sigma: 1.0,
    n: 2000,
  });

  const handleParametersClick = () => {
    setShowParameters(!showParameters);
  }

  const handleDataInputChange = (event) => {
    const selectedValue = event.target.value;
    setDataInputSelection(selectedValue);
  };

  const loadData = async () => {
    try {
      //const timeSeriesData = await fetchTimeSeriesData(); // Fetch data
      const ar1TimeSeriesData = await fetchAR1TimeSeriesData(arParameters.phi, arParameters.sigma, arParameters.n);
      setData(ar1TimeSeriesData.time_series.series.map((series) => ({
        x: series.x,
        y: series.y,
        type: "scatter",
        mode: "lines",
        name: series.name,
        line: { color: series.color },
      }))); // Update state
      setLoading(false);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  const handleSynthesizeClick = () => {
    if (dataInputSelection.trim() == "") {
      alert("Please select Data Input method.");
      return;
    }
    loadData();
  };

  useEffect(() => {
    fetchTimeSeriesList().then((data) => {
      fetchTimeSeriesById(data[0].uuid)
      .then((data) => {
        setData(data.series.map((series) => ({
          x: series.x,
          y: series.y,
          type: "scatter",
          mode: "lines",
          name: series.name,
          line: { color: series.color },
        }))); // Update state

        const firstSeries = data.series[0]; // Assuming first series has parameters
        // Set parameters from the selected series
        if (firstSeries.parameters) {
          setParameters(firstSeries.parameters);
        } else {
          setParameters({});
        }

        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading data:", error);
      }); 
    })
    .catch((error) => {
      console.error("Error loading data:", error);
    });
  }, []); // Run once on mount

  // Chart layout
  const layout = {
    title: "Time Series Line Chart",
    xaxis: { title: "Date", showgrid: true },
    yaxis: { title: "Values", showgrid: true },
    legend: { orientation: "h", x: 0.5, xanchor: "center", y: -0.2 },
    showlegend: true, // Ensure legend is displayed even for one series
  };

  const hrStyle = {
    display: "block",
    height: "1px",
    border: "0",
    borderTop: "1px solid #ccc",
    margin: "1em 0",
    padding: "0",
  };

  const handleTimeSeriesSelect = (uuid) => {
    fetchTimeSeriesById(uuid)
      .then((data) => {
        setData(data.series.map((series) => ({
          x: series.x,
          y: series.y,
          type: "scatter",
          mode: "lines",
          name: series.name,
          line: { color: series.color },
        }))); // Update state

        const firstSeries = data.series[0]; // Assuming first series has parameters
        // Set parameters from the selected series
        if (firstSeries.parameters) {
          setParameters(firstSeries.parameters);
        } else {
          setParameters({});
        } 

        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading data:", error);
      });
  };

  return (
    <>
      {/* Existing Time Series */}
      <TimeSeriesDropdown onSelect={handleTimeSeriesSelect} />

      <div className="row mt-3">
        <h4 className="form-label text-light">Generation Options</h4>
        <DataInput showParameters={showParameters} handleDataInputChange={handleDataInputChange} handleParametersClick={handleParametersClick} handleSynthesizeClick={handleSynthesizeClick} />

        {/* Generation Method */}
        <div className="col-xl-3">
          <label className="form-label text-light">Data Output</label>
          <select className="form-select form-select-sm" aria-label="Generation Method">
            <option selected></option>
            <option value="InvQG">InvQG</option>
          </select>
        </div>
      </div>

      {/* Pass arParameters and setArParameters to AutoregressiveParameters */}
      {showParameters && (
        <>
          <hr style={hrStyle} />
          <AutoregressiveParameters
            arParameters={arParameters}
            setArParameters={setArParameters}
            handleSynthesizeClick={handleSynthesizeClick}
          />
          <hr style={hrStyle} />
        </>
      )}

      {/* Plotly Chart */}
      <div className="row mt-3">        
        {/* Show parameters above the chart */}
        <ParameterList parameters={parameters} />
        <div className="col-xl-12">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <Plot data={data} layout={layout} style={{ width: "100%", height: "100%" }} />
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
