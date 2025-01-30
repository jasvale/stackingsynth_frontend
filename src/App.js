import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";
import { fetchTimeSeriesById, fetchTimeSeriesProjects, fetchSyntheticTimeSeriesById, fetchAR1TimeSeriesData } from "./api";
import TimeSeriesProject from "./components/TimeSeriesProject"
import ParameterList from "./ParameterList"
import ComplexNetwork from "./components/ComplexNetwork";
import TimeSeriesLineChart from "./TimeSeriesLineChart"

const App = () => {
  const [syntheticData, setSyntheticData] = useState([]);
  const [parameters, setParameters] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedUuid, setSelectedUuid] = useState(null);

  const [arParameters, setArParameters] = useState({
      phi: 0.9,
      sigma: 1.0,
      n: 2000,
  });

  const handleSynthesizeClick = () => {
    fetchAR1TimeSeriesData(arParameters.phi, arParameters.sigma, arParameters.n).then((timeSeriesProject) => {
      setSelectedUuid(timeSeriesProject.series_id);
    }).catch((error) => {
      console.error("Error loading data:", error);
    });
  };

  useEffect(() => {
    fetchTimeSeriesProjects().then((data) => {

      fetchTimeSeriesById(data[0].uuid)
        .then((singleSeriesData) => {

          const firstSeries = singleSeriesData.series[0]; // Assuming first series has parameters
          // Set parameters from the selected series
          if (firstSeries.parameters) {
            setParameters(firstSeries.parameters);
          } else {
            setParameters({});
          }
          setSelectedUuid(data[0].uuid);

          fetchSyntheticTimeSeriesById(data[0].uuid)
            .then((singleSyntheticSeriesData) => {

              setSyntheticData(singleSyntheticSeriesData.series.map((series) => ({
                x: series.x,
                y: series.y,
                type: "scatter",
                mode: "lines",
                name: series.name,
                line: { color: series.color },
              })));

              setLoading(false);
            })
            .catch((error) => {
              console.error("Error loading data:", error);
            });
        })
        .catch((error) => {
          console.error("Error loading data:", error);
        });
    })
      .catch((error) => {
        console.error("Error loading data:", error);
      });
  }, []); // Run once on mount

  useEffect(() => {
    console.log("Updated selectedUuid:", selectedUuid);
  }, [selectedUuid]);

  // Chart layout
  const layout = {
    title: "Time Series Line Chart",
    xaxis: { title: "Date", showgrid: true },
    yaxis: { title: "Values", showgrid: true },
    legend: { orientation: "h", x: 0.5, xanchor: "center", y: -0.2 },
    showlegend: true, // Ensure legend is displayed even for one series
  };

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

        fetchSyntheticTimeSeriesById(uuid)
          .then((singleSyntheticSeriesData) => {
            setSyntheticData(singleSyntheticSeriesData.series.map((series) => ({
              x: series.x,
              y: series.y,
              type: "scatter",
              mode: "lines",
              name: series.name,
              line: { color: series.color },
            })));
            setLoading(false);
          })
          .catch((error) => {
            console.error("Error loading data:", error);
          });
      })
      .catch((error) => {
        console.error("Error loading data:", error);
      });
  };

  /*
    <div className="row mt-3">
        <div className="col-xl-3">
          <label className="form-label text-light">Transformation</label>
          <select className="form-select form-select-sm" aria-label="Generation Method">
            <option selected></option>
            <option value="InvQG">InvQG</option>
          </select>
        </div>
      </div>
  */

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
        <TimeSeriesLineChart project_uuid={selectedUuid} class_name={"col-xl-6"} />
        <ComplexNetwork project_uuid={selectedUuid} class_name={"col-xl-6"} />
      </div>

      <div className="row mt-3">
        <div className="col-xl-6">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <Plot data={syntheticData} layout={layout} style={{ width: "100%", height: "500px" }} />
          )}
        </div>

      </div>
    </>
  );
};

export default App;
