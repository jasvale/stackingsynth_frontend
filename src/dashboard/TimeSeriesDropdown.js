import React, { useState, useEffect } from "react";
import { fetchTimeSeriesList } from "../api";

const TimeSeriesDropdown = ({ onSelect }) => {
    const [timeSeriesList, setTimeSeriesList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedUuid, setSelectedUuid] = useState(""); // Track the selected UUID

    useEffect(() => {
        const loadTimeSeriesList = async () => {
            try {
                const list = await fetchTimeSeriesList();
                setTimeSeriesList(list);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        loadTimeSeriesList();
    }, []);

    const handleChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedUuid(selectedValue);
        if (onSelect) {
            onSelect(selectedValue); // Call parent function if provided
        }
    };

    return (        
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
    );
};

export default TimeSeriesDropdown;