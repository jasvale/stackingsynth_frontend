import React, { useState, useEffect } from "react";
import { fetchTimeSeriesProjects } from "../api";
import DataInput from "../DataInput";
import AutoregressiveParameters from "../AutoRegressiveParameters"
import Line from "./Line"

const TimeSeriesProject = ({ handleProjectChange, setArParameters, arParameters, handleGenerateDataClick, initialSelectedUuid }) => {
    const [projectList, selectProjectList] = useState([]);
    const [showGenerationOptions, setShowGenerationOptions] = useState(false);


    const [loading, setLoading] = useState(true);
    
    const [showParameters, setShowParameters] = useState(false);
    

    /**
     * Runs everytime.
     * 
    */
    useEffect(() => {
        /**
         * Fetches for Project List and populates the select.
        */
        fetchTimeSeriesProjects()
            .then((list) => {
                selectProjectList(list);
            })
            .catch((error) => {
                console.log(error); 
            })
            .finally(() => {
                setLoading(false); 
            });
    }, []);

    const handleParametersClick = () => {
        setShowParameters(!showParameters);
    }
    
    const handleGenerationOptionsClick = () => {
        if (!showGenerationOptions == false) {
            setShowParameters(false);
        }
        setShowGenerationOptions(!showGenerationOptions);
    };

    return (
        <>
            <div className="col-xl-5">
                <label className="form-label text-light">Existing Project List</label>
                {loading ? (
                    <p>Loading.</p>
                ) : (
                    <select className="form-select form-select-sm" defaultValue={initialSelectedUuid} onChange={handleProjectChange}>
                        <option value="" disabled>
                            Choose a Project
                        </option>
                        {projectList.map((series) => (
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
                        <DataInput showParameters={showParameters}  handleParametersClick={handleParametersClick} handleGenerateDataClick={handleGenerateDataClick} />
                    </div>
                    <Line />
                    {showParameters && (
                        <>
                            <AutoregressiveParameters arParameters={arParameters} setArParameters={setArParameters} handleGenerateDataClick={handleGenerateDataClick} />
                            <Line />
                        </>
                    )}
                </>
            )}
        </>
    );
};

export default TimeSeriesProject;