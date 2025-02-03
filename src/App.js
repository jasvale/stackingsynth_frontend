import { React, useEffect } from "react";
import { fetchTimeSeriesProjects, generateSyntheticVersionByProjectUUID } from "./api";
import TimeSeriesProject from "./components/TimeSeriesProject";
import ComplexNetwork from "./components/ComplexNetwork";
import TimeSeriesLineChart from "./components/TimeSeriesLineChart";
import { AppProvider, useAppContext } from "./AppContext";

const AppContent = () => {
  const {
    selectedUuid, setSelectedUuid,
    forceReloadBaselineTimeSeries, setForceReloadBaselineTimeSeries,
    forceReloadBaselineNetwork, setForceReloadBaselineNetwork,
    forceReloadSyntheticTimeSeries, setForceReloadSyntheticTimeSeries,
    forceReloadSyntheticNetwork, setForceReloadSyntheticNetwork
  } = useAppContext();

  const handleCreateSyntheticDataClick = () => {
    generateSyntheticVersionByProjectUUID(selectedUuid)
      .then((result) => {
        if (result.status == "OK") {
          setForceReloadSyntheticTimeSeries(true);
          setForceReloadSyntheticNetwork(true);
        }
      })
      .catch((error) => {
        alert("Error synthezing data:" + error)
        console.error("Error loading data:", error);
      });
  };

  useEffect(() => {
    console.log("useEffect of [App.js]");
    if (selectedUuid === undefined) {
      fetchTimeSeriesProjects()
        .then((list) => {
          setSelectedUuid(list[0].uuid);
          setForceReloadSyntheticTimeSeries(true);
          setForceReloadSyntheticNetwork(true);
        })
        .catch((error) => {
          console.error("Error loading data:", error);
        });
    }
  }, []);

  return (
    <>
      {/* Existing Time Series */}
      <div className="row mt-3">
        <TimeSeriesProject />
      </div>

      <div className="row mt-3">        
        <TimeSeriesLineChart
          project_uuid={selectedUuid}
          class_name={"col-xl-6"}
          data_type={"baseline_timeseries"}
          forceReload={forceReloadBaselineTimeSeries}
          setForceReload={setForceReloadBaselineTimeSeries} />
        <ComplexNetwork
          project_uuid={selectedUuid}
          class_name={"col-xl-6"}
          data_type={"baseline_timeseries"}
          forceReload={forceReloadBaselineNetwork}
          setForceReload={setForceReloadBaselineNetwork} />
      </div>

      <div className="row mt-3">
        <div className="col-xl-2 d-flex">
          <div className="btn-group">
            <button onClick={handleCreateSyntheticDataClick} className="btn btn-sm btn-success">
              Synthesize!
            </button>
          </div>
        </div>
      </div>

      <div className="row mt-3">
        <TimeSeriesLineChart
          project_uuid={selectedUuid}
          class_name={"col-xl-6"}
          data_type={"synthetic_timeseries"}
          forceReload={forceReloadSyntheticTimeSeries}
          setForceReload={setForceReloadSyntheticTimeSeries} />
        <ComplexNetwork
          project_uuid={selectedUuid}
          class_name={"col-xl-6"}
          data_type={"synthetic_timeseries"}
          forceReload={forceReloadSyntheticNetwork}
          setForceReload={setForceReloadSyntheticNetwork}
        />
      </div>
    </>
  );
};

const App = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default App;
