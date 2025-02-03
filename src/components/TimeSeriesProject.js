import { React, useState} from "react";
import { callApiCreateProject, generateSyntheticVersionByProjectUUID } from "../api";
import TimeSeriesGenerationOptions from "./TimeSeriesGenerationOptions";
import ProjectList from "./ProjectList"
import { useAppContext } from "../AppContext";

const TimeSeriesProject = () => {
    const { 
        arParameters, 
        setSelectedUuid,
        setForceReloadBaselineTimeSeries,
        setForceReloadBaselineNetwork,
        setForceReloadSyntheticTimeSeries,
        setForceReloadSyntheticNetwork,
        setShowParameters
    } = useAppContext();
    
    const [showGenerationOptions, setShowGenerationOptions] = useState(false);

    const handleGenerateDataClick = (event) => {
        callApiCreateProject(arParameters.phi, arParameters.sigma, arParameters.n)
            .then((timeSeriesProject) => {
                setForceReloadBaselineTimeSeries(true);
                setForceReloadBaselineNetwork(true);
                generateSyntheticVersionByProjectUUID(timeSeriesProject.series_id)
                    .then((singleSyntheticSeriesData) => {
                        setSelectedUuid(timeSeriesProject.series_id);
                        setForceReloadSyntheticTimeSeries(true);
                        setForceReloadSyntheticNetwork(true); 
                    })
                    .catch((error) => {
                        console.error("Error loading data:", error);
                    });          
            })
            .catch((error) => {
                console.error("Error loading data:", error);
            });
    };

    const handleGenerationOptionsClick = () => {
        if (!showGenerationOptions == false) {
            setShowParameters(false);
        }
        setShowGenerationOptions(!showGenerationOptions);
    };

    return (
        <>
            <ProjectList />            
            <div className="col-xl-3 d-flex align-items-end">
                <div className="btn-group">
                    <button type="button" onClick={handleGenerationOptionsClick} className="btn btn-primary btn-sm">
                        {showGenerationOptions ? "Close" : "Open"} Generation Options
                    </button>
                </div>
            </div>
            <TimeSeriesGenerationOptions
                showGenerationOptions={showGenerationOptions}
                handleGenerateDataClick={handleGenerateDataClick} />
        </>
    );
};

export default TimeSeriesProject;