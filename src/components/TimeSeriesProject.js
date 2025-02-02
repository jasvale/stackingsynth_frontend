import React, { useState, useEffect } from "react";
import { fetchTimeSeriesProjects, callApiCreateProject, generateSyntheticVersionByProjectUUID } from "../api";
import TimeSeriesGenerationOptions from "./TimeSeriesGenerationOptions";
import { useAppContext } from "../AppContext";

const TimeSeriesProject = ({ }) => {
    const { arParameters, 
        setSelectedUuid, selectedUuid, 
        setLoading, loading, 
        setShowLoadingBaselineDashboard, setShowLoadingSyntheticDashboard 
    } = useAppContext();

    const [projectList, selectProjectList] = useState([]);
    const [showGenerationOptions, setShowGenerationOptions] = useState(false);
    const [showParameters, setShowParameters] = useState(false);

    const generateSyntheticData = (selectedUuid) => {
        generateSyntheticVersionByProjectUUID(selectedUuid)
            .then((singleSyntheticSeriesData) => {
                setSelectedUuid(selectedUuid);
            })
            .catch((error) => {
                console.error("Error loading data:", error);
            });
    };

    /**
     * Handle the user change in the selection of project lists.
     */
    const handleProjectChange = (event) => {
        setSelectedUuid(event.target.value);
        setShowLoadingBaselineDashboard(true);
        setShowLoadingSyntheticDashboard(true);
    };

    const handleGenerateDataClick = (event) => {
        callApiCreateProject(arParameters.phi, arParameters.sigma, arParameters.n)
            .then((timeSeriesProject) => {
                generateSyntheticData(timeSeriesProject.series_id);
                setShowLoadingBaselineDashboard(true);
                setShowLoadingSyntheticDashboard(true);
            })
            .catch((error) => {
                console.error("Error loading data:", error);
            });
    };

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
    }, []); // Runs everytime

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
                    <select className="form-select form-select-sm" defaultValue={selectedUuid} onChange={handleProjectChange}>
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
                    <button type="button" onClick={handleGenerationOptionsClick} className="btn btn-primary btn-sm">{showGenerationOptions ? "Close" : "Open"} Generation Options</button>
                </div>
            </div>
            <TimeSeriesGenerationOptions
                showGenerationOptions={showGenerationOptions}
                showParameters={showParameters}
                handleParametersClick={handleParametersClick}
                handleGenerateDataClick={handleGenerateDataClick}
            />
        </>
    );
};

export default TimeSeriesProject;