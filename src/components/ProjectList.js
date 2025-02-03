import { React, useEffect } from "react";
import { useAppContext } from "../AppContext";
import { fetchTimeSeriesProjects } from "../api";

const ProjectList = () => {

    const { 
        setSelectedUuid, selectedUuid,
        setForceReloadBaselineTimeSeries,
        setForceReloadBaselineNetwork,
        setForceReloadSyntheticTimeSeries,
        setForceReloadSyntheticNetwork,
        projectsList, setProjectsList,
    } = useAppContext();

    /**
     * Handle the user change in the selection of project lists.
     */
    const handleProjectChange = (event) => {
        setSelectedUuid(event.target.value);
        setForceReloadBaselineTimeSeries(true);
        setForceReloadBaselineNetwork(true);
        setForceReloadSyntheticTimeSeries(true);
        setForceReloadSyntheticNetwork(true);
    };
    
    
    useEffect(() => {
        fetchTimeSeriesProjects()
            .then((list) => {
                setProjectsList(list);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [selectedUuid]); // Runs everytime projectsList is updated
    
    return (
        <div className="col-xl-5">
            <label className="form-label text-light">Existing Project List</label>
            <select className="form-select form-select-sm" value={selectedUuid || ""} onChange={handleProjectChange}>
                    <option value="" disabled>
                        Choose a Project
                    </option>
                    {projectsList.map((series) => (
                        <option key={series.uuid} value={series.uuid}>
                            {`${series.name} (${series.uuid})`}
                        </option>
                    ))}
                </select>
        </div>
    );
};

export default ProjectList;
