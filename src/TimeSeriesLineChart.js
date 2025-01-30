import { fetchTimeSeriesById } from "./api";
import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";

const TimeSeriesLineChart = ({ project_uuid, class_name }) => {
    const [chartData, setChartData] = useState([]);
    const [loading, setLoading] = useState(true);

    const layout = {
        title: "Time Series Line Chart",
        xaxis: { title: "Date", showgrid: true },
        yaxis: { title: "Values", showgrid: true },
        legend: { orientation: "h", x: 0.5, xanchor: "center", y: -0.2 },
        showlegend: true, 
    };

    useEffect(() => {
        setLoading(true);
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
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error loading data:", error);
            });
    }, [project_uuid]); // Updates everytime project_uuid changes

    return (
        <div className={class_name}>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <Plot data={chartData} layout={layout} style={{ width: "100%", height: "500px" }} />
            )}
        </div>
    );
};

export default TimeSeriesLineChart;
