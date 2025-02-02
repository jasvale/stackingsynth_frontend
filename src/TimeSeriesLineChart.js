import { fetchTimeSeriesById, fetchSyntheticTimeSeriesById } from "./api";
import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";

const TimeSeriesLineChart = ({ project_uuid, class_name, data_type, showLoading, setShowLoading }) => {
    const [chartData, setChartData] = useState([]);

    const layout = {
        title: "Time Series Line Chart",
        xaxis: { title: "Date", showgrid: true },
        yaxis: { title: "Values", showgrid: true },
        legend: { orientation: "h", x: 0.5, xanchor: "center", y: -0.2 },
        showlegend: true, 
    };

    useEffect(() => {
        if(data_type == "baseline_timeseries") {
            fetchTimeSeriesById(project_uuid)
            .then((timeSeriesData) => {
                setChartData(timeSeriesData.series.map((series) => ({
                    x: series.x,
                    y: series.y,
                    type: "scatter",
                    mode: "lines",
                    name: series.name,
                    line: { color: series.color },
                })));
                setShowLoading(false);
            })
            .catch((error) => {
                console.error("Error loading data:", error);
            });
        }
        else if(data_type == "synthetic_timeseries") {
            fetchSyntheticTimeSeriesById(project_uuid)
            .then((timeSeriesData) => {
                setChartData(timeSeriesData.series.map((series) => ({
                    x: series.x,
                    y: series.y,
                    type: "scatter",
                    mode: "lines",
                    name: series.name,
                    line: { color: series.color },
                })));
                setShowLoading(false);
            })
            .catch((error) => {
              console.error("Error loading data:", error);
            });
        }        
    }, [showLoading]); // Updates everytime project_uuid changes

    return (
        <div className={class_name}>
            {showLoading ? (
                <p>Loading...</p>
            ) : (
                <Plot data={chartData} layout={layout} style={{ width: "100%", height: "400px" }} /> 
            )}
        </div>
    );
};

export default TimeSeriesLineChart;
