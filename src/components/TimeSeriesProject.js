import React, { useState, useEffect } from "react";
import { fetchTimeSeriesProjects } from "../api";
import DataInput from "../DataInput";
import AutoregressiveParameters from "../AutoRegressiveParameters"
import Line from "./Line"

const TimeSeriesProject = ({ onSelect, setArParameters, arParameters, handleSynthesizeClick }) => {
    const [timeSeriesList, setTimeSeriesList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedUuid, setSelectedUuid] = useState(""); // Track the selected UUID
    const [showParameters, setShowParameters] = useState(false);
    const [showGenerationOptions, setShowGenerationOptions] = useState(false);
    const [dataInputSelection, setDataInputSelection] = useState("AR");

    useEffect(() => {
        const loadTimeSeriesList = async () => {
            try {
                const list = await fetchTimeSeriesProjects();
                setTimeSeriesList(list);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        loadTimeSeriesList();
    }, []);

    const handleParametersClick = () => {
        setShowParameters(!showParameters);
    }

    const handleDataInputChange = (event) => {
        const selectedValue = event.target.value;
        setDataInputSelection(selectedValue);
    };



    const handleGenerationOptionsClick = () => {
        if (!showGenerationOptions == false) {
            setShowParameters(false);
        }
        setShowGenerationOptions(!showGenerationOptions);
    };

    const handleChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedUuid(selectedValue);
        if (onSelect) {
            onSelect(selectedValue); // Call parent function if provided
        }
    };

    return (
        <>
            <div className="col-xl-5">
                <label className="form-label text-light">Select Time Series</label>
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p style={{ color: "red" }}>Error: {error}</p>
                ) : (
                    <select className="form-select form-select-sm" aria-label="Generation Method" value={selectedUuid} onChange={handleChange}>
                        <option value="" disabled>
                            Choose a Time Series
                        </option>
                        {timeSeriesList.map((series) => (
                            <option key={series.uuid} value={series.uuid}>
                                {`${series.name} (${series.uuid})`}
                            </option>
                        ))}
                    </select>
                )}
            </div>
            <div className="col-xl-3 d-flex align-items-end">
                <div className="btn-group">
                    <button onClick={handleGenerationOptionsClick} className="btn btn-primary btn-sm">{showGenerationOptions ? "Close" : "Open"} Generation Options</button>
                </div>
            </div>
            {showGenerationOptions && (
                <>
                    <Line />
                    <div className="row mt-3">
                        <h4 className="form-label text-light">Generation Options</h4>
                        <DataInput showParameters={showParameters} handleDataInputChange={handleDataInputChange} handleParametersClick={handleParametersClick} handleSynthesizeClick={handleSynthesizeClick} />
                    </div>
                    <Line />
                    {/* Pass arParameters and setArParameters to AutoregressiveParameters */}
                    {showParameters && (
                        <>
                            <AutoregressiveParameters arParameters={arParameters} setArParameters={setArParameters} handleSynthesizeClick={handleSynthesizeClick} />
                            <Line />
                        </>
                    )}
                </>
            )}
        </>
    );
};

export default TimeSeriesProject;