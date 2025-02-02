import React, { useEffect, useState } from "react";
import { fetchTimeSeriesProjects, generateSyntheticVersionByProjectUUID } from "./api";
import TimeSeriesProject from "./components/TimeSeriesProject";
import ComplexNetwork from "./components/ComplexNetwork";
import TimeSeriesLineChart from "./TimeSeriesLineChart";
import { AppProvider, useAppContext } from "./AppContext";

const AppContent = () => {
  const {
    selectedUuid, setSelectedUuid,
    showLoadingBaselineDashboard, setShowLoadingBaselineDashboard,
    showLoadingSyntheticDashboard, setShowLoadingSyntheticDashboard
  } = useAppContext();

  const handleCreateSyntheticDataClick = () => {
    generateSyntheticVersionByProjectUUID(selectedUuid)
      .then((result) => {
        if (result.status == "OK") {
          setShowLoadingSyntheticDashboard(true);
        }
      })
      .catch((error) => {
        alert("Error synthezing data:" + error)
        console.error("Error loading data:", error);
      });
  };

  useEffect(() => {
    fetchTimeSeriesProjects()
      .then((list) => {
        setSelectedUuid(list[0].uuid);
        setShowLoadingBaselineDashboard(false);
        setShowLoadingSyntheticDashboard(false);
      })
      .catch((error) => {
        console.error("Error loading data:", error);
      });
  }, []);

  return (
    <>
      {/* Existing Time Series */}
      <div className="row mt-3">
        <TimeSeriesProject />
      </div>

      {/* Plotly Chart */}
      <div className="row mt-3">
        <TimeSeriesLineChart
          project_uuid={selectedUuid}
          class_name={"col-xl-6"}
          data_type={"baseline_timeseries"}
          showLoading={showLoadingBaselineDashboard}
          setShowLoading={setShowLoadingBaselineDashboard}
        />
        <ComplexNetwork
          project_uuid={selectedUuid}
          class_name={"col-xl-6"}
          data_type={"baseline_timeseries"}
          showLoading={showLoadingBaselineDashboard}
          setShowLoading={setShowLoadingBaselineDashboard}
        />
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
          showLoading={showLoadingSyntheticDashboard}
          setShowLoading={setShowLoadingSyntheticDashboard}
        />
        <ComplexNetwork
          project_uuid={selectedUuid}
          class_name={"col-xl-6"}
          data_type={"synthetic_timeseries"}
          showLoading={showLoadingSyntheticDashboard}
          setShowLoading={setShowLoadingSyntheticDashboard}
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
