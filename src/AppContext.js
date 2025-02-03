import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {

  const [arParameters, setArParameters] = useState({
    phi: 0.9,
    sigma: 1.0,
    n: 2000,
  });
  
  const [selectedUuid, setSelectedUuid] = useState(undefined);
  const [projectsList, setProjectsList] = useState([]);
  const [reloadProjectsList, setReloadProjectsList] = useState(true);
  const [forceReloadBaselineTimeSeries, setForceReloadBaselineTimeSeries] = useState(true);
  const [forceReloadBaselineNetwork, setForceReloadBaselineNetwork] = useState(true);
  const [forceReloadSyntheticTimeSeries, setForceReloadSyntheticTimeSeries] = useState(true);
  const [forceReloadSyntheticNetwork, setForceReloadSyntheticNetwork] = useState(true);
  const [showParameters, setShowParameters] = useState(false);
  
  return (
    <AppContext.Provider value={{
        arParameters, setArParameters,
        selectedUuid, setSelectedUuid,
        projectsList, setProjectsList,
        reloadProjectsList, setReloadProjectsList,
        forceReloadBaselineTimeSeries, setForceReloadBaselineTimeSeries,
        forceReloadBaselineNetwork, setForceReloadBaselineNetwork,
        forceReloadSyntheticTimeSeries, setForceReloadSyntheticTimeSeries,
        forceReloadSyntheticNetwork, setForceReloadSyntheticNetwork,
        showParameters, setShowParameters
      }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
